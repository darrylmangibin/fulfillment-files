import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/client";
import { Prisma } from "@prisma/client";
import { s3StorageService } from "@/modules/s3/services/s3-storage.service";
import { UploadResult } from "@/modules/s3/types/s3-storage.type";

export const GET = async () => {
  try {
    const res = await prisma.fusionApk.findMany({
      orderBy: { version: "desc" },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log("[ERROR]: ", error);
    return NextResponse.json(
      { error: "Failed to fetch fusion APKs" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  let uploadResult: UploadResult | null = null;

  try {
    const formData = await request.formData();
    const apk_name = formData.get("apk_name");
    const version = formData.get("version");
    const file = formData.get("file");

    if (!apk_name || !version || !file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing required fields or file" },
        { status: 400 }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          uploadResult = await s3StorageService.uploadBuffer({
            file: {
              buffer: Buffer.from(await file.arrayBuffer()),
              mimetype: file.type,
              originalname: file.name,
              size: file.size,
            } as unknown as Express.Multer.File,
            onProgress: (progress) => {
              controller.enqueue(
                new TextEncoder().encode(
                  JSON.stringify({ progress, data: null }) + "\n"
                )
              );
            },
          });

          const fusionApk = await prisma.fusionApk.create({
            data: {
              apk_name: String(apk_name),
              version: String(version),
              file_path: uploadResult.publicUrl,
              size: file.size,
              key: uploadResult.key,
            },
          });

          controller.enqueue(
            new TextEncoder().encode(
              JSON.stringify({ progress: 100, data: fusionApk }) + "\n"
            )
          );
          controller.close();
        } catch (error) {
          if (uploadResult) {
            console.log("Cleaning up uploaded file due to error...");
            await s3StorageService.deleteObject({
              key: uploadResult.key,
            });
          }

          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain" },
      status: 201,
      statusText: "Created",
    });
  } catch (error) {
    console.log("[ERROR]: ", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: JSON.parse(error.message) },
        { status: 400 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error: `APK ${(error.meta?.target as string[]).join(
              ", "
            )} already exists`,
          },
          { status: 422 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create fusion APK",
      },
      { status: 500 }
    );
  }
};

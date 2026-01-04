import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/client";
import { Prisma } from "@prisma/client";
import { s3StorageService } from "@/modules/s3/services/s3-storage.service";
import { UploadResult } from "@/modules/s3/types/s3-storage.type";

export const GET = async () => {
  try {
    const res = await prisma.trueTraceApk.findMany({
      orderBy: { created_at: "desc" },
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

    uploadResult = await s3StorageService.uploadBuffer({
      file: {
        buffer: Buffer.from(await file.arrayBuffer()),
        mimetype: file.type,
        originalname: file.name,
        size: file.size,
      } as unknown as Express.Multer.File,
    });

    const trueTraceApk = await prisma.trueTraceApk.create({
      data: {
        apk_name: String(apk_name),
        version: String(version),
        file_path: uploadResult.publicUrl,
        size: file.size,
        key: uploadResult.key,
      },
    });

    console.log(trueTraceApk);

    return NextResponse.json(trueTraceApk);
  } catch (error) {
    console.log("[ERROR]: ", error);

    if (uploadResult) {
      console.log("Cleaning up uploaded file due to error...");
      await s3StorageService.deleteObject({
        key: uploadResult.key,
      });
    }

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

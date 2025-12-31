import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Readable } from "stream";

import { prisma } from "@/lib/client";
import { Prisma } from "@/generated/prisma/client";
import { supabase } from "@/lib/supabase";
import { s3StorageService } from "@/modules/s3/services/s3-storage.service";

export const GET = async () => {
  try {
    const res = await prisma.fusionApk.findMany();

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch fusion APKs" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
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

    const uploadResult = await s3StorageService.uploadBuffer({
      file: {
        buffer: Buffer.from(await file.arrayBuffer()),
        mimetype: file.type,
        originalname: file.name,
        size: file.size,
      } as unknown as Express.Multer.File,
    });

    const fusionApk = await prisma.fusionApk.create({
      data: {
        apk_name: String(apk_name),
        version: String(version),
        file_path: uploadResult.publicUrl,
      },
    });

    return NextResponse.json(fusionApk);
  } catch (error) {
    console.log("[ERROR]: ", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: JSON.parse(error.message) },
        { status: 400 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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

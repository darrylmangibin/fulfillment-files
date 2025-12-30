import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/client";
import { Prisma } from "@/generated/prisma/client";
import { supabase } from "@/lib/supabase";

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

    const filePath = `fusion-apk/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("apks")
      .upload(filePath, file);
    if (uploadError) {
      console.log("[UPLOAD ERROR]: ", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Save metadata to DB
    const fusionApk = await prisma.fusionApk.create({
      data: {
        apk_name: String(apk_name),
        version: String(version),
        file_path: filePath,
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

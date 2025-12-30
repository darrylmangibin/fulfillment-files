import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/client";
import { Prisma } from "@/generated/prisma/client";
import { createTrueTraceSchema } from "@/schema/true-trace-apk.schema";

export const GET = async () => {
  try {
    const res = await prisma.trueTraceApk.findMany();

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch true trace APKs" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const body = await createTrueTraceSchema.parseAsync(data);

    const trueTraceApk = await prisma.trueTraceApk.create({
      data: {
        apk_name: body.apk_name,
        version: body.version,
        file_path: body.file_path,
      },
    });

    return NextResponse.json(trueTraceApk);
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

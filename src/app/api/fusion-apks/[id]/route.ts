import { prisma } from "@/lib/client";
import { s3StorageService } from "@/modules/s3/services/s3-storage.service";
import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const fusionApk = await prisma.fusionApk.findUniqueOrThrow({
      where: { id },
    });

    if (fusionApk.key) {
      await s3StorageService.deleteObject({
        key: fusionApk.key,
      });
    }

    await prisma.fusionApk.delete({
      where: { id },
    });

    return NextResponse.json(fusionApk);
  } catch (error) {
    console.log("[ERROR]: ", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2023") {
        return NextResponse.json(
          { error: "Invalid fusion APK ID format" },
          { status: 400 }
        );
      }

      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Fusion APK not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete fusion APK",
      },
      { status: 500 }
    );
  }
};

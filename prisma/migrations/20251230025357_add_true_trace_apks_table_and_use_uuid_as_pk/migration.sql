/*
  Warnings:

  - The primary key for the `fusion_apks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `fusion_apks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "fusion_apks" DROP CONSTRAINT "fusion_apks_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "fusion_apks_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "true_trace_apks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "apk_name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "true_trace_apks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "true_trace_apks_apk_name_key" ON "true_trace_apks"("apk_name");

-- CreateIndex
CREATE UNIQUE INDEX "true_trace_apks_version_key" ON "true_trace_apks"("version");

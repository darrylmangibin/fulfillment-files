/*
  Warnings:

  - You are about to drop the column `apkName` on the `fusion_apks` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `fusion_apks` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `fusion_apks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apk_name]` on the table `fusion_apks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apk_name` to the `fusion_apks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `fusion_apks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "fusion_apks_apkName_key";

-- AlterTable
ALTER TABLE "fusion_apks" DROP COLUMN "apkName",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "apk_name" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "fusion_apks_apk_name_key" ON "fusion_apks"("apk_name");

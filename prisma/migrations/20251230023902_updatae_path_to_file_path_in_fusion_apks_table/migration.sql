/*
  Warnings:

  - You are about to drop the column `path` on the `fusion_apks` table. All the data in the column will be lost.
  - Added the required column `file_path` to the `fusion_apks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fusion_apks" DROP COLUMN "path",
ADD COLUMN     "file_path" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "fusion_apks" (
    "id" SERIAL NOT NULL,
    "apkName" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fusion_apks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fusion_apks_apkName_key" ON "fusion_apks"("apkName");

-- CreateIndex
CREATE UNIQUE INDEX "fusion_apks_version_key" ON "fusion_apks"("version");

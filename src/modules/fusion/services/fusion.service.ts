import axios from "@/lib/axios";
import { FusionApk } from "@/generated/prisma/client";
import { FusionApkBody } from "@/modules/fusion/types/fusion-apk.type";

export class FusionService {
  async createFusionApk(
    body: FusionApkBody,
    onUploadProgress?: (progress: number) => void
  ): Promise<FusionApk> {
    const formData = new FormData();
    formData.append("apk_name", body.apk_name);
    formData.append("version", body.version);
    formData.append("file", body.file_path);

    const { data } = await axios.post<FusionApk>("/fusion-apks", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
        );
        onUploadProgress?.(percentCompleted);
      },
    });

    return data;
  }
}

export const fusionService = new FusionService();

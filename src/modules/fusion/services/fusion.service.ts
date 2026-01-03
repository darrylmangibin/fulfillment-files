import axios from "@/lib/axios";
import { FusionApk } from "@prisma/client";
import { FusionApkBody } from "@/modules/fusion/types/fusion-apk.type";

type ChunkType = {
  progress: number;
  data: FusionApk | null;
};

export class FusionService {
  /**
   * Create a Fusion APK entry by uploading an APK file along with its metadata.
   * @param body
   * @param onUploadProgress
   * @returns Promise<FusionApk>
   */
  async createFusionApk(
    body: FusionApkBody,
    onUploadProgress?: (progress: number) => void
  ) {
    const formData = new FormData();
    formData.append("apk_name", body.apk_name);
    formData.append("version", body.version);
    formData.append("file", body.file_path);

    onUploadProgress?.(0);

    const response = await fetch("/api/fusion-apks", {
      method: "POST",
      body: formData,
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const parsedChunk: ChunkType = JSON.parse(chunk);

      onUploadProgress?.(parsedChunk.progress);

      if (parsedChunk.data) {
        return parsedChunk.data;
      }
    }
  }

  /**
   * Retrieve a list of all Fusion APK entries.
   */
  async getFusionApks(): Promise<FusionApk[]> {
    const { data } = await axios.get<FusionApk[]>("/fusion-apks");

    return data;
  }

  /**
   * Delete a Fusion APK entry by its ID.
   * @param id
   */
  async deleteFusionApk(id: string): Promise<FusionApk> {
    const { data } = await axios.delete<FusionApk>(`/fusion-apks/${id}`);

    return data;
  }
}

export const fusionService = new FusionService();

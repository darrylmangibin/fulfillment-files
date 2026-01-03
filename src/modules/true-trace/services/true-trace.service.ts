import axios from "@/lib/axios";
import { TrueTraceApk } from "@prisma/client";
import { TrueTraceApkBody } from "@/modules/true-trace/types/true-trace-apk.type";

type ChunkType = {
  progress: number;
  data: TrueTraceApk | null;
};

export class TrueTraceService {
  /**
   * Create a TrueTrace APK entry by uploading an APK file along with its metadata.
   * @param body
   * @param onUploadProgress
   * @returns Promise<TrueTraceApk>
   */
  async createTrueTraceApk(
    body: TrueTraceApkBody,
    onUploadProgress?: (progress: number) => void
  ) {
    const formData = new FormData();
    formData.append("apk_name", body.apk_name);
    formData.append("version", body.version);
    formData.append("file", body.file_path);

    onUploadProgress?.(0);

    const response = await fetch("/api/true-trace-apks", {
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
   * Retrieve a list of all TrueTrace APK entries.
   */
  async getTrueTraceApks(): Promise<TrueTraceApk[]> {
    const { data } = await axios.get<TrueTraceApk[]>("/true-trace-apks");

    return data;
  }

  /**
   * Delete a TrueTrace APK entry by its ID.
   * @param id
   */
  async deleteTrueTraceApk(id: string): Promise<TrueTraceApk> {
    const { data } = await axios.delete<TrueTraceApk>(`/true-trace-apks/${id}`);
    return data;
  }
}

export const trueTraceService = new TrueTraceService();

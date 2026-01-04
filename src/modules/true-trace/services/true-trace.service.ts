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
  ): Promise<TrueTraceApk | undefined> {
    const formData = new FormData();
    formData.append("apk_name", body.apk_name);
    formData.append("version", body.version);
    formData.append("file", body.file_path);

    console.log("Uploading file...");

    const { data } = await axios.post<TrueTraceApk>(
      "/true-trace-apks",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );

          console.log(progress);
          onUploadProgress?.(progress);
        },
      }
    );

    console.log(data);

    return data;
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

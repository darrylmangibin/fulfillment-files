import axios from "@/lib/axios";
import { TrueTraceApk } from "@/generated/prisma/client";
import { TrueTraceApkBody } from "@/modules/true-trace/types/true-trace-apk.type";

export class TrueTraceService {
  async createTrueTraceApk(
    body: TrueTraceApkBody,
    onUploadProgress?: (progress: number) => void
  ): Promise<TrueTraceApk> {
    const formData = new FormData();
    formData.append("apk_name", body.apk_name);
    formData.append("version", body.version);
    formData.append("file", body.file_path);

    const { data } = await axios.post<TrueTraceApk>(
      "/true-trace-apks",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
          );
          onUploadProgress?.(percentCompleted);
        },
      }
    );

    return data;
  }
}

export const trueTraceService = new TrueTraceService();

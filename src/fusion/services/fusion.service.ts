import axios from "@/lib/axios";
import { FusionApk } from "@/generated/prisma/client";
import { FusionApkBody } from "@/fusion/types/fusion-apk.type";

export class FusionService {
  async createFusionApk(body: FusionApkBody): Promise<FusionApk> {
    const formData = new FormData();
    formData.append("apk_name", body.apk_name);
    formData.append("version", body.version);
    formData.append("file", body.file_path);

    const { data } = await axios.post<FusionApk>("/fusion-apks", formData);

    return data;
  }
}

export const fusionService = new FusionService();

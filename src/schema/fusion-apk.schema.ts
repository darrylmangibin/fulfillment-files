import { z } from "zod";

export const createFusionApkSchema = z.object({
  apk_name: z.string().min(1),
  version: z.string().min(1),
  file_path: z.string().min(1),
});

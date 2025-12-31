import { z } from "zod";

export const createApkSchema = z.object({
  apk_name: z.string().min(1),
  version: z.string().min(1),
  file_path: z
    .instanceof(FileList)
    .refine((files) =>
      Array.from(files).every((file) => file.name.endsWith(".apk"))
    )
    .optional(),
});

export type CreateApkSchema = z.infer<typeof createApkSchema>;

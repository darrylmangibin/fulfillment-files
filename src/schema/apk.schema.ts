import { z } from "zod";

export const createApkSchema = z.object({
  apk_name: z.string().min(1, { message: "APK name is required" }),
  version: z.string().min(1, { message: "Version is required" }),
  file_path: z.any().refine(
    (val) => {
      if (val instanceof globalThis.FileList && val.length === 0) {
        return false;
      }

      const files: Array<unknown> =
        val instanceof globalThis.FileList
          ? Array.from(val)
          : Array.isArray(val)
          ? val
          : [val];
      return files.every(
        (file) =>
          file instanceof File &&
          typeof file?.name === "string" &&
          file.name.endsWith(".apk")
      );
    },
    { message: "File must be a .apk file" }
  ),
});

export type CreateApkSchema = z.infer<typeof createApkSchema>;

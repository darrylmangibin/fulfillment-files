"use client";

import { toast, Id as ToastId } from "react-toastify";
import { useRef } from "react";
import { ApkForm } from "@/components/apk-form";
import { useCreateTrueTraceApk } from "@/modules/true-trace/hooks/use-create-true-trace-apk";

export const TrueTraceApkForm = () => {
  // single toast id reference to avoid creating multiple toasts during progress
  const progressToastId = useRef<ToastId | null>(null);

  const { mutate: createTrueTraceApk, isPending } = useCreateTrueTraceApk({
    onError: (error) => {
      if (progressToastId.current) {
        toast.update(progressToastId.current, {
          render: `Upload Progress: 100%`,
          progress: 1,
          type: "info",
          isLoading: false,
          autoClose: 2000,
        });
        progressToastId.current = null;
      }
      toast.error(
        `Error uploading APK: ${error.response?.data?.error || error.message}`
      );
    },
    onSuccess: () => {
      if (progressToastId.current) {
        toast.update(progressToastId.current, {
          render: `Upload Progress: 100%`,
          progress: 1,
          type: "info",
          isLoading: true,
          autoClose: false,
        });
        progressToastId.current = null;
      }
      toast.success("APK uploaded successfully!");
    },
    onUploadProgress: (progress) => {
      const pct = Math.min(100, Math.max(0, Math.round(progress)));
      if (progressToastId.current === null) {
        progressToastId.current = toast.loading(`Upload Progress: ${pct}%`, {
          autoClose: false,
        });
      }

      toast.update(progressToastId.current, {
        render:
          pct === 100 ? "Finalizing upload: 100%" : `Upload Progress: ${pct}%`,
        progress: pct === 100 ? 0.99 : pct / 100,
        type: "info",
        isLoading: true,
        autoClose: false,
      });
    },
  });

  return (
    <ApkForm
      onSubmit={createTrueTraceApk}
      isLoading={isPending}
      title="Upload TrueTrace APK"
    />
  );
};

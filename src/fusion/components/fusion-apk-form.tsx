"use client";

import { useCreateFusionApk } from "@/fusion/hooks/use-create-fusion-apk";

import { toast } from "react-toastify";
import { ApkForm } from "@/components/apk-form";

export const FusionApkForm = () => {
  const { mutate: createFusionApk, isPending } = useCreateFusionApk({
    onError: (error) => {
      toast.error(`Error uploading APK: ${error.message}`);
    },
    onSuccess: () => {
      alert("APK uploaded successfully!");
    },
  });

  return (
    <ApkForm
      onSubmit={createFusionApk}
      isLoading={isPending}
      title="Upload Fusion APK"
    />
  );
};

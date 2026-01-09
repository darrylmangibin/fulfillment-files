"use client";

import { useCreateFusionApk } from "@/modules/fusion/hooks/use-create-fusion-apk";

import { toast, Id as ToastId } from "react-toastify";
import { useRef } from "react";
import { ApkForm } from "@/components/apk-form";
import { useQueryClient } from "@tanstack/react-query";
import { FUSION_APKS_QUERY_KEY } from "@/modules/fusion/constants/fusion.constant";
import { FormProvider, useForm } from "react-hook-form";
import { createApkSchema, CreateApkSchema } from "@/schema/apk.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FusionApk } from "@prisma/client";

export const FusionApkForm = () => {
  // single toast id reference to avoid creating multiple toasts during progress
  const progressToastId = useRef<ToastId | null>(null);

  const queryClient = useQueryClient();

  const methods = useForm<CreateApkSchema>({
    defaultValues: {
      apk_name: "",
      version: "",
      file_path: [],
    },
    resolver: zodResolver(createApkSchema),
  });

  const { mutate: createFusionApk, isPending } = useCreateFusionApk({
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
    onSuccess: (data) => {
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

      queryClient.setQueriesData(
        {
          queryKey: [FUSION_APKS_QUERY_KEY],
        },
        (oldData: FusionApk[]) => {
          return [data, ...oldData];
        }
      );

      queryClient.invalidateQueries({
        queryKey: [FUSION_APKS_QUERY_KEY],
      });

      methods.reset({
        apk_name: "",
        version: "",
        file_path: [],
      });

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
    <FormProvider {...methods}>
      <ApkForm
        // onSubmit={createFusionApk}
        onSubmit={() => {
          // Temporary disable the uploading
          toast.warning(
            "At the moment, only administrators are allowed to upload files."
          );
        }}
        isLoading={isPending}
        title="Upload Fusion APK"
      />
    </FormProvider>
  );
};

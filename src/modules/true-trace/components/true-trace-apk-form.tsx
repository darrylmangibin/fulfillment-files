"use client";

import { toast, Id as ToastId } from "react-toastify";
import { useRef } from "react";
import { ApkForm } from "@/components/apk-form";
import { useCreateTrueTraceApk } from "@/modules/true-trace/hooks/use-create-true-trace-apk";
import { useQueryClient } from "@tanstack/react-query";
import { TRUE_TRACE_APKS_QUERY_KEY } from "@/modules/true-trace/constants/true-trace.constant";
import { FormProvider, useForm } from "react-hook-form";
import { createApkSchema, CreateApkSchema } from "@/schema/apk.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrueTraceApk } from "@prisma/client";

export const TrueTraceApkForm = () => {
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
          queryKey: [TRUE_TRACE_APKS_QUERY_KEY],
        },
        (oldData: TrueTraceApk[]) => {
          return [data, ...oldData];
        }
      );

      queryClient.invalidateQueries({
        queryKey: [TRUE_TRACE_APKS_QUERY_KEY],
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
        // onSubmit={createTrueTraceApk}
        onSubmit={() => {
          // Temporary disable the uploading
          toast.warning(
            "At the moment, only administrators are allowed to upload files."
          );
        }}
        isLoading={isPending}
        title="Upload TrueTrace APK"
        theme="secondary"
      />
    </FormProvider>
  );
};

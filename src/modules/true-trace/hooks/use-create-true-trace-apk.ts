import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { TrueTraceApk } from "@prisma/client";
import { AxiosError } from "axios";
import { trueTraceService } from "@/modules/true-trace/services/true-trace.service";

export type UseCreateTrueTraceApkVariables = Parameters<
  typeof trueTraceService.createTrueTraceApk
>[0];

export type MutationOptions = UseMutationOptions<
  TrueTraceApk,
  AxiosError<{
    error: string;
  }>,
  UseCreateTrueTraceApkVariables
> & {
  onUploadProgress?: (progress: number) => void;
};

export const useCreateTrueTraceApk = (options?: MutationOptions) => {
  const mutation = useMutation({
    mutationFn: async (variables: UseCreateTrueTraceApkVariables) =>
      await trueTraceService.createTrueTraceApk(
        variables,
        options?.onUploadProgress
      ),
    ...options,
  });

  return mutation;
};

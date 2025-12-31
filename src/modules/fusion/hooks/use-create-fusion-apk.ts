import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { fusionService } from "@/modules/fusion/services/fusion.service";
import { FusionApk } from "@/generated/prisma/client";
import { AxiosError } from "axios";

export type UseCreateFusionApkVariables = Parameters<
  typeof fusionService.createFusionApk
>[0];

export type MutationOptions = UseMutationOptions<
  FusionApk,
  AxiosError<{
    error: string;
  }>,
  UseCreateFusionApkVariables
> & {
  onUploadProgress?: (progress: number) => void;
};

export const useCreateFusionApk = (options?: MutationOptions) => {
  const mutation = useMutation({
    mutationFn: async (variables: UseCreateFusionApkVariables) =>
      await fusionService.createFusionApk(variables, options?.onUploadProgress),
    ...options,
  });

  return mutation;
};

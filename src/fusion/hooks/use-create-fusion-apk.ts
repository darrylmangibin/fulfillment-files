import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { fusionService } from "@/fusion/services/fusion.service";
import { FusionApk } from "@/generated/prisma/client";
import { AxiosError } from "axios";

export type UseCreateFusionApkVariables = Parameters<
  typeof fusionService.createFusionApk
>[0];

export const useCreateFusionApk = (
  options?: UseMutationOptions<
    FusionApk,
    AxiosError<unknown>,
    UseCreateFusionApkVariables
  >
) => {
  const mutation = useMutation({
    mutationFn: async (variables: UseCreateFusionApkVariables) =>
      await fusionService.createFusionApk(variables),
    ...options,
  });

  return mutation;
};

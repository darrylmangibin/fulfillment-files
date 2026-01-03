import { fusionService } from "@/modules/fusion/services/fusion.service";
import { FusionApk } from "@prisma/client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseDeleteFusionApkVariables = string;

export const useDeleteFusionApk = (
  options?: UseMutationOptions<
    FusionApk,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosError<any>,
    UseDeleteFusionApkVariables
  >
) => {
  const mutation = useMutation({
    mutationFn: async (id) => await fusionService.deleteFusionApk(id),
    ...options,
  });

  return mutation;
};

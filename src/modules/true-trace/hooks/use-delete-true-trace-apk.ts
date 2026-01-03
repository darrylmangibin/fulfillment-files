import { trueTraceService } from "@/modules/true-trace/services/true-trace.service";
import { TrueTraceApk } from "@prisma/client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseDeleteTrueTraceApkVariables = string;

export const useDeleteTrueTraceApk = (
  options?: UseMutationOptions<
    TrueTraceApk,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosError<any>,
    UseDeleteTrueTraceApkVariables
  >
) => {
  const mutation = useMutation({
    mutationFn: async (id) => await trueTraceService.deleteTrueTraceApk(id),
    ...options,
  });

  return mutation;
};

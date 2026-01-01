import { TrueTraceApk } from "@prisma/client";
import { TRUE_TRACE_APKS_QUERY_KEY } from "@/modules/true-trace/constants/true-trace.constant";
import { trueTraceService } from "@/modules/true-trace/services/true-trace.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type UseGetTrueTraceApksOptions = Omit<
  UseQueryOptions<TrueTraceApk[]>,
  "queryKey" | "queryFn"
>;

export const useGetTrueTraceApks = (options?: UseGetTrueTraceApksOptions) => {
  const query = useQuery({
    queryKey: [TRUE_TRACE_APKS_QUERY_KEY],
    queryFn: async () => await trueTraceService.getTrueTraceApks(),
    ...options,
  });

  return query;
};

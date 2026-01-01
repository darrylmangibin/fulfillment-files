import { FusionApk } from "@prisma/client";
import { FUSION_APKS_QUERY_KEY } from "@/modules/fusion/constants/fusion.constant";
import { fusionService } from "@/modules/fusion/services/fusion.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type UseGetFusionApksOptions = Omit<
  UseQueryOptions<FusionApk[]>,
  "queryKey" | "queryFn"
>;

export const useGetFusionApks = (options?: UseGetFusionApksOptions) => {
  const query = useQuery({
    queryKey: [FUSION_APKS_QUERY_KEY],
    queryFn: async () => await fusionService.getFusionApks(),
    ...options,
  });

  return query;
};

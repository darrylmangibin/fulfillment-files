import { TimeFrame } from "@/lib/metrics-timespan";
import { FUSION_METRICS_QUERY_KEY } from "@/modules/fusion/constants/fusion.constant";
import { fusionMetricService } from "@/modules/fusion/services/fusion-metric.service";
import { MetricBuild } from "@/types/metric-build.type";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useFusionBuildMetrics = (
  timeFrame: TimeFrame,
  options?: Omit<UseQueryOptions<MetricBuild>, "queryKey" | "queryFn">
) => {
  const query = useQuery({
    queryKey: [FUSION_METRICS_QUERY_KEY, timeFrame],
    queryFn: async () => await fusionMetricService.getBuildMetrics(timeFrame),
    ...options,
  });

  return query;
};

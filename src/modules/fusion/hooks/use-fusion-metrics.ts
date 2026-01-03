import { TimeFrame } from "@/lib/metrics-timespan";
import {
  FUSION_BUILD_METRICS_QUERY_KEY,
  FUSION_UPDATE_METRICS_QUERY_KEY,
} from "@/modules/fusion/constants/fusion.constant";
import { fusionMetricService } from "@/modules/fusion/services/fusion-metric.service";
import { MetricBuild } from "@/types/metric-build.type";
import { MetricUpdate } from "@/types/metric-update.type";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useFusionBuildMetrics = (
  timeFrame: TimeFrame,
  options?: Omit<UseQueryOptions<MetricBuild>, "queryKey" | "queryFn">
) => {
  const query = useQuery({
    queryKey: [FUSION_BUILD_METRICS_QUERY_KEY, timeFrame],
    queryFn: async () => await fusionMetricService.getBuildMetrics(timeFrame),
    ...options,
  });

  return query;
};

export const useFusionUpdateMetrics = (
  timeFrame: TimeFrame,
  options?: Omit<UseQueryOptions<MetricUpdate>, "queryKey" | "queryFn">
) => {
  const query = useQuery({
    queryKey: [FUSION_UPDATE_METRICS_QUERY_KEY, timeFrame],
    queryFn: async () => await fusionMetricService.getUpdatesMetrics(timeFrame),
    ...options,
  });

  return query;
};

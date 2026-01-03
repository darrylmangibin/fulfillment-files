import { TimeFrame } from "@/lib/metrics-timespan";
import {
  TRUE_TRACE_BUILD_METRICS_QUERY_KEY,
  TRUE_TRACE_UPDATE_METRICS_QUERY_KEY,
} from "@/modules/true-trace/constants/true-trace.constant";
import { trueTraceMetricService } from "@/modules/true-trace/services/true-trace-metric.service";
import { MetricBuild } from "@/types/metric-build.type";
import { MetricUpdate } from "@/types/metric-update.type";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useTrueTraceBuildMetrics = (
  timeFrame: TimeFrame,
  options?: Omit<UseQueryOptions<MetricBuild>, "queryKey" | "queryFn">
) => {
  const query = useQuery({
    queryKey: [TRUE_TRACE_BUILD_METRICS_QUERY_KEY, timeFrame],
    queryFn: async () =>
      await trueTraceMetricService.getBuildMetrics(timeFrame),
    ...options,
  });

  return query;
};

export const useTrueTraceUpdateMetrics = (
  timeFrame: TimeFrame,
  options?: Omit<UseQueryOptions<MetricUpdate>, "queryKey" | "queryFn">
) => {
  const query = useQuery({
    queryKey: [TRUE_TRACE_UPDATE_METRICS_QUERY_KEY, timeFrame],
    queryFn: async () =>
      await trueTraceMetricService.getUpdatesMetrics(timeFrame),
    ...options,
  });

  return query;
};

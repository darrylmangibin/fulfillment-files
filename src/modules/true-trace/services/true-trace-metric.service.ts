import axios from "@/lib/axios";
import { TimeFrame } from "@/lib/metrics-timespan";
import { MetricBuild } from "@/types/metric-build.type";
import { MetricUpdate } from "@/types/metric-update.type";

export class TrueTraceMetricService {
  public async getBuildMetrics(timeFrame: TimeFrame): Promise<MetricBuild> {
    const { data } = await axios.get<MetricBuild>(
      "/true-trace-apks/metrics/builds",
      {
        params: { timeFrame },
      }
    );

    return data;
  }

  public async getUpdatesMetrics(timeFrame: TimeFrame): Promise<MetricUpdate> {
    const { data } = await axios.get<MetricUpdate>(
      "/fusion-apks/metrics/updates",
      {
        params: { timeFrame },
      }
    );

    return data;
  }
}

export const trueTraceMetricService = new TrueTraceMetricService();

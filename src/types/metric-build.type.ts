type MetricEntry = {
  id: string;
  timestamp?: string; // optional for TOTAL metrics
  value: number;
};

type UsageMetrics = {
  MEDIUM_ANDROID_BUILDS: MetricEntry[];
  LARGE_ANDROID_BUILDS: MetricEntry[];
  MEDIUM_IOS_BUILDS: MetricEntry[];
  LARGE_IOS_BUILDS: MetricEntry[];
  ANDROID_BUILDS_TOTAL: MetricEntry[];
  IOS_BUILDS_TOTAL: MetricEntry[];
};

type AppData = {
  byFullName: {
    usageMetrics: UsageMetrics;
  };
};

export type MetricBuild = {
  data: {
    app: AppData;
  };
};

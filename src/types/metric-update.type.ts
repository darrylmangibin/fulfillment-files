type MetricUpdateEntry = {
  id: string;
  timestamp?: string; // optional for TOTAL metrics
  value: number;
};

type MetricUpdates = {
  BANDWIDTH_USAGE: MetricUpdateEntry[];
  UNIQUE_UPDATERS: MetricUpdateEntry[];
  UNIQUE_UPDATERS_TOTAL: MetricUpdateEntry[];
};

type UpdateAppData = {
  byFullName: {
    usageMetrics: MetricUpdates;
  };
};

export type MetricUpdate = {
  data: {
    app: UpdateAppData;
  };
};

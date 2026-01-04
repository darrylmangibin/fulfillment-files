"use client";

import { useState } from "react";
import { TimeFrame } from "@/lib/metrics-timespan";
import { Box, Stack } from "@mui/material";
import { BuildMetricsChart } from "@/components/build-metrics-chart";
import { useTrueTraceBuildMetrics } from "@/modules/true-trace/hooks/use-true-trace-metrics";
import { MetricsHeader } from "@/components/metrics-header";

export default function TrueTraceDashboardBuildMetricPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame.MONTHLY);
  const { data, isLoading } = useTrueTraceBuildMetrics(timeframe);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Stack spacing={4}>
        {/* Header Section */}
        <MetricsHeader
          title="True Trace Build Metrics"
          description="Track your build performance and usage metrics"
          timeFrame={timeframe}
          onChangeTimeFrame={setTimeframe}
          theme="secondary"
        />

        {/* Charts Section */}
        <BuildMetricsChart data={data} loading={isLoading} theme="secondary" />
      </Stack>
    </Box>
  );
}

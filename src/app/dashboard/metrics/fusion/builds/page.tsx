"use client";

import { useState } from "react";
import { TimeFrame } from "@/lib/metrics-timespan";
import { useFusionBuildMetrics } from "@/modules/fusion/hooks/use-fusion-metrics";
import { Box, Stack } from "@mui/material";
import { BuildMetricsChart } from "@/components/build-metrics-chart";
import { MetricsHeader } from "@/components/metrics-header";

export default function FusionDashboardBuildMetricPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame.MONTHLY);
  const { data, isLoading } = useFusionBuildMetrics(timeframe);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Stack spacing={4}>
        {/* Header Section */}
        <MetricsHeader
          title="Fusion Build Metrics"
          description="Track build times, success rates, and deployment frequency"
          timeFrame={timeframe}
          onChangeTimeFrame={setTimeframe}
        />

        {/* Charts Section */}
        <BuildMetricsChart data={data} loading={isLoading} />
      </Stack>
    </Box>
  );
}

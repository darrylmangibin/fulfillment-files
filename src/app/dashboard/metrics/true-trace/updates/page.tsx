"use client";

import { useState } from "react";
import { TimeFrame } from "@/lib/metrics-timespan";
import { useTrueTraceUpdateMetrics } from "@/modules/true-trace/hooks/use-true-trace-metrics";
import { Box, Stack } from "@mui/material";
import { UpdateMetricsChart } from "@/components/update-metrics-chart";
import { MetricsHeader } from "@/components/metrics-header";

export default function TrueTraceUpdateMetricsPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame.MONTHLY);
  const { data, isLoading } = useTrueTraceUpdateMetrics(timeframe);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Stack spacing={4}>
        {/* Header Section */}
        <MetricsHeader
          title="True Trace Update Metrics"
          description="Monitor update frequency, success rates, and user adoption"
          timeFrame={timeframe}
          onChangeTimeFrame={setTimeframe}
          theme="secondary"
        />

        {/* Charts Section */}
        <UpdateMetricsChart data={data} loading={isLoading} theme="secondary" />
      </Stack>
    </Box>
  );
}

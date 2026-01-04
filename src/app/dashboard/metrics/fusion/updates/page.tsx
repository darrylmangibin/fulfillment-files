"use client";

import { useState } from "react";
import { TimeFrame } from "@/lib/metrics-timespan";
import { useFusionUpdateMetrics } from "@/modules/fusion/hooks/use-fusion-metrics";
import { Box, Stack } from "@mui/material";
import { UpdateMetricsChart } from "@/components/update-metrics-chart";
import { MetricsHeader } from "@/components/metrics-header";

export default function FusionUpdateMetricsPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame.MONTHLY);
  const { data, isLoading } = useFusionUpdateMetrics(timeframe);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Stack spacing={4}>
        {/* Header Section */}
        <MetricsHeader
          title="Fusion Update Metrics"
          description="Track app updates, bandwidth usage, and user engagement"
          timeFrame={timeframe}
          onChangeTimeFrame={setTimeframe}
        />

        {/* Charts Section */}
        <UpdateMetricsChart data={data} loading={isLoading} />
      </Stack>
    </Box>
  );
}

"use client";

import { MetricUpdate } from "@/types/metric-update.type";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import StorageIcon from "@mui/icons-material/Storage";

interface UpdateMetricsChartProps {
  data: MetricUpdate | undefined;
  loading?: boolean;
}

export const UpdateMetricsChart = ({
  data,
  loading = false,
}: UpdateMetricsChartProps) => {
  if (loading) {
    return (
      <Card
        sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ py: 8 }}>
          <Stack alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "3px solid rgba(255,255,255,0.1)",
                borderTopColor: (theme) => theme.palette.primary.main,
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
            <Typography color="text.secondary" fontSize={14}>
              Loading metrics...
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (!data?.data?.app?.byFullName?.usageMetrics) {
    return (
      <Card
        sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ py: 8 }}>
          <Typography color="text.secondary" textAlign="center" fontSize={14}>
            No update metrics available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const metrics = data.data.app.byFullName.usageMetrics;

  // Extract total values
  const uniqueUpdatersTotal = metrics.UNIQUE_UPDATERS_TOTAL?.[0]?.value || 0;

  // Prepare time series data
  const bandwidthData = metrics.BANDWIDTH_USAGE || [];
  const uniqueUpdatersData = metrics.UNIQUE_UPDATERS || [];

  // Get timestamps
  const timestamps = bandwidthData
    .map((entry) => (entry.timestamp ? new Date(entry.timestamp) : null))
    .filter((date): date is Date => date !== null);

  // Calculate total bandwidth in GB
  const totalBandwidthBytes = bandwidthData.reduce(
    (sum, entry) => sum + entry.value,
    0
  );
  const totalBandwidthGB = (totalBandwidthBytes / (1024 * 1024 * 1024)).toFixed(
    2
  );

  // Prepare data for bar chart (daily comparisons)
  const dailyComparisons = timestamps.map((timestamp, index) => ({
    date: timestamp.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    bandwidth: bandwidthData[index]?.value / (1024 * 1024) || 0, // Convert to MB
    updaters: uniqueUpdatersData[index]?.value || 0,
  }));

  return (
    <Stack spacing={3}>
      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid>
          <Card
            sx={{
              bgcolor: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 2,
              boxShadow: "none",
              transition: "border-color 0.2s",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    bgcolor: "rgba(124, 58, 237, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <StorageIcon sx={{ fontSize: 24, color: "#7c3aed" }} />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={13}
                    mb={0.5}
                  >
                    Total Bandwidth
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {totalBandwidthGB} GB
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    mt={0.5}
                    display="block"
                  >
                    Data transferred via updates
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card
            sx={{
              bgcolor: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 2,
              boxShadow: "none",
              transition: "border-color 0.2s",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    bgcolor: "rgba(234, 88, 12, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PeopleIcon sx={{ fontSize: 24, color: "#ea580c" }} />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={13}
                    mb={0.5}
                  >
                    Unique Updaters
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {uniqueUpdatersTotal.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    mt={0.5}
                    display="block"
                  >
                    Active users receiving updates
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bar Chart - Daily Metrics Comparison */}
      <Card
        sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={3} color="text.primary">
            Daily Update Activity
          </Typography>
          <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.08)" }} />
          <Box sx={{ width: "100%", height: 600 }}>
            <BarChart
              dataset={dailyComparisons}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "date",
                  tickLabelStyle: {
                    fill: "#8b949e",
                    fontSize: 11,
                  },
                },
              ]}
              series={[
                {
                  dataKey: "bandwidth",
                  label: "Bandwidth (MB)",
                  color: "#7c3aed",
                },
                {
                  dataKey: "updaters",
                  label: "Unique Updaters",
                  color: "#ea580c",
                },
              ]}
              slotProps={{
                legend: {
                  direction: "horizontal",
                  position: { vertical: "top", horizontal: "start" },
                },
              }}
              margin={{ top: 50, right: 20, bottom: 40, left: 50 }}
              grid={{ horizontal: true }}
              sx={{
                "& .MuiBarElement-root": {
                  rx: 4,
                },
                "& .MuiChartsAxis-line": {
                  stroke: "rgba(255,255,255,0.08)",
                },
                "& .MuiChartsAxis-tick": {
                  stroke: "rgba(255,255,255,0.08)",
                },
                "& .MuiChartsGrid-line": {
                  stroke: "rgba(255,255,255,0.04)",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Line Chart - Trends Over Time */}
      <Card
        sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={3} color="text.primary">
            Update Trends
          </Typography>
          <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.08)" }} />
          <Box sx={{ width: "100%", height: 700 }}>
            <LineChart
              xAxis={[
                {
                  data: timestamps,
                  scaleType: "time",
                  valueFormatter: (date) =>
                    date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    }),
                  tickLabelStyle: {
                    fill: "#8b949e",
                    fontSize: 11,
                  },
                },
              ]}
              series={[
                {
                  data: bandwidthData.map((d) => d.value / (1024 * 1024)),
                  label: "Bandwidth (MB)",
                  color: "#7c3aed",
                  showMark: false,
                  curve: "monotoneX",
                },
                {
                  data: uniqueUpdatersData.map((d) => d.value),
                  label: "Unique Updaters",
                  color: "#ea580c",
                  showMark: false,
                  curve: "monotoneX",
                },
              ]}
              slotProps={{
                legend: {
                  direction: "horizontal",
                  position: { vertical: "top", horizontal: "start" },
                },
              }}
              margin={{ top: 50, right: 20, bottom: 40, left: 50 }}
              grid={{ horizontal: true }}
              sx={{
                "& .MuiLineElement-root": {
                  strokeWidth: 2,
                },
                "& .MuiChartsAxis-line": {
                  stroke: "rgba(255,255,255,0.08)",
                },
                "& .MuiChartsAxis-tick": {
                  stroke: "rgba(255,255,255,0.08)",
                },
                "& .MuiChartsGrid-line": {
                  stroke: "rgba(255,255,255,0.04)",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

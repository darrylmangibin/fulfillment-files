"use client";

import { MetricBuild } from "@/types/metric-build.type";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Grid,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface BuildMetricsChartProps {
  data: MetricBuild | undefined;
  loading?: boolean;
}

export const BuildMetricsChart = ({
  data,
  loading = false,
}: BuildMetricsChartProps) => {
  if (loading) {
    return (
      <Card
        sx={{
          bgcolor: "#0d1117",
          border: "1px solid #30363d",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <CardContent sx={{ py: 8 }}>
          <Stack alignItems="center" spacing={3}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: "4px solid #21262d",
                borderTopColor: "#58a6ff",
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
            <Typography color="#8b949e" fontWeight={500} fontSize={16}>
              Loading analytics data...
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
          bgcolor: "#0d1117",
          border: "1px solid #30363d",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <CardContent sx={{ py: 8 }}>
          <Typography
            color="#8b949e"
            textAlign="center"
            fontWeight={500}
            fontSize={16}
          >
            No analytics data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const metrics = data.data.app.byFullName.usageMetrics;

  // Extract total values
  const androidTotal = metrics.ANDROID_BUILDS_TOTAL?.[0]?.value || 0;
  const iosTotal = metrics.IOS_BUILDS_TOTAL?.[0]?.value || 0;

  // Prepare time series data for line chart
  const mediumAndroidData = metrics.MEDIUM_ANDROID_BUILDS || [];
  const largeAndroidData = metrics.LARGE_ANDROID_BUILDS || [];
  const mediumIosData = metrics.MEDIUM_IOS_BUILDS || [];
  const largeIosData = metrics.LARGE_IOS_BUILDS || [];

  // Get timestamps (assuming all series have the same timestamps)
  const timestamps = mediumAndroidData
    .map((entry) => (entry.timestamp ? new Date(entry.timestamp) : null))
    .filter((date): date is Date => date !== null);

  // Prepare data for bar chart (totals by build type)
  const buildTypeTotals = [
    {
      type: "Medium Android",
      value: mediumAndroidData.reduce((sum, entry) => sum + entry.value, 0),
      color: "#4CAF50",
    },
    {
      type: "Large Android",
      value: largeAndroidData.reduce((sum, entry) => sum + entry.value, 0),
      color: "#66BB6A",
    },
    {
      type: "Medium iOS",
      value: mediumIosData.reduce((sum, entry) => sum + entry.value, 0),
      color: "#2196F3",
    },
    {
      type: "Large iOS",
      value: largeIosData.reduce((sum, entry) => sum + entry.value, 0),
      color: "#42A5F5",
    },
  ];

  return (
    <Stack spacing={3}>
      {/* Total Builds Summary */}
      <Grid container spacing={3}>
        <Grid>
          <Card
            sx={{
              bgcolor: "#0d1117",
              border: "1px solid #30363d",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 16px 40px rgba(33, 150, 60, 0.25)",
                border: "1px solid #3fb950",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #3fb950 0%, #56d364 100%)",
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap={4}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="#8b949e"
                      fontWeight={500}
                      mb={1}
                      textTransform="uppercase"
                      letterSpacing={1}
                    >
                      Android Builds
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight={700}
                      sx={{
                        background:
                          "linear-gradient(135deg, #3fb950 0%, #56d364 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {androidTotal.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, #3fb950 0%, #56d364 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(63, 185, 80, 0.3)",
                    }}
                  >
                    <AndroidIcon sx={{ fontSize: 36, color: "#0d1117" }} />
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingUpIcon sx={{ fontSize: 20, color: "#3fb950" }} />
                  <Typography variant="body2" color="#8b949e">
                    Total completed builds
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card
            sx={{
              bgcolor: "#0d1117",
              border: "1px solid #30363d",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 16px 40px rgba(88, 166, 255, 0.25)",
                border: "1px solid #58a6ff",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #58a6ff 0%, #79c0ff 100%)",
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="#8b949e"
                      fontWeight={500}
                      mb={1}
                      textTransform="uppercase"
                      letterSpacing={1}
                    >
                      iOS Builds
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight={700}
                      sx={{
                        background:
                          "linear-gradient(135deg, #58a6ff 0%, #79c0ff 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {iosTotal.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, #58a6ff 0%, #79c0ff 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(88, 166, 255, 0.3)",
                    }}
                  >
                    <AppleIcon sx={{ fontSize: 36, color: "#0d1117" }} />
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingUpIcon sx={{ fontSize: 20, color: "#58a6ff" }} />
                  <Typography variant="body2" color="#8b949e">
                    Total completed builds
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Time Series Chart */}
      {timestamps.length > 0 && (
        <Card
          sx={{
            bgcolor: "#0d1117",
            border: "1px solid #30363d",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            transition: "border 0.3s ease",
            "&:hover": {
              border: "1px solid #58a6ff",
            },
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              mb={4}
              spacing={2}
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="#c9d1d9"
                  mb={0.5}
                >
                  Build Trends
                </Typography>
                <Typography variant="body2" color="#8b949e">
                  Build activity over time
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                <Chip
                  label="Medium Android"
                  size="small"
                  sx={{
                    bgcolor: "#1a2e1f",
                    color: "#3fb950",
                    border: "1px solid #2ea043",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                />
                <Chip
                  label="Large Android"
                  size="small"
                  sx={{
                    bgcolor: "#1a2e1f",
                    color: "#56d364",
                    border: "1px solid #46c25b",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                />
                <Chip
                  label="Medium iOS"
                  size="small"
                  sx={{
                    bgcolor: "#1c2d41",
                    color: "#58a6ff",
                    border: "1px solid #388bfd",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                />
                <Chip
                  label="Large iOS"
                  size="small"
                  sx={{
                    bgcolor: "#1c2d41",
                    color: "#79c0ff",
                    border: "1px solid #54aeff",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                />
              </Stack>
            </Stack>
            <Box sx={{ width: "100%", height: 500 }}>
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
                  },
                ]}
                series={[
                  {
                    data: mediumAndroidData.map((entry) => entry.value),
                    label: "Medium Android",
                    color: "#3fb950",
                    curve: "natural",
                    showMark: false,
                    area: true,
                  },
                  {
                    data: largeAndroidData.map((entry) => entry.value),
                    label: "Large Android",
                    color: "#56d364",
                    curve: "natural",
                    showMark: false,
                    area: true,
                  },
                  {
                    data: mediumIosData.map((entry) => entry.value),
                    label: "Medium iOS",
                    color: "#58a6ff",
                    curve: "natural",
                    showMark: false,
                    area: true,
                  },
                  {
                    data: largeIosData.map((entry) => entry.value),
                    label: "Large iOS",
                    color: "#79c0ff",
                    curve: "natural",
                    showMark: false,
                    area: true,
                  },
                  {
                    data: [
                      Math.max(
                        ...mediumAndroidData.map((entry) => entry.value),
                        ...largeAndroidData.map((entry) => entry.value),
                        ...mediumIosData.map((entry) => entry.value),
                        ...largeIosData.map((entry) => entry.value)
                      ) + 0.3,
                    ],
                    label: "Invisible Spacer",
                    color: "transparent",
                    showMark: false,
                  },
                ]}
                margin={{ top: 20, right: 30, bottom: 0, left: 80 }}
                grid={{ horizontal: true, vertical: true }}
                sx={{
                  "& .MuiChartsAxis-tickLabel": {
                    fill: "#8b949e",
                    fontWeight: 500,
                    fontSize: 13,
                  },
                  "& .MuiChartsAxis-line": {
                    stroke: "#30363d",
                    strokeWidth: 1,
                  },
                  // "& .MuiChartsAxis-tick": {
                  //   stroke: "#30363d",
                  // },
                  "& .MuiChartsGrid-line": {
                    stroke: "#30363d",
                    strokeWidth: 1,
                  },
                  "& .MuiChartsLegend-series text": {
                    fill: "#c9d1d9 !important",
                    fontWeight: 600,
                  },
                  "& .MuiAreaElement-root": {
                    fillOpacity: 0.15,
                  },
                  "& .MuiLineElement-root": {
                    strokeWidth: 3,
                  },
                  "& .MuiMarkElement-root": {
                    scale: "0.8",
                    strokeWidth: 2,
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Builds by Type */}
      <Card
        sx={{
          bgcolor: "#0d1117",
          border: "1px solid #30363d",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          transition: "border 0.3s ease",
          "&:hover": {
            border: "1px solid #58a6ff",
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                color="#c9d1d9"
                mb={0.5}
              >
                Build Distribution
              </Typography>
              <Typography variant="body2" color="#8b949e">
                Total builds by size category
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ width: "100%", height: 450, position: "relative" }}>
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="barGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#58a6ff", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#388bfd", stopOpacity: 0.8 }}
                  />
                </linearGradient>
              </defs>
            </svg>
            <BarChart
              dataset={buildTypeTotals}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "type",
                  categoryGapRatio: 0.5,
                },
              ]}
              series={[
                {
                  dataKey: "value",
                  label: "Total Builds",
                  color: "#58a6ff",
                },
              ]}
              margin={{ top: 20, right: 30, bottom: 80, left: 80 }}
              grid={{ horizontal: true }}
              sx={{
                "& .MuiChartsAxis-tickLabel": {
                  fill: "#8b949e",
                  fontWeight: 500,
                  fontSize: 13,
                },
                "& .MuiChartsAxis-line": {
                  stroke: "#30363d",
                  strokeWidth: 1,
                },
                "& .MuiChartsAxis-tick": {
                  stroke: "#30363d",
                },
                "& .MuiChartsGrid-line": {
                  stroke: "#21262d",
                  strokeWidth: 1,
                },
                "& .MuiChartsLegend-series text": {
                  fill: "#c9d1d9 !important",
                  fontWeight: 600,
                },
                "& .MuiBarElement-root": {
                  rx: 8,
                  filter: "drop-shadow(0 4px 12px rgba(88, 166, 255, 0.4))",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    filter: "drop-shadow(0 6px 16px rgba(88, 166, 255, 0.6))",
                  },
                },
                "& .MuiBarElement-root[fill='#58a6ff']": {
                  fill: "url(#barGradient)",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

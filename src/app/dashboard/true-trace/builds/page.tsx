"use client";

import { useState } from "react";
import { TimeFrame } from "@/lib/metrics-timespan";
import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Paper,
} from "@mui/material";
import { BuildMetricsChart } from "@/components/build-metrics-chart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTrueTraceBuildMetrics } from "@/modules/true-trace/hooks/use-true-trace-metrics";

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
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #30363d",
              borderRadius: 3,
              p: 4,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #db2777 0%, #7c3aed 100%)",
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  mb={1}
                  sx={{
                    background: "linear-gradient(90deg, #db2777 0%, #7c3aed 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 1px rgba(219, 39, 119, 0.7)",
                  }}
                >
                  True Trace Build Metrics
                </Typography>
                <Typography variant="body2" color="#8b949e" fontWeight={500}>
                  Track your build performance and usage metrics
                </Typography>
              </Box>

              <FormControl
                sx={{
                  minWidth: 200,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#161b22",
                    borderRadius: 2,
                    fontWeight: 600,
                    border: "1px solid #30363d",
                    "&:hover": {
                      border: "1px solid #db2777",
                      bgcolor: "#161b22",
                    },
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused": {
                      border: "1px solid #db2777",
                      boxShadow: "0 0 0 3px rgba(219, 39, 119, 0.15)",
                    },
                  },
                }}
              >
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as TimeFrame)}
                  startAdornment={
                    <CalendarMonthIcon sx={{ mr: 1, color: "#db2777" }} />
                  }
                  sx={{
                    color: "#c9d1d9",
                    "& .MuiSelect-icon": {
                      color: "#db2777",
                    },
                  }}
                >
                  <MenuItem value={TimeFrame.WEEKLY}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight={600}>Weekly</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last 7 days
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={TimeFrame.MONTHLY}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight={600}>Monthly</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last 30 days
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={TimeFrame.YEARLY}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight={600}>Yearly</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last 365 days
                      </Typography>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Paper>

          {/* Charts Section */}
          <BuildMetricsChart data={data} loading={isLoading} />
        </Stack>
    </Box>
  );
}

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

export default function TrueTraceApkPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame.MONTHLY);
  const { data, isLoading } = useTrueTraceBuildMetrics(timeframe);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
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
                background: (theme) =>
                  `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
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
                  variant="h3"
                  fontWeight={800}
                  mb={1}
                  sx={{
                    color: "primary.main",
                    textShadow: "0 0 1px rgba(88, 166, 255, 0.7)",
                  }}
                >
                  True Trace Build Metrics
                </Typography>
                <Typography variant="body1" color="#8b949e" fontWeight={500}>
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
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
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
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                      boxShadow: (theme) =>
                        `0 0 0 3px ${theme.palette.primary.main}26`,
                    },
                  },
                }}
              >
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as TimeFrame)}
                  startAdornment={
                    <CalendarMonthIcon sx={{ mr: 1, color: "primary.main" }} />
                  }
                  sx={{
                    color: "#c9d1d9",
                    "& .MuiSelect-icon": {
                      color: "primary.main",
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
      </Container>
    </Box>
  );
}

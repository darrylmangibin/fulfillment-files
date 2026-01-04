"use client";

import { useState } from "react";
import { TimeFrame } from "@/lib/metrics-timespan";
import { useTrueTraceUpdateMetrics } from "@/modules/true-trace/hooks/use-true-trace-metrics";
import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import { UpdateMetricsChart } from "@/components/update-metrics-chart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function TrueTraceUpdateMetricsPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame.MONTHLY);
  const { data, isLoading } = useTrueTraceUpdateMetrics(timeframe);

  const theme = useTheme();

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
              background: `linear-gradient(90deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 100%)`,
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
                  background: `linear-gradient(90deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: `0 0 1px ${theme.palette.secondary.main}`,
                }}
              >
                True Trace Update Metrics
              </Typography>
              <Typography variant="body2" color="#8b949e" fontWeight={500}>
                Track app updates, bandwidth usage, and user engagement
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
                  <CalendarMonthIcon
                    sx={{ mr: 1, color: theme.palette.secondary.dark }}
                  />
                }
                sx={{
                  color: theme.palette.secondary.dark,
                  "& .MuiSelect-icon": {
                    color: theme.palette.secondary.dark,
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
        <UpdateMetricsChart data={data} loading={isLoading} theme="secondary" />
      </Stack>
    </Box>
  );
}

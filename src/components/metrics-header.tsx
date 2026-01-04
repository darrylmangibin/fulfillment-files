import { TimeFrame } from "@/lib/metrics-timespan";
import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type MetricsHeaderProps = {
  theme?: "primary" | "secondary";
  timeFrame: TimeFrame;
  onChangeTimeFrame: (timeframe: TimeFrame) => void;
  title: string;
  description: string;
};

export const MetricsHeader = ({
  theme: themeProp = "primary",
  timeFrame,
  onChangeTimeFrame,
  title,
  description,
}: MetricsHeaderProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
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
          background: `linear-gradient(90deg, ${theme.palette[themeProp].dark} 0%, ${theme.palette[themeProp].light} 100%)`,
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
              background: `linear-gradient(90deg, ${theme.palette[themeProp].dark} 0%, ${theme.palette[themeProp].light} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 1px ${theme.palette[themeProp].main}`,
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="#8b949e" fontWeight={500}>
            {description}
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
                border: "1px solid #7c3aed",
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
                border: "1px solid #7c3aed",
                boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.15)",
              },
            },
          }}
        >
          <Select
            value={timeFrame}
            onChange={(e) => onChangeTimeFrame(e.target.value as TimeFrame)}
            startAdornment={
              <CalendarMonthIcon
                sx={{ mr: 1, color: theme.palette[themeProp].main }}
              />
            }
            sx={{
              color: theme.palette[themeProp].main,
              "& .MuiSelect-icon": {
                color: theme.palette[themeProp].main,
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
  );
};

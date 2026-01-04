"use client";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Breadcrumbs,
  Link,
  useTheme,
} from "@mui/material";
import {
  Build as BuildIcon,
  SystemUpdate as SystemUpdateIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const theme = useTheme();

  const buildCards = [
    {
      title: "Fusion",
      description: "Build performance and usage metrics",
      icon: <BuildIcon sx={{ fontSize: 28 }} />,
      path: "/dashboard/fusion/builds",
      color: theme.palette.primary.dark,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
    },
    {
      title: "True Trace",
      description: "Build analytics and statistics",
      icon: <BuildIcon sx={{ fontSize: 28 }} />,
      path: "/dashboard/true-trace/builds",
      color: theme.palette.secondary.dark,
      gradient: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.light})`,
    },
  ];

  const updateCards = [
    {
      title: "Fusion",
      description: "App updates and deployments",
      icon: <SystemUpdateIcon sx={{ fontSize: 28 }} />,
      path: "/dashboard/fusion/updates",
      color: theme.palette.primary.dark,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
    },
    {
      title: "True Trace",
      description: "Update metrics and bandwidth",
      icon: <SystemUpdateIcon sx={{ fontSize: 28 }} />,
      path: "/dashboard/true-trace/updates",
      color: theme.palette.secondary.dark,
      gradient: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.light})`,
    },
  ];

  return (
    <Box sx={{ minHeight: "calc(100vh - 140px)" }}>
      <Stack spacing={8}>
        {/* Header */}
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 1.5, fontSize: 14 }}
          >
            <Link
              component="button"
              onClick={() => router.push("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "text.secondary",
                "&:hover": { color: "text.primary" },
              }}
            >
              <HomeIcon sx={{ fontSize: 18 }} />
              Home
            </Link>
            <Typography sx={{ fontSize: 14, color: "primary.main" }}>
              Dashboard
            </Typography>
          </Breadcrumbs>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your APK files and track metrics
          </Typography>
        </Box>

        {/* Update Metrics */}
        <Box>
          <Box mb={2}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
              <SystemUpdateIcon sx={{ fontSize: 20 }} />
              <Typography variant="h6" fontWeight={600}>
                Update Metrics
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Track OTA updates, bandwidth usage, and user engagement
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {updateCards.map((card) => (
              <Grid key={card.path} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  onClick={() => router.push(card.path)}
                  sx={{
                    cursor: "pointer",
                    bgcolor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 1.5,
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.04)",
                      borderColor: card.color,
                      transform: "translateY(-4px)",
                      boxShadow: `0 12px 32px ${card.color}20`,
                    },
                  }}
                  elevation={0}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack spacing={1.5}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 1.25,
                          background: card.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600} mb={0.5}>
                          {card.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {card.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider />

        {/* Build Metrics */}
        <Box>
          <Box mb={2}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
              <BuildIcon sx={{ fontSize: 20 }} />
              <Typography variant="h6" fontWeight={600}>
                Build Metrics
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Monitor build performance, resource usage, and analytics
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {buildCards.map((card) => (
              <Grid key={card.path} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  onClick={() => router.push(card.path)}
                  sx={{
                    cursor: "pointer",
                    bgcolor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 1.5,
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.04)",
                      borderColor: card.color,
                      transform: "translateY(-4px)",
                      boxShadow: `0 12px 32px ${card.color}20`,
                    },
                  }}
                  elevation={0}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack spacing={1.5}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 1.25,
                          background: card.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600} mb={0.5}>
                          {card.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {card.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}

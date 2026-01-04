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

  const buildCards = [
    {
      title: "Fusion",
      description: "Track build performance and usage metrics",
      icon: <BuildIcon sx={{ fontSize: 32 }} />,
      path: "/dashboard/fusion/builds",
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #7c3aed 0%, #ea580c 100%)",
    },
    {
      title: "True Trace",
      description: "Monitor build analytics and statistics",
      icon: <BuildIcon sx={{ fontSize: 32 }} />,
      path: "/dashboard/true-trace/builds",
      color: "#db2777",
      gradient: "linear-gradient(135deg, #db2777 0%, #7c3aed 100%)",
    },
  ];

  const updateCards = [
    {
      title: "Fusion",
      description: "Track app updates and deployments",
      icon: <SystemUpdateIcon sx={{ fontSize: 32 }} />,
      path: "/dashboard/fusion/updates",
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #7c3aed 0%, #ea580c 100%)",
    },
    {
      title: "True Trace",
      description: "Monitor update metrics and bandwidth",
      icon: <SystemUpdateIcon sx={{ fontSize: 32 }} />,
      path: "/dashboard/true-trace/updates",
      color: "#db2777",
      gradient: "linear-gradient(135deg, #db2777 0%, #7c3aed 100%)",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 140px)",
      }}
    >
      <Stack spacing={5}>
        {/* Breadcrumbs */}
        <Box>
          <Breadcrumbs
            separator={
              <NavigateNextIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
            }
            sx={{
              "& .MuiBreadcrumbs-separator": {
                mx: 1,
              },
            }}
          >
            <Link
              component="button"
              onClick={() => router.push("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "text.primary",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <HomeIcon sx={{ fontSize: 18 }} />
              Home
            </Link>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: "primary.main",
              }}
            >
              Dashboard
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Header */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your APK files and track metrics
          </Typography>
        </Box>

        {/* Update Metrics Section */}
        <Box>
          <Box mb={3}>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <SystemUpdateIcon
                sx={{ fontSize: 24, color: "text.secondary" }}
              />
              <Typography variant="h6" fontWeight={600}>
                Update Metrics
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Track OTA updates, bandwidth, and user engagement
            </Typography>
            <Divider sx={{ mt: 2, borderColor: "rgba(255,255,255,0.08)" }} />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {updateCards.map((card) => (
            <Grid key={card.path}>
              <Card
                onClick={() => router.push(card.path)}
                sx={{
                  cursor: "pointer",
                  bgcolor: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: card.color,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 24px ${card.color}15`,
                  },
                }}
                elevation={0}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1.5,
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

        {/* Build Metrics Section */}
        <Box>
          <Box mb={3}>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <BuildIcon sx={{ fontSize: 24, color: "text.secondary" }} />
              <Typography variant="h6" fontWeight={600}>
                Build Metrics
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Monitor build performance and resource usage
            </Typography>
            <Divider sx={{ mt: 2, borderColor: "rgba(255,255,255,0.08)" }} />
          </Box>

          <Grid container spacing={3}>
            {buildCards.map((card) => (
              <Grid key={card.path}>
                <Card
                  onClick={() => router.push(card.path)}
                  sx={{
                    cursor: "pointer",
                    bgcolor: "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: card.color,
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 24px ${card.color}15`,
                    },
                  }}
                  elevation={0}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1.5,
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

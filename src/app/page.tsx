"use client";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Android as AndroidIcon,
  TrackChanges as TrackChangesIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const cards = [
    {
      title: "Fusion APK",
      description: "Upload and manage Fusion APK files",
      icon: <AndroidIcon sx={{ fontSize: 40 }} />,
      path: "/fusion-apk",
      gradient: "linear-gradient(135deg,#7c3aed,#0891b2)",
    },
    {
      title: "True Trace APK",
      description: "Upload and manage True Trace APK files",
      icon: <TrackChangesIcon sx={{ fontSize: 40 }} />,
      path: "/true-trace-apk",
      gradient: "linear-gradient(135deg,#ec4899,#8b5cf6)",
    },
  ];

  useEffect(() => {
    const x = async () => {
      const res = await fetch("/api/dashboard", { method: "GET" });
      const data = await res.json();
      console.log(data);
    };

    x();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 140px)",
        p: 3,
      }}
    >
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your APK files and track uploads
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.path} component="div">
            <Card
              onClick={() => router.push(card.path)}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                bgcolor: "#02040a",
                boxShadow: "0 12px 40px rgba(2,6,23,0.8)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 16px 50px rgba(2,6,23,0.9)",
                },
              }}
              elevation={6}
            >
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: "transparent",
                      background: card.gradient,
                      boxShadow: "0 8px 24px rgba(12,32,64,0.5)",
                    }}
                  >
                    {card.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

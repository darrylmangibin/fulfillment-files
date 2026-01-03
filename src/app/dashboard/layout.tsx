"use client";

import { Box, Container, Breadcrumbs, Link, Typography } from "@mui/material";
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Generate breadcrumb items based on pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    // Always add Home
    breadcrumbs.push({
      label: "Home",
      path: "/",
      icon: <HomeIcon sx={{ fontSize: 18 }} />,
    });

    // Add Dashboard
    breadcrumbs.push({
      label: "Dashboard",
      path: "/",
    });

    // Generate page title from full path
    if (paths.length > 1) {
      const segments = paths.slice(1); // Skip 'dashboard'
      let pageTitle = "";

      // Build the full page title
      for (const segment of segments) {
        if (segment === "fusion") {
          pageTitle += "Fusion ";
        } else if (segment === "true-trace") {
          pageTitle += "True Trace ";
        } else if (segment === "builds") {
          pageTitle += "Build Metrics";
        } else if (segment === "updates") {
          pageTitle += "Update Metrics";
        }
      }

      breadcrumbs.push({
        label: pageTitle.trim(),
        path: null,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={
            <NavigateNextIcon
              fontSize="small"
              sx={{ color: "text.secondary" }}
            />
          }
          sx={{
            mb: 3,
            "& .MuiBreadcrumbs-separator": {
              mx: 1,
            },
          }}
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            if (isLast || !crumb.path) {
              return (
                <Typography
                  key={index}
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  {crumb.icon}
                  {crumb.label}
                </Typography>
              );
            }

            return (
              <Link
                key={index}
                component="button"
                onClick={() => router.push(crumb.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "text.secondary",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "color 0.2s",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                {crumb.icon}
                {crumb.label}
              </Link>
            );
          })}
        </Breadcrumbs>

        {/* Page Content */}
        {children}
      </Box>
    </Box>
  );
}

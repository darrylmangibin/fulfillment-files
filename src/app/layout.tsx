"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { queryClient } from "@/lib/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <html lang="en">
            <body className="antialiased">{children}</body>
          </html>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}

"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { queryClient } from "@/lib/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppLayout } from "@/components/app-layout";
import darkScrollbar from "@mui/material/darkScrollbar";
import { GlobalStyles } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#7c3aed",
        light: "#9f67ff",
        dark: "#5b21b6",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#db2777",
        light: "#ff5ca1",
        dark: "#a21e66",
        contrastText: "#ffffff",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: () => ({
          body: darkScrollbar(),
        }),
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyles
            styles={{
              html: {
                colorScheme: "dark !important", // Force dark color scheme
                backgroundColor: "#121212 !important",
                color: "#ffffff !important",
              },
              body: {
                colorScheme: "dark !important", // Force dark color scheme
                backgroundColor: "#121212 !important",
                color: "#ffffff !important",
              },
              "*::-webkit-scrollbar": {
                width: "10px",
              },
              "*::-webkit-scrollbar-track": {
                background: "#1a1a1a", // dark track
                borderRadius: "6px",
              },
              "*::-webkit-scrollbar-thumb": {
                background: "#333", // dark thumb
                borderRadius: "6px",
                boxShadow: "inset 0 0 6px #0ff, 0 0 4px #0ff", // subtle neon glow
              },
              "*::-webkit-scrollbar-thumb:hover": {
                boxShadow: "inset 0 0 8px #0ff, 0 0 6px #0ff", // stronger glow on hover
              },
              "*": {
                scrollbarWidth: "thin", // Firefox
                scrollbarColor: "#333 #1a1a1a", // thumb color # track color #
              },
              "@media (prefers-color-scheme: light)": {
                html: {
                  backgroundColor: "#121212 !important",
                  color: "#ffffff !important",
                },
                body: {
                  backgroundColor: "#121212 !important",
                  color: "#ffffff !important",
                },
              },
            }}
          />
          <html lang="en" style={{ colorScheme: "dark" }}>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              style={{ colorScheme: "dark" }}
            >
              {children}
            </body>
          </html>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}

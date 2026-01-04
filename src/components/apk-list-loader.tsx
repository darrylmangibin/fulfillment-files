import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const ApkListLoader = ({
  theme: themeKey = "primary",
}: {
  theme?: "primary" | "secondary";
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar
          sx={{
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            bgcolor: "transparent",
            background: `linear-gradient(135deg, ${theme.palette[themeKey].dark}, ${theme.palette[themeKey].light})`,
            boxShadow: "0 8px 24px rgba(12,32,64,0.5)",
          }}
        >
          <CircularProgress size={24} sx={{ color: "white" }} />
        </Avatar>
        <Box>
          <Skeleton
            variant="text"
            sx={{
              bgcolor: "rgba(255,255,255,0.05)",
              width: { xs: 150, sm: 200 },
              height: { xs: 28, sm: 36 },
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              bgcolor: "rgba(255,255,255,0.03)",
              width: { xs: 180, sm: 250 },
              height: { xs: 20, sm: 24 },
            }}
          />
        </Box>
      </Box>

      {isMobile ? (
        // Mobile Card Layout Loader
        <Stack spacing={2}>
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 2,
                bgcolor: "#02040a",
                boxShadow: "0 4px 12px rgba(2,6,23,0.6)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  {/* APK Name */}
                  <Box>
                    <Skeleton
                      variant="text"
                      width={60}
                      height={16}
                      sx={{ bgcolor: "rgba(255,255,255,0.05)", mb: 0.5 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                    />
                  </Box>

                  {/* Version and Size */}
                  <Stack direction="row" spacing={2}>
                    <Box flex={1}>
                      <Skeleton
                        variant="text"
                        width={50}
                        height={16}
                        sx={{ bgcolor: "rgba(255,255,255,0.05)", mb: 0.5 }}
                      />
                      <Skeleton
                        variant="rounded"
                        width={60}
                        height={24}
                        sx={{
                          bgcolor: "rgba(236,72,153,0.15)",
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                    <Box flex={1}>
                      <Skeleton
                        variant="text"
                        width={40}
                        height={16}
                        sx={{ bgcolor: "rgba(255,255,255,0.05)", mb: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        width={70}
                        height={20}
                        sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                      />
                    </Box>
                  </Stack>

                  {/* Date */}
                  <Box>
                    <Skeleton
                      variant="text"
                      width={40}
                      height={16}
                      sx={{ bgcolor: "rgba(255,255,255,0.05)", mb: 0.5 }}
                    />
                    <Skeleton
                      variant="text"
                      width={90}
                      height={20}
                      sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                    />
                  </Box>

                  {/* Actions */}
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    pt={1}
                  >
                    <Skeleton
                      variant="circular"
                      width={32}
                      height={32}
                      sx={{ bgcolor: "rgba(139,92,246,0.2)" }}
                    />
                    <Skeleton
                      variant="circular"
                      width={32}
                      height={32}
                      sx={{ bgcolor: "rgba(239,68,68,0.2)" }}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        // Desktop Table Layout Loader
        <Card
          sx={{
            borderRadius: 3,
            bgcolor: "#02040a",
            boxShadow: "0 12px 40px rgba(2,6,23,0.8)",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        width: 180,
                        height: 60,
                      }}
                    >
                      <Skeleton
                        variant="text"
                        width={100}
                        height={24}
                        sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        width: 60,
                        height: 60,
                      }}
                    >
                      <Skeleton
                        variant="text"
                        width={40}
                        height={24}
                        sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        width: 80,
                        height: 60,
                      }}
                    >
                      <Skeleton
                        variant="text"
                        width={50}
                        height={24}
                        sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        width: 100,
                        height: 60,
                      }}
                    >
                      <Skeleton
                        variant="text"
                        width={70}
                        height={24}
                        sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        width: 80,
                        height: 60,
                      }}
                      align="right"
                    >
                      <Skeleton
                        variant="text"
                        width={60}
                        height={24}
                        sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(5)].map((_, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
                      }}
                    >
                      <TableCell sx={{ width: 180, height: 60 }}>
                        <Skeleton
                          variant="text"
                          width={180}
                          height={24}
                          sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: 60, height: 60 }}>
                        <Skeleton
                          variant="rounded"
                          width={60}
                          height={24}
                          sx={{
                            bgcolor: "rgba(236,72,153,0.15)",
                            borderRadius: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: 80, height: 60 }}>
                        <Skeleton
                          variant="text"
                          width={80}
                          height={24}
                          sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: 100, height: 60 }}>
                        <Skeleton
                          variant="text"
                          width={100}
                          height={24}
                          sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ width: 80, height: 60 }}>
                        <Box display="inline-flex" gap={1}>
                          <Skeleton
                            variant="circular"
                            width={32}
                            height={32}
                            sx={{ bgcolor: "rgba(139,92,246,0.2)" }}
                          />
                          <Skeleton
                            variant="circular"
                            width={32}
                            height={32}
                            sx={{ bgcolor: "rgba(239,68,68,0.2)" }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

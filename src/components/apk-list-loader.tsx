import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const ApkListLoader = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: "transparent",
            background: "linear-gradient(135deg,#ec4899,#8b5cf6)",
            boxShadow: "0 8px 24px rgba(12,32,64,0.5)",
          }}
        >
          <CircularProgress size={24} sx={{ color: "white" }} />
        </Avatar>
        <Box>
          <Skeleton
            variant="text"
            width={200}
            height={36}
            sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
          />
          <Skeleton
            variant="text"
            width={250}
            height={24}
            sx={{ bgcolor: "rgba(255,255,255,0.03)" }}
          />
        </Box>
      </Box>

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
                    APK Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      width: 60,
                      height: 60,
                    }}
                  >
                    Version
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      width: 80,
                      height: 60,
                    }}
                  >
                    Size
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      width: 100,
                      height: 60,
                    }}
                  >
                    Date
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
                    Actions
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
    </Box>
  );
};

"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Avatar,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Delete as DeleteIcon,
  TrackChanges as TrackChangesIcon,
} from "@mui/icons-material";
import { FusionApk, TrueTraceApk } from "@/generated/prisma/client";

export type ApkListProps = {
  data: Array<FusionApk | TrueTraceApk>;
  isLoading?: boolean;
};

export const ApkList = ({ data, isLoading }: ApkListProps) => {
  if (isLoading) {
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
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                    >
                      APK Name
                    </TableCell>
                    <TableCell
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                    >
                      Version
                    </TableCell>
                    <TableCell
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                    >
                      Size
                    </TableCell>
                    <TableCell
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ color: "text.secondary", fontWeight: 600 }}
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
                      <TableCell>
                        <Skeleton
                          variant="text"
                          width={180}
                          height={24}
                          sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                        />
                      </TableCell>
                      <TableCell>
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
                      <TableCell>
                        <Skeleton
                          variant="text"
                          width={80}
                          height={24}
                          sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="text"
                          width={100}
                          height={24}
                          sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                        />
                      </TableCell>
                      <TableCell align="right">
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
  }

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
          <TrackChangesIcon />
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            True Trace APK List
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage all True Trace APK files
          </Typography>
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
                  <TableCell sx={{ color: "text.secondary", fontWeight: 600 }}>
                    APK Name
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary", fontWeight: 600 }}>
                    Version
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary", fontWeight: 600 }}>
                    Size
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary", fontWeight: 600 }}>
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ color: "text.secondary", fontWeight: 600 }}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((apk) => (
                  <TableRow
                    key={apk.id}
                    sx={{
                      "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2">{apk.apk_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={apk.version}
                        size="small"
                        sx={{
                          bgcolor: "rgba(236,72,153,0.15)",
                          color: "#ec4899",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {((apk.size ?? 0) / (1024 * 1024)).toFixed(2)} MB
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(apk.created_at).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        sx={{ color: "#8b5cf6" }}
                        onClick={() => {
                          window.location.href = apk.file_path;
                        }}
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#ef4444" }}>
                        <DeleteIcon />
                      </IconButton>
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

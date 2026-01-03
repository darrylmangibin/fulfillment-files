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
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Delete as DeleteIcon,
  TrackChanges as TrackChangesIcon,
} from "@mui/icons-material";
import { FusionApk, TrueTraceApk } from "@prisma/client";
import { ApkListLoader } from "@/components/apk-list-loader";

export type ApkListProps = {
  data: Array<FusionApk | TrueTraceApk>;
  isLoading?: boolean;
  title: string;
  description: string;
  icon?: React.ReactNode;
  onDelete?: (apkId: string) => void;
};

export const ApkList = ({
  data,
  isLoading,
  title,
  description,
  icon,
  onDelete,
}: ApkListProps) => {
  const Icon = icon ?? <TrackChangesIcon />;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isLoading) {
    return <ApkListLoader />;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar
          sx={{
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            bgcolor: "transparent",
            background: "linear-gradient(135deg,#ec4899,#8b5cf6)",
            boxShadow: "0 8px 24px rgba(12,32,64,0.5)",
          }}
        >
          {Icon}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: 18, md: 24 } }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 12, md: 14 } }}>
            {description}
          </Typography>
        </Box>
      </Box>

      {isMobile ? (
        // Mobile Card Layout
        <Stack spacing={2}>
          {data.map((apk) => (
            <Card
              key={apk.id}
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
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                      APK Name
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {apk.apk_name}
                    </Typography>
                  </Box>

                  {/* Version and Size */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box flex={1}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                        Version
                      </Typography>
                      <Box mt={0.5}>
                        <Chip
                          label={apk.version}
                          size="small"
                          sx={{
                            bgcolor: "rgba(236,72,153,0.15)",
                            color: "#ec4899",
                            height: 24,
                            fontSize: 12,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box flex={1}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                        Size
                      </Typography>
                      <Typography variant="body2" mt={0.5}>
                        {((apk.size ?? 0) / (1024 * 1024)).toFixed(2)} MB
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Date */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                      Date
                    </Typography>
                    <Typography variant="body2">
                      {new Date(apk.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Stack direction="row" spacing={1} justifyContent="flex-end" pt={1}>
                    <IconButton
                      size="small"
                      sx={{ color: "#8b5cf6" }}
                      onClick={() => {
                        window.location.href = apk.file_path;
                      }}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: "#ef4444" }}
                      onClick={() => onDelete?.(apk.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        // Desktop Table Layout
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
                  {data.map((apk) => (
                    <TableRow
                      key={apk.id}
                      sx={{
                        "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
                      }}
                    >
                      {/* APK NAME */}
                      <TableCell sx={{ width: 180, height: 60 }}>
                        <Typography variant="body2">{apk.apk_name}</Typography>
                      </TableCell>

                      {/* VERSION */}
                      <TableCell sx={{ width: 60, height: 60 }}>
                        <Chip
                          label={apk.version}
                          size="small"
                          sx={{
                            bgcolor: "rgba(236,72,153,0.15)",
                            color: "#ec4899",
                          }}
                        />
                      </TableCell>

                      {/* SIZE */}
                      <TableCell sx={{ width: 80, height: 60 }}>
                        <Typography variant="body2" color="text.secondary">
                          {((apk.size ?? 0) / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                      </TableCell>

                      {/* DATE */}
                      <TableCell sx={{ width: 100, height: 60 }}>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(apk.created_at).toLocaleDateString()}
                        </Typography>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell align="right" sx={{ width: 80, height: 60 }}>
                        {/* DOWNLOAD */}
                        <IconButton
                          size="small"
                          sx={{ color: "#8b5cf6" }}
                          onClick={() => {
                            window.location.href = apk.file_path;
                          }}
                        >
                          <DownloadIcon />
                        </IconButton>

                        {/* DELETE */}
                        <IconButton
                          size="small"
                          sx={{ color: "#ef4444" }}
                          onClick={() => onDelete?.(apk.id)}
                        >
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
      )}
    </Box>
  );
};

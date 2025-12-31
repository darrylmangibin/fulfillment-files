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
} from "@mui/material";
import {
  Download as DownloadIcon,
  Delete as DeleteIcon,
  TrackChanges as TrackChangesIcon,
} from "@mui/icons-material";

// Boilerplate data
const mockApks = [
  { id: 1, name: "TrueTrace_v2.0.0.apk", version: "2.0.0", size: "38.5 MB", date: "2025-12-30" },
  { id: 2, name: "TrueTrace_v2.0.1.apk", version: "2.0.1", size: "39.0 MB", date: "2025-12-29" },
  { id: 3, name: "TrueTrace_v2.0.2.apk", version: "2.0.2", size: "39.2 MB", date: "2025-12-28" },
];

export default function TrueTraceApkListPage() {
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
                  <TableCell sx={{ color: "text.secondary", fontWeight: 600 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockApks.map((apk) => (
                  <TableRow
                    key={apk.id}
                    sx={{
                      "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2">{apk.name}</Typography>
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
                        {apk.size}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {apk.date}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: "#8b5cf6" }}>
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
}

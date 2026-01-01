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
import { FusionApkList } from "@/modules/fusion/components/fusion-apk-list";

// Boilerplate data
const mockApks = [
  {
    id: 1,
    name: "TrueTrace_v2.0.0.apk",
    version: "2.0.0",
    size: "38.5 MB",
    date: "2025-12-30",
  },
  {
    id: 2,
    name: "TrueTrace_v2.0.1.apk",
    version: "2.0.1",
    size: "39.0 MB",
    date: "2025-12-29",
  },
  {
    id: 3,
    name: "TrueTrace_v2.0.2.apk",
    version: "2.0.2",
    size: "39.2 MB",
    date: "2025-12-28",
  },
];

export default function TrueTraceApkListPage() {
  return <FusionApkList />;
}

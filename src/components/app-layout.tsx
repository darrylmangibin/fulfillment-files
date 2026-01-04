"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Collapse,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Android as AndroidIcon,
  TrackChanges as TrackChangesIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
  List as ListIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";

const drawerWidthOpen = 240;
const drawerWidthClosed = 64;

interface NavSubItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: NavSubItem[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  {
    label: "Fusion",
    icon: <AndroidIcon />,
    subItems: [
      {
        label: "List APKs",
        icon: <ListIcon />,
        path: "/dashboard/fusion-apk/list",
      },
      {
        label: "Upload APK",
        icon: <UploadIcon />,
        path: "/dashboard/fusion-apk/create",
      },
    ],
  },
  {
    label: "True Trace",
    icon: <TrackChangesIcon />,
    subItems: [
      {
        label: "List APKs",
        icon: <ListIcon />,
        path: "/dashboard/true-trace-apk/list",
      },
      {
        label: "Upload APK",
        icon: <UploadIcon />,
        path: "/dashboard/true-trace-apk/create",
      },
    ],
  },
];

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Fusion",
    "True Trace",
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverSection, setPopoverSection] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    if (isMobile) {
      return;
    }

    setOpen(!open);
  };

  const handleSectionToggle = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    label: string
  ) => {
    setAnchorEl(event.currentTarget);
    setPopoverSection(label);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverSection(null);
  };

  const handleSubItemClick = (path: string) => {
    router.push(path);
    handlePopoverClose();
  };

  useEffect(() => {
    if (isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [isMobile]);
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#01040a",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 600 }}
          >
            Fulfillment Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidthOpen : drawerWidthClosed,
            boxSizing: "border-box",
            bgcolor: "#02040a",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ mt: 2 }}>
          <List>
            {navItems.map((item) => {
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedSections.includes(item.label);
              const isActive = pathname === item.path;
              const isAnySubActive = item.subItems?.some(
                (sub) => pathname === sub.path
              );

              return (
                <Box key={item.label}>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      onClick={(e) => {
                        if (hasSubItems) {
                          if (open) {
                            handleSectionToggle(item.label);
                          } else {
                            handlePopoverOpen(e, item.label);
                          }
                        } else if (item.path) {
                          router.push(item.path);
                        }
                      }}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        mx: 1,
                        my: 0.5,
                        borderRadius: 2,
                        bgcolor:
                          isActive || isAnySubActive
                            ? (theme) => `${theme.palette.primary.main}26`
                            : "transparent",
                        color:
                          isActive || isAnySubActive
                            ? "primary.main"
                            : "text.secondary",
                        "&:hover": {
                          bgcolor:
                            isActive || isAnySubActive
                              ? (theme) => `${theme.palette.primary.main}40`
                              : "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color:
                            isActive || isAnySubActive
                              ? "primary.main"
                              : "text.secondary",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        sx={{
                          opacity: open ? 1 : 0,
                          transition: "opacity 0.2s",
                        }}
                      />
                      {hasSubItems &&
                        open &&
                        (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                  </ListItem>

                  {hasSubItems && open && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.subItems!.map((subItem) => {
                          const isSubActive = pathname === subItem.path;
                          return (
                            <ListItemButton
                              key={subItem.path}
                              onClick={() => router.push(subItem.path)}
                              sx={{
                                pl: 7,
                                py: 1,
                                mx: 1,
                                my: 0.5,
                                borderRadius: 2,
                                bgcolor: isSubActive
                                  ? (theme) => `${theme.palette.primary.main}26`
                                  : "transparent",
                                color: isSubActive
                                  ? "primary.main"
                                  : "text.secondary",
                                "&:hover": {
                                  bgcolor: isSubActive
                                    ? (theme) =>
                                        `${theme.palette.primary.main}40`
                                    : "rgba(255,255,255,0.05)",
                                },
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: 2,
                                  color: isSubActive
                                    ? "primary.main"
                                    : "text.secondary",
                                }}
                              >
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={subItem.label}
                                primaryTypographyProps={{ variant: "body2" }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </List>

          {/* Popover menu for collapsed state */}
          {navItems.map((item) => {
            if (!item.subItems) return null;
            const isOpen = popoverSection === item.label && Boolean(anchorEl);
            return (
              <Menu
                key={`menu-${item.label}`}
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    bgcolor: "#02040a",
                    border: "1px solid rgba(255,255,255,0.06)",
                    ml: 1,
                    minWidth: 200,
                    maxWidth: 250,
                    overflow: "visible",
                  },
                }}
                slotProps={{
                  paper: {
                    sx: {
                      overflow: "visible",
                    },
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    px: 2,
                    py: 1,
                    display: "block",
                    color: "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </Typography>
                {item.subItems!.map((subItem) => {
                  const isSubActive = pathname === subItem.path;
                  return (
                    <MenuItem
                      key={subItem.path}
                      onClick={() => handleSubItemClick(subItem.path)}
                      sx={{
                        px: 2,
                        py: 1.5,
                        mx: 1,
                        my: 0.5,
                        borderRadius: 1,
                        bgcolor: isSubActive
                          ? (theme) => `${theme.palette.primary.main}26`
                          : "transparent",
                        color: isSubActive ? "primary.main" : "text.secondary",
                        "&:hover": {
                          bgcolor: isSubActive
                            ? (theme) => `${theme.palette.primary.main}40`
                            : "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 2,
                          color: isSubActive
                            ? "primary.main"
                            : "text.secondary",
                        }}
                      >
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={subItem.label}
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </MenuItem>
                  );
                })}
              </Menu>
            );
          })}
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "linear-gradient(180deg,#01040a 0%, #03050a 100%)",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>{children}</Box>
      </Box>
    </Box>
  );
};

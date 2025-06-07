import React, { useEffect, useState, useMemo } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Home,
  CalendarToday,
  LocalPharmacy,
  Feedback as FeedbackIcon,
  Menu,
  DarkMode,
  LightMode,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutButton from "./LogoutButton";

const drawerWidth = 240;
const collapsedWidth = 72;

const sidebarItems = [
  { key: "profile", label: "Doctor Profile", icon: <Home />, path: "/doctor/profile" },
  { key: "view-appointments", label: "View Appointments", icon: <CalendarToday />, path: "/doctor/appointments" },
  { key: "issue-prescription", label: "Issue Prescription", icon: <LocalPharmacy />, path: "/doctor/appointments/:id/prescription" },
  { key: "feedback", label: "Feedback", icon: <FeedbackIcon />, path: "/doctor/feedback" },
];

const DoctorLayout = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const navigate = useNavigate();

  // Create theme with high-contrast text and theme-matched sidebar
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#42a5f5" : "#1976d2", // AppBar color
          },
          background: {
            default: darkMode ? "#121212" : "#f5f5f5",
            paper: darkMode ? "#1e1e1e" : "#ffffff", // Sidebar and content background
          },
          text: {
            primary: darkMode ? "#e0e0e0" : "#212121", // High-contrast text
            secondary: darkMode ? "#b0bec5" : "#424242",
          },
          action: {
            hover: darkMode ? "#37474f" : "#e3f2fd",
            selected: darkMode ? "#0288d1" : "#bbdefb",
          },
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: darkMode ? "#1e1e1e" : "#ffffff", // Match AdminProfile sidebar
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                color: darkMode ? "#e0e0e0" : "#212121",
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                color: darkMode ? "#e0e0e0" : "#212121",
                backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/hospital/api/doctors/mydetails", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data);
      } catch (err) {
        console.error("Failed to fetch doctor info", err);
      }
    };
    fetchDoctor();
  }, []);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const drawerContent = (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {sidebarItems.map((item) => (
          <ListItem
            button
            key={item.key}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              px: 2.5,
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <Tooltip title={collapsed && !isMobile ? item.label : ""} placement="right" arrow>
              <ListItemIcon
                sx={{
                  color: theme.palette.text.primary,
                  minWidth: 0,
                  mr: collapsed && !isMobile ? "auto" : 2,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </Tooltip>
            {!collapsed && (
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                  },
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: theme.palette.divider }} />
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
        <CssBaseline />

        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)` },
            ml: { md: `${collapsed ? collapsedWidth : drawerWidth}px` },
            background: darkMode
              ? "linear-gradient(90deg, #1E1E1E, #3A3A3A)"
              : "linear-gradient(90deg, #D72638, #A4151C)",
            transition: "width 0.3s, margin-left 0.3s",
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Left: Menu Button + Hospital Name */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={handleDrawerToggle}
                color="inherit"
                aria-label="toggle drawer"
              >
                {isMobile ? <Menu /> : collapsed ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                LifeBridge Hospital - Doctor Portal
              </Typography>
            </Box>

            {/* Right: Theme, Avatar, Name, Logout */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                <IconButton
                  onClick={handleThemeToggle}
                  color="inherit"
                  aria-label="toggle dark mode"
                >
                  {darkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
              <Avatar src="https://cdn-icons-png.freepik.com/256/2894/2894807.png?ga=GA1.1.1973256367.1748951813" />
              <Typography
                variant="body1"
                sx={{ whiteSpace: "nowrap", color: theme.palette.text.primary }}
              >
                {doctor ? `${doctor.firstName} ${doctor.lastName}` : "Doctor"}
              </Typography>
              <LogoutButton />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Box component="nav" sx={{ width: { md: collapsed ? collapsedWidth : drawerWidth }, flexShrink: { md: 0 } }}>
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={mobileOpen || !isMobile}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "block" },
              "& .MuiDrawer-paper": {
                width: collapsed && !isMobile ? collapsedWidth : drawerWidth,
                boxSizing: "border-box",
                bgcolor: theme.palette.background.paper, // Match AdminProfile sidebar
                color: theme.palette.text.primary,
                overflowX: "hidden",
                transition: "width 0.3s",
                borderRight: `1px solid ${theme.palette.divider}`,
                top: "64px",
                height: "calc(100vh - 64px)",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            mt: 8,
            width: { md: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)` },
            transition: "width 0.3s, margin-left 0.3s",
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              p: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DoctorLayout;
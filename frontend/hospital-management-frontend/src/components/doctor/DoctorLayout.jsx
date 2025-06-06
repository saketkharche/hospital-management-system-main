import React, { useEffect, useState } from "react";
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
  useTheme,
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
  { key: "prescription-history", label: "Prescription History", icon: <LocalPharmacy />, path: "/doctor/prescriptions" },
  { key: "feedback", label: "Feedback", icon: <FeedbackIcon />, path: "/doctor/feedback" },
];

const DoctorLayout = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

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

  return (
    <Box sx={{ 
      display: "flex", 
      bgcolor: darkMode ? "#121212" : "#F5F5F5", 
      minHeight: "100vh", 
      color: darkMode ? "#E0E0E0" : "#222" 
    }}>
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
              🏥 LifeBridge Hospital
            </Typography>
          </Box>

          {/* Right: Theme, Avatar, Name, Logout */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
              <IconButton 
                onClick={() => setDarkMode(!darkMode)} 
                color="inherit"
                aria-label="toggle theme"
              >
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
            
            <Avatar src="https://cdn-icons-png.freepik.com/256/2894/2894807.png?ga=GA1.1.1973256367.1748951813" />

            <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
              {doctor ? ` ${doctor.firstName} ${doctor.lastName}` : "Doctor"}
            </Typography>
            
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen || !isMobile}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? collapsedWidth : drawerWidth,
            boxSizing: "border-box",
            bgcolor: darkMode ? "#2E2E2E" : "#FFF",
            color: darkMode ? "#FFF" : "#000",
            overflowX: "hidden",
            transition: "width 0.3s",
            borderRight: `1px solid ${darkMode ? "#444" : "#E0E0E0"}`,
          },
        }}
      >
        <Toolbar />
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
                    bgcolor: darkMode ? "#444" : "#F5F5F5",
                  },
                }}
              >
                <Tooltip 
                  title={collapsed ? item.label : ""} 
                  placement="right"
                  arrow
                >
                  <ListItemIcon 
                    sx={{ 
                      color: darkMode ? "#FFF" : "#000", 
                      minWidth: 0, 
                      mr: collapsed ? "auto" : 2, 
                      justifyContent: "center" 
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
                      }
                    }}
                  />
                )}
              </ListItem>
            ))}
          </List>
          <Divider sx={{ bgcolor: darkMode ? "#444" : "#E0E0E0" }} />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: {
            xs: "100%",
            md: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`,
          },
          transition: "margin-left 0.3s",
          bgcolor: darkMode ? "#121212" : "#F5F5F5",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DoctorLayout;
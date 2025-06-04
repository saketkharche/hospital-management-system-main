// src/components/doctor/DoctorLayout.jsx
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
  useMediaQuery,
} from "@mui/material";
import {
  Home,
  CalendarToday,
  LocalPharmacy,
  Feedback as FeedbackIcon,
  Menu,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const sidebarItems = [
  {
    key: "profile",
    label: "Doctor Profile",
    icon: <Home />,
    path: "/doctor/profile",
  },
  {
    key: "view-appointments",
    label: "View Appointments",
    icon: <CalendarToday />,
    path: "/doctor/appointments",
  },
  {
    key: "issue-prescription",
    label: "Issue Prescription",
    icon: <LocalPharmacy />,
    path: "/doctor/prescriptions/new",
  },
  {
    key: "prescription-history",
    label: "Prescription History",
    icon: <LocalPharmacy />,
    path: "/doctor/prescriptions",
  },
  {
    key: "feedback",
    label: "Feedback",
    icon: <FeedbackIcon />,
    path: "/doctor/feedback",
  },
];

const DoctorLayout = ({ children, doctorData, darkMode, toggleDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: darkMode ? "#121212" : "#F5F5F5", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="sticky"
        sx={{
          background: darkMode
            ? "linear-gradient(90deg, #1E1E1E, #3A3A3A)"
            : "linear-gradient(90deg, #D72638, #A4151C)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">
            LifeBridge Hospital - Doctor Portal
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1533/1533506.png"
              alt="Doctor"
              style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
            <Typography>{doctorData?.firstName || "Doctor"}</Typography>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            bgcolor: darkMode ? "#2E2E2E" : "#FFF",
            color: darkMode ? "#FFF" : "#000",
          },
        }}
      >
        <Toolbar />
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              button
              key={item.key}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: darkMode ? "#FFF" : "#000" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default DoctorLayout;

import React, { useEffect, useState, useMemo } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CircularProgress,
  IconButton,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  PersonAdd,
  Assignment,
  Group,
  LocalHospital,
  Apartment,
  Science,
  EventNote,
  Hotel,
  Feedback as FeedbackIcon,
  Settings,
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";

import ViewPatientTable from "../components/tables/ViewPatientTable";
import ViewDoctorTable from "../components/tables/ViewDoctorTable";
import ViewStaffTable from "../components/tables/ViewStaffTable";
import ViewNursesTable from "../components/tables/ViewNursesTable";
import ManagerDepartment from "../components/admin/ManagerDepartment";
import ViewLablotryTable from "../components/admin/ViewLablotryTable";
import AdminViewAppointment from "../components/admin/AdminViewAppointment";
import ViewPatientAdmitTable from "../components/admin/ViewPatientAdmitTableDoc";
import ViewFeedbackTable from "../components/admin/FeedbackList";
import SettingsComponent from "../components/admin/Settings";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { fetchAdminData } from "../services/adminService";

const sidebarItems = [
  { key: "manage-patients", label: "Manage Patients", icon: <PersonAdd /> },
  { key: "manage-doctors", label: "Manage Doctors", icon: <Assignment /> },
  { key: "manage-staff", label: "Manage Staff", icon: <Group /> },
  { key: "manage-nurses", label: "Manage Nurses", icon: <LocalHospital /> },
  { key: "manage-department", label: "Manage Department", icon: <Apartment /> },
  { key: "manage-lablotry", label: "Manage Laboratory", icon: <Science /> },
  { key: "manage-appointment", label: "Manage Appointment", icon: <EventNote /> },
  { key: "manage-patientAdmit", label: "Manage Patient Admit", icon: <Hotel /> },
  { key: "view-feedback", label: "View Feedback", icon: <FeedbackIcon /> },
  { key: "settings", label: "Settings", icon: <Settings /> },
];

const componentMap = {
  "manage-patients": ViewPatientTable,
  "manage-doctors": ViewDoctorTable,
  "manage-staff": ViewStaffTable,
  "manage-nurses": ViewNursesTable,
  "manage-department": ManagerDepartment,
  "manage-lablotry": ViewLablotryTable,
  "manage-appointment": AdminViewAppointment,
  "manage-patientAdmit": ViewPatientAdmitTable,
  "view-feedback": ViewFeedbackTable,
  settings: SettingsComponent,
};

function AdminProfile() {
  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState("manage-patients");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const navigate = useNavigate();
  const drawerWidth = 240;

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
                backgroundColor: darkMode ? "#1e1e1e" : "#ffffff", // Match theme background
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

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Toggle dark mode and save to localStorage
  const handleThemeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const getAdminData = async () => {
    try {
      const data = await fetchAdminData();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Failed to load admin data. Please log in again.");
      sessionStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const handleSidebarClick = (component) => {
    setActiveComponent(component);
    if (isMobile) setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List sx={{ mt: 2 }}>
      {sidebarItems.map(({ key, label, icon }) => (
        <ListItem
          button
          key={key}
          onClick={() => handleSidebarClick(key)}
          sx={{
            backgroundColor:
              activeComponent === key
                ? theme.palette.action.selected
                : "transparent",
            "&:hover": { backgroundColor: theme.palette.action.hover },
            color: theme.palette.text.primary, // High-contrast text
          }}
          aria-current={activeComponent === key ? "page" : undefined}
        >
          <ListItemIcon sx={{ color: theme.palette.text.primary }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  );

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Typography color="error">{error}</Typography>
      </ThemeProvider>
    );
  }

  const ActiveComponent = componentMap[activeComponent] || ViewPatientTable;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              LifeBridge Hospital - Admin
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={handleThemeToggle}
                color="inherit"
                aria-label="toggle dark mode"
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <img
                src="https://cdn1.iconfinder.com/data/icons/doctor-5/100/01-1Patient_1-1024.png"
                alt="Admin"
                style={{
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  marginRight: "8px",
                }}
              />
              <Typography
                variant="body1"
                sx={{ marginRight: "16px", display: { xs: "none", sm: "block" } }}
              >
                {userData.firstName} {userData.lastName}
              </Typography>
              <LogoutButton />
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                backgroundColor: theme.palette.background.paper, // Match theme
                color: theme.palette.text.primary,
                top: "64px",
                height: "calc(100vh - 64px)",
              },
            }}
          >
            {drawerContent}
          </Drawer>
          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: theme.palette.background.paper, // Match theme
                color: theme.palette.text.primary,
                top: "64px",
                height: "calc(100vh - 64px)",
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: { xs: 8, sm: 10 },
            overflow: "auto",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              p: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <ActiveComponent />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminProfile;
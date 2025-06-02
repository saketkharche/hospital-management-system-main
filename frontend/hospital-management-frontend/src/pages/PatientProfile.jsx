import React, { useEffect, useState } from "react";
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
  IconButton,
  Fade,
  Grow,
} from "@mui/material";
import {
  Home,
  CalendarToday,
  LocalPharmacy,
  Feedback as FeedbackIcon,
  Menu,
} from "@mui/icons-material";

import PatientDetails from "../components/patient/PatientDetails";
import BookAppointment from "../components/patient/BookAppointment";
import ViewAppointments from "../components/patient/ViewAppointments";
import Prescriptions from "../components/patient/Prescriptions";
import Feedback from "../components/patient/Feedback";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { fetchPatientDetails } from "../services/patientService";

// Sidebar items with icons
const sidebarItems = [
  { key: "profile", label: "Patient Profile", icon: <Home /> },
  {
    key: "book-appointment",
    label: "Book Appointment",
    icon: <CalendarToday />,
  },
  {
    key: "view-appointments",
    label: "View Appointments",
    icon: <CalendarToday />,
  },
  { key: "prescriptions", label: "Prescriptions", icon: <LocalPharmacy /> },
  { key: "feedback", label: "Feedback", icon: <FeedbackIcon /> },
];

// Modern Hero Section with a background image and overlay
const HeroSection = ({ userData }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "200px", md: "350px" },
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        mb: 4,
      }}
    >
      {/* Background image with a slight dark overlay for readability */}
      <Box
        component="img"
        src="https://plus.unsplash.com/premium_vector-1682270091935-677cd4ff2f4e?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hospital Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(70%)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 1,
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          Welcome, {userData.firstName}!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#fff",
            mt: 1,
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          Your health is our top priority.
        </Typography>
      </Box>
    </Box>
  );
};

function PatientProfile() {
  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch patient details from API
  const getPatientData = async () => {
    try {
      const data = await fetchPatientDetails();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching patient data:", err);
      setError("Failed to load patient data. Please log in again.");
      sessionStorage.clear();
      navigate("/LifeBridgeHospital/login");
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  const handleSidebarClick = (component) => {
    setActiveComponent(component);
    setMobileOpen(false);
  };

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error)
    return (
      <Typography align="center" color="error">
        {error}
      </Typography>
    );

  return (
    <div>
      <CssBaseline />

      {/* Top Navbar with modern gradient styling */}
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
          py: 1,
          px: 2,
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            LifeBridge Hospital
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1533/1533506.png"
              alt="Patient"
              style={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                objectFit: "cover",
              }}
            />
            <Typography variant="body1">
              {userData.firstName} {userData.lastName}
            </Typography>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar & Main Content Layout */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              height: "100vh",
              // Updated sidebar styling – modern gradient that matches the AppBar
              background: "linear-gradient(180deg, #2C3E50, #4e54c8)",
              color: "#fff",
            },
          }}
        >
          <List sx={{ mt: 2 }}>
            {sidebarItems.map(({ key, label, icon }) => (
              <ListItem
                button
                key={key}
                onClick={() => handleSidebarClick(key)}
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  // Change background color for active and hover states to enhance modern aesthetics
                  bgcolor: activeComponent === key ? "#2980B9" : "transparent",
                  "&:hover": { bgcolor: "#3E5367" },
                  transition: "background 0.3s ease",
                }}
              >
                <ListItemIcon>
                  {React.cloneElement(icon, { style: { color: "#fff" } })}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            {activeComponent === "profile" && (
              <Grow in={true} timeout={1000}>
                <Box>
                  <HeroSection userData={userData} />
                  <PatientDetails userData={userData} />
                </Box>
              </Grow>
            )}
            {activeComponent === "book-appointment" && (
              <Fade in={true} timeout={1000}>
                <Box>
                  <BookAppointment />
                </Box>
              </Fade>
            )}
            {activeComponent === "view-appointments" && (
              <Fade in={true} timeout={1000}>
                <Box>
                  <ViewAppointments />
                </Box>
              </Fade>
            )}
            {activeComponent === "prescriptions" && (
              <Fade in={true} timeout={1000}>
                <Box>
                  <Prescriptions />
                </Box>
              </Fade>
            )}
            {activeComponent === "feedback" && (
              <Fade in={true} timeout={1000}>
                <Box>
                  <Feedback />
                </Box>
              </Fade>
            )}
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default PatientProfile;

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

function PatientProfile() {
  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch patient data
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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <CssBaseline />

      {/* 🔹 Top Navbar with Mobile Menu */}
      <AppBar position="sticky" sx={{ bgcolor: "primary.main", px: 2 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LifeBridge Hospital
          </Typography>
          <Box display="flex" alignItems="center">
            <img
              src="https://cdn1.iconfinder.com/data/icons/doctor-5/100/01-1Patient_1-1024.png"
              alt="Patient"
              style={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                marginRight: "8px",
              }}
            />
            <Typography variant="body1" sx={{ marginRight: "16px" }}>
              {userData.firstName} {userData.lastName}
            </Typography>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔹 Sidebar & Main Content Layout */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
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
              bgcolor: "#2C3E50",
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
                  bgcolor: activeComponent === key ? "#2980B9" : "transparent",
                  "&:hover": { bgcolor: "#34495E" },
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
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "16px", width: "100%" }}
        >
          <Container maxWidth="lg">
            {activeComponent === "profile" && (
              <PatientDetails userData={userData} />
            )}
            {activeComponent === "book-appointment" && <BookAppointment />}
            {activeComponent === "view-appointments" && <ViewAppointments />}
            {activeComponent === "prescriptions" && <Prescriptions />}
            {activeComponent === "feedback" && <Feedback />}
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default PatientProfile;

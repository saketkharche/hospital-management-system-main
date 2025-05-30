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
} from "@mui/material";
import {
  Home,
  CalendarToday,
  History,
  LocalPharmacy,
} from "@mui/icons-material";
import PatientDetails from "../components/patient/PatientDetails";
import BookAppointment from "../components/patient/BookAppointment";
import ViewAppointments from "../components/patient/ViewAppointments";
import MedicalHistory from "../components/patient/MedicalHistory";
import Prescriptions from "../components/patient/Prescriptions";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { fetchPatientDetails } from "../services/patientService";

function PatientProfile() {
  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch patient data from the backend using the service function
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  getPatientData();
}, []);


  const handleSidebarClick = (component) => {
    setActiveComponent(component);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <CssBaseline />
      {/* Top Navbar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LifeBridge Hospital
          </Typography>
          <Box display="flex" alignItems="center">
            <img
              src="https://cdn1.iconfinder.com/data/icons/doctor-5/100/01-1Patient_1-1024.png"
              alt="Patient"
              className="profile-img"
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

      {/* Sidebar and Main Content Layout */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            position: "fixed",
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              height: "100vh",
              backgroundColor: "#2C3E50",
              color: "#fff",
            },
          }}
        >
          <List sx={{top:50}}>
            <ListItem
              button
              onClick={() => handleSidebarClick("profile")}
              sx={{
                backgroundColor:
                  activeComponent === "profile" ? "#2980B9" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon>
                <Home style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Patient Profile" />
            </ListItem>

            <ListItem
              button
              onClick={() => handleSidebarClick("book-appointment")}
              sx={{
                backgroundColor:
                  activeComponent === "book-appointment" ? "#2980B9" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon>
                <CalendarToday style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Book Appointment" />
            </ListItem>

            <ListItem
              button
              onClick={() => handleSidebarClick("view-appointments")}
              sx={{
                backgroundColor:
                  activeComponent === "view-appointments" ? "#2980B9" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon>
                <CalendarToday style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Appointments" />
            </ListItem>

            <ListItem
              button
              onClick={() => handleSidebarClick("medical-history")}
              sx={{
                backgroundColor:
                  activeComponent === "medical-history" ? "#2980B9" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon>
                <History style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Medical History" />
            </ListItem>

            <ListItem
              button
              onClick={() => handleSidebarClick("prescriptions")}
              sx={{
                backgroundColor:
                  activeComponent === "prescriptions" ? "#2980B9" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon>
                <LocalPharmacy style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Prescriptions" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: "240px",
            padding: "16px",
          }}
        >
          <Container maxWidth="md">
            {activeComponent === "profile" && <PatientDetails userData={userData} />}
            {activeComponent === "book-appointment" && <BookAppointment />}
            {activeComponent === "view-appointments" && <ViewAppointments />}
            {activeComponent === "medical-history" && <MedicalHistory />}
            {activeComponent === "prescriptions" && <Prescriptions />}
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default PatientProfile;

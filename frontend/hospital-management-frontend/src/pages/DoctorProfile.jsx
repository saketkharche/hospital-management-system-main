import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  CircularProgress,
  Alert,
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutButton from "./LogoutButton";

// Sidebar Items with routing
const sidebarItems = [
  { key: "profile", label: "Doctor Profile", icon: <Home />, path: "/doctor/profile" },
  { key: "view-appointments", label: "View Appointments", icon: <CalendarToday />, path: "/doctor/appointments" },
  { key: "issue-prescription", label: "Issue Prescription", icon: <LocalPharmacy />, path: "/doctor/prescriptions/new" },
  { key: "prescription-history", label: "Prescription History", icon: <LocalPharmacy />, path: "/doctor/prescriptions" },
  { key: "feedback", label: "Feedback", icon: <FeedbackIcon />, path: "/doctor/feedback" },
];

// Hero Section
const HeroSection = ({ doctorData }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
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
      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/assets/images/docprofile.jpg`}
        alt="Doctor Background"
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
          color: "#fff",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ textShadow: "2px 2px 6px rgba(0,0,0,0.8)" }}
        >
          Welcome, {doctorData?.firstName || "Loading..."} {doctorData?.lastName || ""}
        </Typography>
        <Typography
          variant="h5"
          sx={{ mt: 1, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
        >
          Specialization: {doctorData?.specialization || "Loading..."}
        </Typography>
      </Box>
    </Box>
  </motion.div>
);

// Doctor Details Section
const DoctorDetailsSection = ({ doctorData, darkMode }) => (
  <section
    style={{
      marginTop: "20px",
      padding: "20px",
      backgroundColor: darkMode ? "#1E1E1E" : "#fff",
      color: darkMode ? "#f0f0f0" : "#222",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
      Doctor Information
    </Typography>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
      }}
    >
      <Typography variant="body1">📧 <strong>Email:</strong> {doctorData?.email}</Typography>
      <Typography variant="body1">📞 <strong>Phone:</strong> {doctorData?.phoneNumber}</Typography>
      <Typography variant="body1">📍 <strong>City:</strong> {doctorData?.city}</Typography>
      <Typography variant="body1">🏥 <strong>State:</strong> {doctorData?.state}</Typography>
      <Typography variant="body1">🌍 <strong>Country:</strong> {doctorData?.country}</Typography>
      <Typography variant="body1">🩸 <strong>Blood Group:</strong> {doctorData?.bloodGroup}</Typography>
    </div>
  </section>
);

// Main Component
function DoctorProfile() {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const getDoctorData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/hospital/api/doctors/mydetails", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctorData(response.data);
      setLoading(false);
      toast.success("Doctor data loaded successfully");
    } catch (err) {
      console.error("Error fetching doctor data:", err);
      setError("Failed to load doctor data. Please try again.");
      setLoading(false);
      toast.error("Failed to load doctor data");
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: darkMode ? "#121212" : "#F5F5F5",
        color: darkMode ? "#E0E0E0" : "#222",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="sticky"
        sx={{
          background: darkMode
            ? "linear-gradient(90deg, #1E1E1E, #3A3A3A)"
            : "linear-gradient(90deg, #D72638, #A4151C)",
          py: 1,
          px: 2,
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.3)",
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
            LifeBridge Hospital - Doctor Portal
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1533/1533506.png"
              alt="Doctor"
              style={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                objectFit: "cover",
              }}
            />
            <Typography variant="body1">
              {doctorData?.firstName || "Loading..."}
            </Typography>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
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
                setMobileOpen(false);
                navigate(item.path);
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

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ p: 3 }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <HeroSection doctorData={doctorData} />
            <DoctorDetailsSection doctorData={doctorData} darkMode={darkMode} />
          </>
        )}
      </Container>

      <ToastContainer position="top-right" autoClose={3000} theme={darkMode ? "dark" : "light"} />
    </Box>
  );
}

export default DoctorProfile;

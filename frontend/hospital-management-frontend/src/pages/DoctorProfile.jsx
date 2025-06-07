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
  useTheme,
  Paper
} from "@mui/material";
import {
  Home,
  CalendarToday,
  LocalPharmacy,
  Feedback as FeedbackIcon,
  Menu,
  DarkMode,
  LightMode,
  Person,
  MedicalServices,
  People,
  EventAvailable,
  ReceiptLong
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutButton from "./LogoutButton";

function DoctorProfile() {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const getDoctorData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/hospital/api/doctors/mydetails",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      path: "/doctor/appointments/:id/prescription",
    },
    {
      key: "feedback",
      label: "Feedback",
      icon: <FeedbackIcon />,
      path: "/doctor/feedback",
    },
  ];

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
              src="https://cdn-icons-png.freepik.com/256/2894/2894807.png?ga=GA1.1.1973256367.1748951813"
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
            
            {/* Statistics Section - Added from previous version */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: 3,
                mt: 4,
              }}
            >
              <StatCard
                icon={<EventAvailable fontSize="large" />}
                title="Upcoming Appointments"
                value="12"
                color="#1976d2"
                darkMode={darkMode}
              />
              <StatCard
                icon={<People fontSize="large" />}
                title="Patients Today"
                value="5"
                color="#2e7d32"
                darkMode={darkMode}
              />
              <StatCard
                icon={<ReceiptLong fontSize="large" />}
                title="Prescriptions This Month"
                value="47"
                color="#ed6c02"
                darkMode={darkMode}
              />
            </Box>
          </>
        )}
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
      />
    </Box>
  );
}

// StatCard Component for statistics
const StatCard = ({ icon, title, value, color, darkMode }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      textAlign: "center",
      bgcolor: darkMode ? "#2e2e2e" : "#fff",
      borderTop: `4px solid ${color}`,
      transition: "transform 0.3s",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    }}
  >
    <Box
      sx={{
        color: color,
        mb: 1,
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="h4" fontWeight="bold">
      {value}
    </Typography>
  </Paper>
);

// Hero Section (unchanged)
const HeroSection = ({ doctorData }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
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
          Welcome, {doctorData?.firstName || "Loading..."}{" "}
          {doctorData?.lastName || ""}
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

// Doctor Details Section (unchanged)
const DoctorDetailsSection = ({ doctorData, darkMode }) => (
  <Paper
    elevation={3}
    sx={{
      mt: "20px",
      p: "20px",
      backgroundColor: darkMode ? "#1E1E1E" : "#fff",
      color: darkMode ? "#f0f0f0" : "#222",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
      Doctor Information
    </Typography>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
      }}
    >
      <Typography variant="body1">
        📧 <strong>Email:</strong> {doctorData?.email}
      </Typography>
      <Typography variant="body1">
        📞 <strong>Phone:</strong> {doctorData?.phoneNumber}
      </Typography>
      <Typography variant="body1">
        📍 <strong>City:</strong> {doctorData?.city}
      </Typography>
      <Typography variant="body1">
        🏥 <strong>State:</strong> {doctorData?.state}
      </Typography>
      <Typography variant="body1">
        🌍 <strong>Country:</strong> {doctorData?.country}
      </Typography>
      <Typography variant="body1">
        🩸 <strong>Blood Group:</strong> {doctorData?.bloodGroup}
      </Typography>
    </Box>
  </Paper>
);

export default DoctorProfile;
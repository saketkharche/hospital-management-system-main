import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent, Avatar, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { 
  Hospital, Ambulance, ScanLine, Baby, Radiation, HeartPulse, Brain, Bone, Ear, BabyIcon
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const teamMembers = [
  { name: "Shital Hiray", role: "Frontend Developer", description: "Creating a seamless and responsive UI.", imageUrl: "./assets/images/Shital.jpeg" },
  { name: "Saket Kharche", role: "Full Stack Developer", description: "Bridges frontend and backend for full integration.", imageUrl: "./assets/images/saket.jpg" },
  { name: "Yuvraj Patil", role: "Backend Developer", description: "Handles server-side logic and databases.", imageUrl: "./assets/images/yuvraj.jpg" },
];

const serviceIcons = [
  <Hospital size={32} color="#1976d2" />, 
  <Ambulance size={32} color="#1976d2" />, 
  <ScanLine size={32} color="#1976d2" />, 
  <Radiation size={32} color="#1976d2" />, 
  <Baby size={32} color="#1976d2" />, 
  <HeartPulse size={32} color="#1976d2" />, 
  <Brain size={32} color="#1976d2" />, 
  <Bone size={32} color="#1976d2" />, 
  <Ear size={32} color="#1976d2" />, 
  <BabyIcon size={32} color="#1976d2" />
];

const services = [
  "Primary & Preventive Care", "Emergency & Critical Services", "Advanced Diagnostics & Imaging",
  "Cancer Care & Oncology", "Maternity & Neonatal Services", "Chronic Disease & Dialysis",
  "Neuro & Spine Treatments", "Orthopedic Surgery & Rehab", "ENT & Pulmonary Care", "Pediatrics & Child Surgery",
];

const features = [
  { icon: <Ambulance size={40} color="#1976d2" />, title: "24/7 Emergency Services", description: "Round-the-clock emergency care with skilled professionals." },
  { icon: <Hospital size={40} color="#1976d2" />, title: "Specialized Departments", description: "Cardiology, Neurology, Oncology, and more." },
  { icon: <HeartPulse size={40} color="#1976d2" />, title: "Experienced Doctors", description: "Qualified, compassionate medical professionals." },
];

const AboutUs = () => {
  return (
    <Box>
      <Navbar />

      {/* Hero Section with Glassmorphism Effect */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <Box
          sx={{
            minHeight: "100vh",
            backgroundImage: "url(./assets/images/abouts.jpg)",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" fontWeight="bold" sx={{ color: "white", textShadow: "2px 2px 6px rgba(0,0,0,0.8)" }}>
              LifeBridge Hospital
            </Typography>
            <Typography variant="h6" sx={{ color: "#f8f9fa", maxWidth: 800, mx: "auto" }}>
              Providing world-class healthcare with compassion & innovation.
            </Typography>
          </Container>
        </Box>
      </motion.div>

      {/* Services Section with Icons */}
      <Box sx={{ bgcolor: "#e3f2fd", py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={2}>
            {services.map((service, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper elevation={4} sx={{ p: 3, borderRadius: 4, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                  {serviceIcons[idx]} {/* ✅ Lucide React Icons Added */}
                  <Typography variant="subtitle1" fontWeight="600">
                    {service}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Card elevation={3} sx={{ textAlign: "center", p: 3, borderRadius: 3 }}>
                    <Avatar src={member.imageUrl} alt={member.name} sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">{member.name}</Typography>
                      <Typography variant="subtitle1" color="text.secondary">{member.role}</Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>{member.description}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default AboutUs;
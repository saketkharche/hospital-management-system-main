import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  Stack,
} from "@mui/material";
import {
  LocalHospital,
  AccessTime,
  People,
  Phone,
  Email,
  LocationOn,
  Devices,
  BugReport,
} from "@mui/icons-material";
import Navbar from "./Navbar"; // ✅ Fixed
import Footer from "./Footer"; // ✅ Fixed

const teamMembers = [
  {
    name: "Shital Hiray",
    role: "Frontend Developer",
    description: "Creating a seamless and responsive UI.",
    imageUrl: "./assets/images/Shital.jpeg",
  },
  {
    name: "Saket Kharche",
    role: "Full Stack Developer",
    description: "Bridges frontend and backend for full integration.",
    imageUrl: "./assets/images/saket.jpg",
  },
  {
    name: "Yuvraj Patil",
    role: "Backend Developer",
    description: "Handles server-side logic and databases.",
    imageUrl: "./assets/images/yuvraj.jpg",
  },
];

const services = [
  "Primary & Preventive Care",
  "Emergency & Critical Services",
  "Advanced Diagnostics & Imaging",
  "Cancer Care & Oncology",
  "Maternity & Neonatal Services",
  "Chronic Disease & Dialysis",
  "Neuro & Spine Treatments",
  "Orthopedic Surgery & Rehab",
  "ENT & Pulmonary Care",
  "Pediatrics & Child Surgery",
];

const features = [
  {
    icon: <AccessTime fontSize="inherit" color="primary" />,
    title: "24/7 Emergency Services",
    description: "Round-the-clock emergency care with skilled professionals.",
  },
  {
    icon: <LocalHospital fontSize="inherit" color="primary" />,
    title: "Specialized Departments",
    description: "Cardiology, Neurology, Oncology, and more.",
  },
  {
    icon: <People fontSize="inherit" color="primary" />,
    title: "Experienced Doctors",
    description: "Qualified, compassionate medical professionals.",
  },
  {
    icon: <Devices fontSize="inherit" color="primary" />,
    title: "UI/UX Design Excellence",
    description: "User-focused design for seamless experiences.",
  },
  {
    icon: <BugReport fontSize="inherit" color="primary" />,
    title: "Quality Assurance",
    description:
      "Ensures reliability and performance through rigorous testing.",
  },
];

const AboutUs = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: "url(./assets/images/abouts.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      <Box sx={{ bgcolor: "rgba(126, 179, 207, 0.6)", pt: 12, pb: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            color="#D2191A"
            fontWeight={700}
            align="center"
            gutterBottom
          >
            LifeBridge Hospital
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ maxWidth: 7200, mx: "auto", color: "#333" }}
          >
            LifeBridge Hospital is dedicated to providing world-class medical
            care with compassion and respect. Located in the heart of the city,
            we’ve been serving our community for over 25 years.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "rgba(227,242,253,0.6)", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                color="#D2191A"
                fontWeight={700}
                align="center"
                gutterBottom
              >
                Our Vision
              </Typography>
              <Typography variant="h6" align="center">
                To revolutionize healthcare delivery by creating an intelligent,
                fully integrated OPD and hospital management platform that
                prioritizes patient wellbeing, streamlines clinical workflows,
                and fosters a connected healthcare community.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                color="#D2191A"
                fontWeight={700}
                align="center"
                gutterBottom
              >
                Our Mission
              </Typography>
              <Typography variant="h6" align="center">
                To develop innovative, user-friendly solutions that empower
                healthcare professionals with real-time data, automate
                administrative tasks, and enhance patient engagement—ensuring
                efficient, transparent, and compassionate care for every
                individual.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "rgba(255,248,225,0.6)", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            color="#D2191A"
            fontWeight={700}
            align="center"
            gutterBottom
          >
            Medical Services
          </Typography>
          <Grid container spacing={2}>
            {services.map((service, idx) => (
              <Grid item xs={12} sm={6} md={2.4} key={idx}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    bgcolor: "#ffffffcc",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    • {service}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "rgba(237,231,246,0.6)", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            color="#D2191A"
            fontWeight={700}
            align="center"
            gutterBottom
          >
            Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  elevation={3}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "#ffffffcc",
                  }}
                >
                  <Avatar
                    src={member.imageUrl}
                    alt={member.name}
                    sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="primary"
                      gutterBottom
                    >
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {member.role}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "rgba(224,242,241,0.6)", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            color="#D2191A"
            fontWeight={700}
            align="center"
            gutterBottom
          >
            Our Core Features & Contact Info
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    bgcolor: "#ffffffcc",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 220,
                  }}
                >
                  <Box sx={{ fontSize: 40, color: "primary.main" }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 2, fontWeight: 700, color: "primary.main" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#ffffffcc",
                  minHeight: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  Contact Information
                </Typography>
                <Stack spacing={2} mt={2}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOn sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body1">
                      Lifebridge Hospital, Akurdi Station Rd, Pune 411035
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Email sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body1">
                      contact@lifebridgehospital.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Phone sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body1">+91 9119999070</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default AboutUs;

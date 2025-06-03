import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      title: "General Medicine",
      desc: "Comprehensive health checkups and treatments.",
      image: `${process.env.PUBLIC_URL}/assets/images/gmedicine.jpg`,
    },
    {
      title: "Pediatrics",
      desc: "Specialized care for infants and children.",
      image: `${process.env.PUBLIC_URL}/assets/images/Paediatrics.jpg`,
    },
    {
      title: "Cardiology",
      desc: "Heart-related diagnostics and treatments.",
      image: `${process.env.PUBLIC_URL}/assets/images/cardiology.jpg`,
    },
    {
      title: "Orthopedics",
      desc: "Bone, joint and muscle care and surgeries.",
      image: `${process.env.PUBLIC_URL}/assets/images/ortho.jpg`,
    },
    {
      title: "Emergency Care",
      desc: "24/7 emergency services for critical cases.",
      image: `${process.env.PUBLIC_URL}/assets/images/emer.jpg`,
    },
    {
      title: "Surgery",
      desc: "Advanced surgical procedures with expert teams.",
      image: `${process.env.PUBLIC_URL}/assets/images/surgery.jpg`,
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/homepage.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
            boxShadow: "0px 20px 30px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.9)", mb: 2 }}
            >
              Welcome to LifeBridge Hospital 
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, textShadow: "1px 1px 6px rgba(0,0,0,0.8)" }}
            >
              Your trusted healthcare partner.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
              >
                Book Appointment
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={scrollToServices}
              >
                Explore Services
              </Button>
            </Box>

            <Box mt={6} display="flex" justifyContent="center">
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Typography variant="h6" sx={{ color: "red", opacity: 0.8 }}>
                  ↓ Scroll Down
                </Typography>
              </motion.div>
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* SERVICES SECTION */}
      <Box id="services" py={8} sx={{ backgroundColor: "#e3f2fd", mt: 4 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            mb={6}
            fontWeight="bold"
            color="#1976d2"
          >
            Our Services
          </Typography>

          <Grid container spacing={4}>
            {services.map((service, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                      borderRadius: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={service.image}
                      alt={service.title}
                    />
                    <CardContent sx={{ bgcolor: "rgba(25, 118, 210, 0.1)" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {service.title}
                      </Typography>
                      <Typography variant="body2">{service.desc}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;

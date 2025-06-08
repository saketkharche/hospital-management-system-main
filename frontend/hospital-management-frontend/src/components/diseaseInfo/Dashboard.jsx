import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import DiseaseInfo from "./DiseaseInfo";
import DiseaseMortalityChart from "./DiseaseMortalityChart";

const Dashboard = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content container */}
      <Container maxWidth="lg" sx={{ pt: 6, pb: 8, minHeight: "80vh" }}>
        <Box
          my={4}
          sx={{
            textAlign: "center",
            mb: 6,
            userSelect: "none",
            animation: "fadeIn 1s ease forwards",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#1565c0",
              letterSpacing: "0.05em",
              textShadow: "0 2px 6px rgba(21, 101, 192, 0.4)",
              transition: "color 0.3s ease",
              "&:hover": { color: "#0d47a1", cursor: "default" },
            }}
          >
            Disease Information & Mortality Dashboard
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "medium",
              color: "#333",
              opacity: 0.75,
              fontStyle: "italic",
            }}
          >
            Overview of disease statistics and related information.
          </Typography>
        </Box>

        <Box
          my={4}
          sx={{
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(25, 118, 210, 0.15)",
            padding: 3,
            backgroundColor: "#f5f9ff",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 15px 35px rgba(21, 101, 192, 0.3)",
            },
          }}
        >
          <DiseaseInfo />
        </Box>

        <Box
          my={4}
          sx={{
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(25, 118, 210, 0.15)",
            padding: 3,
            backgroundColor: "#f5f9ff",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 15px 35px rgba(21, 101, 192, 0.3)",
            },
          }}
        >
          <DiseaseMortalityChart />
        </Box>
      </Container>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
};

export default Dashboard;

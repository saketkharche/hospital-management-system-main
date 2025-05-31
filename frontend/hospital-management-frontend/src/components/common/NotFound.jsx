import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorSvg = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginBottom: 24 }}
  >
    <circle cx="32" cy="12" r="10" fill="#1976d2" />
    <rect x="18" y="24" width="28" height="30" fill="#90caf9" rx="6" />
    <path d="M20 54h24v6H20v-6z" fill="#1565c0" />
    <circle cx="32" cy="12" r="6" fill="#fff" />
    <rect x="28" y="40" width="8" height="12" fill="#1565c0" rx="2" />
    <circle cx="32" cy="20" r="2" fill="#1976d2" />
  </svg>
);

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 3,
        backgroundColor: "#f3f6f9",
      }}
    >
      <DoctorSvg />
      <Typography variant="h3" gutterBottom color="primary">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        size="large"
      >
        Go to Home
      </Button>
    </Container>
  );
}

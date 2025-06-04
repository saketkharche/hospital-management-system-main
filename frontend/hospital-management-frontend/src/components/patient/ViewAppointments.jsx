import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Fade,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";

// Stylish background container
const StyledContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
  maxWidth: "900px",
  margin: "auto",
}));

const ViewAppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication failed. Please log in again.");
          setLoading(false);
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const loggedInUser = payload.sub;

        const response = await axios.get(
          "http://localhost:8080/hospital/api/appointments/my-appointments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userAppointments = response.data.filter(
          (appt) =>
            appt.patientEmail?.toLowerCase() === loggedInUser.toLowerCase()
        );

        setAppointments(userAppointments);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
        setError("Could not load appointments.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <StyledContainer>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
        sx={{
          fontFamily: "Poppins, sans-serif",
          color: "#2C3E50",
        }}
      >
        My Appointments
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center" mt={4}>
          {error}
        </Typography>
      ) : appointments.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" mt={4}>
          No appointments found.
        </Typography>
      ) : (
        <Fade in timeout={600}>
          <Stack spacing={3}>
            {appointments.map((appt, index) => (
              <Card
                key={index}
                elevation={3}
                sx={{
                  transition: "transform 0.3s ease",
                  borderRadius: 3,
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                     {appt.doctorName}
                  </Typography>
                  <Typography>
                    <strong>Date:</strong> {appt.date}
                  </Typography>
                  <Typography>
                    <strong>Time:</strong> {appt.time}
                  </Typography>
                  <Chip
                    label={appt.status}
                    color={getStatusColor(appt.status)}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Fade>
      )}
    </StyledContainer>
  );
};

export default ViewAppointmentTable;

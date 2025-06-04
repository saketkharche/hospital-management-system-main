import React, { useEffect, useState } from "react";
import DoctorLayout from "./DoctorLayout";
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
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
  maxWidth: "900px",
  margin: "auto",
}));

const ViewDoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorData, setDoctorData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/hospital/api/appointments/doctor-appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(response.data);
    } catch (err) {
      setError("Could not load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctor = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8080/hospital/api/doctors/mydetails",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoctorData(res.data);
    } catch {
      setError("Authentication error. Please re-login.");
    }
  };

  useEffect(() => {
    fetchDoctor();
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
    <DoctorLayout
      doctorData={doctorData}
      darkMode={darkMode}
      toggleDarkMode={() => setDarkMode((prev) => !prev)}
    >
      <StyledContainer>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          sx={{ fontFamily: "Poppins, sans-serif", color: "#2C3E50" }}
        >
          Doctor Appointments
        </Typography>

        {loading ? (
          <Box textAlign="center" mt={5}>
            <CircularProgress />
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
                      Patient: {appt.patientName}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography>
                      <strong>Doctor:</strong> {appt.doctorName}
                    </Typography>
                    <Typography>
                      <strong>Date:</strong> {appt.date}
                    </Typography>
                    <Typography>
                      <strong>Time:</strong> {appt.time}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong>{" "}
                      {appt.patientEmail || "Not Provided"}
                    </Typography>
                    <Typography>
                      <strong>Status:</strong> {appt.status}
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
    </DoctorLayout>
  );
};

export default ViewDoctorAppointments;

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

// Stylish container
const StyledContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
  maxWidth: "900px",
  margin: "auto",
}));

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication failed. Please log in again.");
          setLoading(false);
          return;
        }

        // Extract user email from JWT
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userEmail = payload.sub?.toLowerCase();

        const response = await axios.get(
            "http://localhost:8080/hospital/api/prescriptions/my-prescriptions",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
        );

        // Filter prescriptions for this user and issued only
        const filteredPrescriptions = response.data.filter(
            (p) =>
                p.patientEmail?.toLowerCase() === userEmail && p.issued === true
        );

        setPrescriptions(filteredPrescriptions);
        setLoading(false);
      } catch (err) {
        console.error("Error loading prescriptions:", err.message);
        setError("Could not load prescriptions.");
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

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
          My Prescriptions
        </Typography>

        {loading ? (
            <Box textAlign="center" mt={5}>
              <CircularProgress color="primary" />
            </Box>
        ) : error ? (
            <Typography color="error" textAlign="center" mt={4}>
              {error}
            </Typography>
        ) : prescriptions.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" mt={4}>
              No prescriptions found.
            </Typography>
        ) : (
            <Fade in timeout={600}>
              <Stack spacing={3}>
                {prescriptions.map((p, index) => (
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
                          Issued by: {p.doctorName}
                        </Typography>
                        <Typography>
                          <strong>Date:</strong> {p.date}
                        </Typography>
                        <Typography>
                          <strong>Instructions:</strong>{" "}
                          {p.instructions ? p.instructions : "N/A"}
                        </Typography>
                        <Box mt={2}>
                          <Typography variant="body2" fontWeight="bold" gutterBottom>
                            Medicines:
                          </Typography>
                          {p.medicines && p.medicines.length > 0 ? (
                              p.medicines.map((med, idx) => (
                                  <Chip
                                      key={idx}
                                      label={med}
                                      color="primary"
                                      sx={{ m: 0.5 }}
                                  />
                              ))
                          ) : (
                              <Chip label="No medicines listed" variant="outlined" />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                ))}
              </Stack>
            </Fade>
        )}
      </StyledContainer>
  );
};

export default Prescriptions;

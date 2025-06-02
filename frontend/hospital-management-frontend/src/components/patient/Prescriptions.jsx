import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  List,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Stored Token:", token);

        if (!token) {
          setError("Authentication failed. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/hospital/api/prescriptions/my-prescriptions",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("API Response:", response.data);
        setPrescriptions(response.data);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error loading prescriptions:",
          err.response?.data || err.message
        );
        setError("Could not load prescriptions.");
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, bgcolor: "#f5f5f5" }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Your Prescriptions
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box textAlign="center" mt={2}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {!loading && prescriptions.length === 0 && (
          <Typography textAlign="center" color="text.secondary">
            No prescriptions found.
          </Typography>
        )}

        <List sx={{ mt: 2 }}>
          {prescriptions.map((p, index) => (
            <Card
              elevation={4}
              sx={{ my: 2, p: 2, borderRadius: 2 }}
              key={index}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  {`Issued by: ${p.doctorName}`}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  <strong>Date:</strong> {p.date}
                </Typography>
                <Typography variant="body2">
                  <strong>Instructions:</strong> {p.instructions || "N/A"}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.primary" gutterBottom>
                    Medicines:
                  </Typography>
                  {Array.isArray(p.medicines) ? (
                    p.medicines.map((medicine, idx) => (
                      <Chip
                        key={idx}
                        label={medicine}
                        sx={{ m: 0.5 }}
                        color="primary"
                      />
                    ))
                  ) : (
                    <Chip label={p.medicines} color="primary" />
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Prescriptions;

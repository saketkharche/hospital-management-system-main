import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useTheme } from "@mui/material/styles";

// Helper function to extract doctor name from strings like "Dr.Sakshi Deshmukh-Psychiatry"
const extractDoctorName = (doctorString) => {
  if (!doctorString) return "";
  const match = doctorString.match(/Dr\.([A-Za-z]+\s[A-Za-z]+)/i);
  return match ? match[1].trim() : "";
};

const DoctorFeedbackList = () => {
  const theme = useTheme();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const fetchDoctorAndFeedback = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("Authentication token missing.");
          setLoading(false);
          return;
        }

        // Step 1: Get logged-in doctor's details
        const doctorRes = await axios.get(
          "http://localhost:8080/hospital/api/doctors/mydetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const loggedInDoctor = doctorRes.data;

        // Clean up first name (remove Dr. prefix)
        const firstNameCleaned = loggedInDoctor.firstName.replace(/Dr\./i, "").trim();
        const currentDoctorName = `${firstNameCleaned} ${loggedInDoctor.lastName}`;
        setDoctorName(currentDoctorName); // Now: "Sakshi Deshmukh"

        // Step 2: Fetch all feedback
        const feedbackRes = await axios.get(
          "http://localhost:8080/hospital/api/feedback",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Step 3: Filter feedback by doctor name
        const filtered = feedbackRes.data.filter((fb) => {
          const feedbackDoctorName = extractDoctorName(fb.doctor);
          return (
            feedbackDoctorName.trim().toLowerCase() ===
            currentDoctorName.trim().toLowerCase()
          );
        });

        setFeedbackList(filtered);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load feedback or doctor info.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAndFeedback();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, #1e1e1e, #2c2c2c)"
              : "linear-gradient(145deg, #ffffff, #f9f9f9)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 4px 20px rgba(255,255,255,0.1)"
              : "0px 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
          color="primary"
        >
          Your Patient Feedback ({doctorName || "Loading..."})
        </Typography>

        {/* Average Rating Summary */}
        {feedbackList.length > 0 && (
          <Box mb={3} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Average Rating:{" "}
              {(feedbackList.reduce((acc, cur) => acc + cur.rating, 0) / feedbackList.length).toFixed(1)} / 5
            </Typography>
            <Rating
              value={
                feedbackList.reduce((acc, cur) => acc + cur.rating, 0) /
                feedbackList.length
              }
              precision={0.1}
              readOnly
              size="large"
              sx={{ fontSize: "2rem", color: "#FFB400" }}
            />
          </Box>
        )}

        {/* Loader */}
        {loading ? (
          <Box textAlign="center" my={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        ) : feedbackList.length === 0 ? (
          <Alert severity="info" sx={{ my: 2 }}>
            No feedback available yet.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {feedbackList.map((fb) => (
              <Grid item xs={12} key={fb.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: theme.shadows[3],
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[6],
                    },
                    p: 2,
                  }}
                >
                  <CardContent>
                    {/* ID & Rating */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        ID: {fb.id}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Rating value={fb.rating > 0 ? fb.rating : 0} precision={0.5} readOnly size="small" />
                        <Typography variant="body2" ml={1} color="text.secondary">
                          {fb.rating > 0 ? `${fb.rating}/5` : "Unrated"}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Comments */}
                    <Typography variant="body1" paragraph fontStyle="italic" align="left">
                      <strong>Comments:</strong> "{fb.comments || "No comments provided."}"
                    </Typography>

                    {/* Doctor Name */}
                    <Typography variant="body2" color="text.secondary" align="left">
                      <strong>Doctor:</strong> {fb.doctor || "-"}
                    </Typography>

                    {/* Patient Name */}
                    <Typography variant="body2" color="text.secondary" align="left">
                      <strong>Patient:</strong> {fb.name || "-"}
                    </Typography>

                    {/* Email */}
                    <Typography variant="body2" color="text.secondary" align="left">
                      <strong>Email:</strong> {fb.email || "-"}
                    </Typography>

                    {/* Phone */}
                    <Typography variant="body2" color="text.secondary" align="left">
                      <strong>Phone:</strong> {fb.phone || "-"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default DoctorFeedbackList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Rating,
} from "@mui/material";

export default function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/hospital/api/feedback")
      .then((response) => {
        setFeedbackList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patient Feedback
      </Typography>
      {feedbackList.length === 0 ? (
        <Typography>No feedback available.</Typography>
      ) : (
        feedbackList.map((fb, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2, boxShadow: 3 }}>
            <Typography variant="h6">{fb.name}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {fb.email} | {fb.phone}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Doctor:</strong> {fb.doctor}
            </Typography>
            <Rating value={fb.rating} readOnly sx={{ mt: 1 }} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {fb.comments}
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </Paper>
        ))
      )}
    </Box>
  );
}

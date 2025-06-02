import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Rating,
  Avatar,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

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

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress size={48} />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6, px: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: "primary.main", mb: 4, textAlign: "center" }}
      >
        Patient Feedback
      </Typography>

      {feedbackList.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 6 }}
        >
          No feedback available.
        </Typography>
      ) : (
        feedbackList.map((fb, index) => (
          <Paper
            key={index}
            elevation={6}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              bgcolor: "background.paper",
              boxShadow:
                "0 8px 16px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow:
                  "0 12px 24px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {fb.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {fb.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {fb.email} | {fb.phone}
                </Typography>
              </Box>
            </Stack>

            <Typography
              variant="subtitle1"
              sx={{ mt: 1, fontWeight: 600, color: "text.primary" }}
            >
              Doctor: {fb.doctor}
            </Typography>

            <Rating
              value={fb.rating}
              readOnly
              precision={0.5}
              size="medium"
              sx={{ mt: 1, color: "secondary.main" }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />

            <Typography
              variant="body1"
              sx={{ mt: 2, fontStyle: "italic", color: "text.secondary" }}
            >
              "{fb.comments}"
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}

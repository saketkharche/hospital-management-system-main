import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fetch all feedback data
  useEffect(() => {
    axios
      .get("http://localhost:8080/hospital/api/feedback")
      .then((response) => {
        setFeedbackList(response.data);
        if (response.data.length > 0) {
          setSelectedDoctor(response.data[0].doctor); // Default selection
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      });
  }, []);

  // Group feedback by doctor
  const getGroupedFeedback = () => {
    return feedbackList.reduce((acc, curr) => {
      if (!acc[curr.doctor]) {
        acc[curr.doctor] = [];
      }
      acc[curr.doctor].push(curr);
      return acc;
    }, {});
  };

  const groupedFeedback = getGroupedFeedback();
  const doctors = Object.keys(groupedFeedback);

  // Helper: Calculate average rating
  const calculateAverageRating = (ratings = []) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress size={48} />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6, px: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "primary.main",
          mb: 4,
          textAlign: "center",
        }}
      >
        Doctor Feedback & Ratings
      </Typography>

      {doctors.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 6 }}
        >
          No feedback available.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {/* Left Sidebar: Doctor List */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{ p: 2, maxHeight: 600, overflowY: "auto" }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Doctors
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {doctors.map((doctorName, index) => {
                const ratings = groupedFeedback[doctorName];
                const avgRating = calculateAverageRating(ratings);
                const totalRatings = ratings.length;

                return (
                  <Card
                    key={index}
                    onClick={() => setSelectedDoctor(doctorName)}
                    sx={{
                      mb: 2,
                      cursor: "pointer",
                      border:
                        selectedDoctor === doctorName
                          ? "2px solid #1976d2"
                          : "none",
                      boxShadow:
                        selectedDoctor === doctorName
                          ? "0 4px 12px rgba(0,0,0,0.2)"
                          : "0 2px 6px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          {doctorName.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      title={doctorName}
                      subheader={`${totalRatings} review(s)`}
                      action={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Rating
                            value={avgRating}
                            precision={0.1}
                            readOnly
                            size="small"
                            icon={<StarIcon fontSize="inherit" />}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.5 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          <Typography sx={{ ml: 1, fontWeight: 600 }}>
                            {avgRating}
                          </Typography>
                        </Box>
                      }
                    />
                  </Card>
                );
              })}
            </Paper>
          </Grid>

          {/* Right Side: Selected Doctor Feedback */}
          <Grid item xs={12} md={8}>
            {selectedDoctor && (
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: "background.paper",
                  boxShadow:
                    "0 8px 16px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {selectedDoctor.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedDoctor}
                  </Typography>
                </Stack>

                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <Rating
                    value={calculateAverageRating(
                      groupedFeedback[selectedDoctor],
                    )}
                    precision={0.1}
                    readOnly
                    size="large"
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />
                    }
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      ml: 2,
                      fontWeight: 600,
                      color: "secondary.main",
                    }}
                  >
                    {calculateAverageRating(groupedFeedback[selectedDoctor])} (
                    {groupedFeedback[selectedDoctor]?.length} reviews)
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {groupedFeedback[selectedDoctor]?.map((comment, idx) => (
                  <Box key={idx} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {comment.name}
                    </Typography>
                    <Rating
                      value={comment.rating}
                      readOnly
                      precision={0.5}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography
                      variant="body1"
                      fontStyle="italic"
                      color="text.secondary"
                    >
                      "{comment.comments}"
                    </Typography>
                  </Box>
                ))}

                {groupedFeedback[selectedDoctor]?.length === 0 && (
                  <Typography color="text.secondary">
                    No feedback yet.
                  </Typography>
                )}
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

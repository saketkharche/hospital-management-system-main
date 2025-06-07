import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    rating: 0,
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/hospital/api/doctors/fetchAllDoctorNames",
        );
        setDoctors(response.data.map((doc) => doc.name));
      } catch (error) {
        setFetchError("Could not load doctor list. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Validate form fields
  const validate = () => {
    const tempErrors = {};
    let isValid = true;

    // Name validation
    if (!form.name.trim()) {
      tempErrors.name = "Name is required.";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    // Phone validation (Indian format: 10 digits)
    if (!form.phone) {
      tempErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      tempErrors.phone = "Phone must be 10 digits.";
      isValid = false;
    }

    // Doctor selection
    if (!form.doctor) {
      tempErrors.doctor = "Please select a doctor.";
      isValid = false;
    }

    // Rating
    if (!form.rating || form.rating <= 0) {
      tempErrors.rating = "Rating is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRatingChange = (e, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("http://localhost:8080/hospital/api/feedback", form);
        toast.success("Thank you for your feedback!", {
          position: "top-right",
          autoClose: 3000,
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          doctor: "",
          rating: 0,
          comments: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Feedback submission error:", error);
        toast.error("Failed to submit feedback. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <ToastContainer />
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "#333" }}
      >
        Patient Feedback
      </Typography>

      {fetchError && (
        <Typography color="error" align="center">
          {fetchError}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={6} sx={{ p: 3, borderRadius: 2 }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Full Name */}
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
              required
            />

            {/* Email */}
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              required
            />

            {/* Phone Number */}
            <TextField
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              fullWidth
              required
              inputProps={{ maxLength: 10 }}
            />

            {/* Doctor Selection */}
            <FormControl fullWidth required error={Boolean(errors.doctor)}>
              <InputLabel>Doctor</InputLabel>
              <Select name="doctor" value={form.doctor} onChange={handleChange}>
                {doctors.length > 0 ? (
                  doctors.map((doc, index) => (
                    <MenuItem key={index} value={doc}>
                      {doc}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No doctors available</MenuItem>
                )}
              </Select>
              {errors.doctor && (
                <Typography variant="caption" color="error">
                  {errors.doctor}
                </Typography>
              )}
            </FormControl>

            {/* Rating */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={form.rating}
                onChange={handleRatingChange}
                precision={1}
              />
              {errors.rating && (
                <Typography variant="caption" color="error">
                  {errors.rating}
                </Typography>
              )}
            </Box>

            {/* Comments */}
            <TextField
              label="Comments"
              name="comments"
              value={form.comments}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{ background: "linear-gradient(45deg, #0077b6, #00b4d8)" }}
            >
              Submit Feedback
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
}

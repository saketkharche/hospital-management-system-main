import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Box, Button, Container, FormControl, InputLabel, Select, MenuItem, 
  TextField, Typography, Rating, CircularProgress, Paper 
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", doctor: "", rating: 0, comments: "",
  });

  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/hospital/api/doctors/fetchAllDoctorNames");
        setDoctors(response.data.map((doctor) => doctor.name));
        setLoading(false);
      } catch (error) {
        setFetchError("Could not load doctor list. Please try again later.");
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const validate = () => {
    const temp = {};
    temp.name = form.name ? "" : "Name is required.";
    temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ? "" : "Email is not valid.";
    temp.phone = form.phone.length === 10 ? "" : "Phone must be 10 digits.";
    temp.doctor = form.doctor ? "" : "Please select a doctor.";
    temp.rating = form.rating > 0 ? "" : "Please provide a rating.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("http://localhost:8080/hospital/api/feedback", form);
        toast.success("Thank you for your feedback!", { position: "top-right", autoClose: 3000 });
        setForm({ name: "", email: "", phone: "", doctor: "", rating: 0, comments: "" });
        setErrors({});
      } catch (error) {
        toast.error("Failed to submit feedback. Please try again later.", { position: "top-right", autoClose: 3000 });
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#333" }}>
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
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} error={Boolean(errors.name)} helperText={errors.name} required fullWidth />
            <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} required fullWidth />
            <TextField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={Boolean(errors.phone)} helperText={errors.phone} required fullWidth inputProps={{ maxLength: 10 }} />
            
            <FormControl fullWidth required error={Boolean(errors.doctor)}>
              <InputLabel>Doctor</InputLabel>
              <Select name="doctor" value={form.doctor} onChange={handleChange}>
                {doctors.length > 0 ? doctors.map((doc, index) => (
                  <MenuItem key={index} value={doc}>{doc}</MenuItem>
                )) : <MenuItem disabled>No doctors available</MenuItem>}
              </Select>
              {errors.doctor && <Typography variant="caption" color="error">{errors.doctor}</Typography>}
            </FormControl>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating name="rating" value={form.rating} onChange={handleRatingChange} />
              {errors.rating && <Typography variant="caption" color="error">{errors.rating}</Typography>}
            </Box>

            <TextField label="Comments" name="comments" value={form.comments} onChange={handleChange} multiline rows={4} fullWidth />
            <Button variant="contained" type="submit" size="large" sx={{ background: "linear-gradient(45deg, #0077b6, #00b4d8)" }}>
              Submit Feedback
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
}
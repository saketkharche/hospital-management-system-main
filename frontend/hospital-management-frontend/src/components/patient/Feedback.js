import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Rating,
} from "@mui/material";

const doctors = [
  "Dr. Smith",
  "Dr. Johnson",
  "Dr. Williams",
  "Dr. Brown",
  "Dr. Jones",
];

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

  const validate = () => {
    const temp = {};
    temp.name = form.name ? "" : "Name is required.";
    temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)
      ? ""
      : "Email is not valid.";
    temp.phone = form.phone.length === 10 ? "" : "Phone must be 10 digits.";
    temp.doctor = form.doctor ? "" : "Please select a doctor.";
    temp.rating = form.rating > 0 ? "" : "Please provide a rating.";
    setErrors(temp);

    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRatingChange = (e, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // For now, just log form data.
      console.log("Feedback submitted:", form);
      alert("Thank you for your feedback!");
      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        doctor: "",
        rating: 0,
        comments: "",
      });
      setErrors({});
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patient Feedback
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          bgcolor: "#f9f9f9",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          required
          fullWidth
          inputProps={{ maxLength: 10 }}
        />

        <FormControl fullWidth required error={Boolean(errors.doctor)}>
          <InputLabel id="doctor-label">Doctor</InputLabel>
          <Select
            labelId="doctor-label"
            id="doctor-select"
            name="doctor"
            value={form.doctor}
            label="Doctor"
            onChange={handleChange}
          >
            {doctors.map((doc) => (
              <MenuItem key={doc} value={doc}>
                {doc}
              </MenuItem>
            ))}
          </Select>
          {errors.doctor && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
              {errors.doctor}
            </Typography>
          )}
        </FormControl>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography component="legend" sx={{ minWidth: 70 }}>
            Rating
          </Typography>
          <Rating
            name="rating"
            value={form.rating}
            onChange={handleRatingChange}
          />
          {errors.rating && (
            <Typography variant="caption" color="error" sx={{ ml: 2 }}>
              {errors.rating}
            </Typography>
          )}
        </Box>

        <TextField
          label="Comments"
          name="comments"
          value={form.comments}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />

        <Button variant="contained" type="submit" size="large">
          Submit Feedback
        </Button>
      </Box>
    </Container>
  );
}

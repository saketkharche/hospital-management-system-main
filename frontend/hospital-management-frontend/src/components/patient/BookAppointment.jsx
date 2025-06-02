import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Function to retrieve logged-in user email from JWT stored in localStorage
const getUserEmail = () => {
  const token = localStorage.getItem("token");
  if (!token) return "";

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded Payload:", payload); // Debugging
    return payload.sub || "";
  } catch (err) {
    console.error("Error decoding token:", err);
    return "";
  }
};

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: null,
    timeSlot: "",
    reason: "",
    patientName: "",
    email: getUserEmail(), // Auto-populate email
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hospital/api/doctors/fetchAllDoctorNames"
      );
      setDoctors(response.data);
    } catch (err) {
      setError("Failed to load doctors. Please try again later.");
      console.error("Error fetching doctors:", err);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    setTimeSlots(slots);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, appointmentDate: date });
    generateTimeSlots();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (
      !formData.patientName ||
      !formData.doctorId ||
      !formData.appointmentDate ||
      !formData.timeSlot
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/hospital/api/appointments",
        {
          patientName: formData.patientName,
          doctorName: formData.doctorId,
          date: formData.appointmentDate.toISOString().split("T")[0],
          time: formData.timeSlot,
          reason: formData.reason,
          email: formData.email, // Include logged-in user's email
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Sending Appointment Data:", formData);
      if (response.status === 201) {
        setSuccessMessage("✅ Your appointment is booked successfully!");
        setFormData({
          doctorId: "",
          appointmentDate: null,
          timeSlot: "",
          reason: "",
          patientName: "",
          email: getUserEmail(), // Keep email after reset
        });
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ p: 3, maxWidth: 600, mx: "auto", boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Book an Appointment
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Box
          sx={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "16px",
            borderRadius: "4px",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          <Typography variant="body1">{successMessage}</Typography>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Email Field - Non-editable */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email (Auto-detected)"
              value={formData.email}
              disabled
            />
          </Grid>

          {/* Patient Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Patient Name"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </Grid>

          {/* Doctor Selection */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="doctor-label">Select Doctor</InputLabel>
              <Select
                labelId="doctor-label"
                value={formData.doctorId}
                onChange={(e) =>
                  setFormData({ ...formData, doctorId: e.target.value })
                }
                label="Select Doctor"
              >
                {doctors.length > 0 ? (
                  doctors.map((doctor, index) => (
                    <MenuItem key={index} value={doctor.name}>
                      {doctor.name} - {doctor.specialization}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No doctors found</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Date Picker */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Appointment Date"
                value={formData.appointmentDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
                minDate={new Date()}
              />
            </LocalizationProvider>
          </Grid>

          {/* Time Slot Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Select Time Slot</InputLabel>
              <Select
                value={formData.timeSlot}
                onChange={(e) =>
                  setFormData({ ...formData, timeSlot: e.target.value })
                }
                disabled={timeSlots.length === 0}
              >
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot, index) => (
                    <MenuItem key={index} value={slot}>
                      {slot}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No available slots
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || !formData.timeSlot}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default BookAppointment;

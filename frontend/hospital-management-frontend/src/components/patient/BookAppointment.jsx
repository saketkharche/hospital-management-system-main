import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: null,
    timeSlot: "",
    reason: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const mockDoctors = [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          specialization: "Cardiologist",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          specialization: "Dermatologist",
        },
        {
          id: 3,
          firstName: "Alice",
          lastName: "Brown",
          specialization: "Orthopedic",
        },
      ];
      setDoctors(mockDoctors);
    } catch (err) {
      setError("Failed to fetch doctors");
    }
  };

  const generateTimeSlots = (date) => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    setTimeSlots(slots);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, appointmentDate: date });
    generateTimeSlots(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Mock success response
      const response = { data: { success: true } };
      if (!response) {
        throw new Error("Failed to book appointment");
      }
      setSuccess("Appointment booked successfully!");
      setTimeout(() => {
        navigate("/view-appointments");
      }, 2000);
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
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Doctor</InputLabel>
              <Select
                value={formData.doctorId}
                onChange={(e) =>
                  setFormData({ ...formData, doctorId: e.target.value })
                }
                required
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    Dr. {doctor.firstName} {doctor.lastName} -{" "}
                    {doctor.specialization}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Appointment Date"
                value={formData.appointmentDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDate={new Date()}
                required
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Time Slot</InputLabel>
              <Select
                value={formData.timeSlot}
                onChange={(e) =>
                  setFormData({ ...formData, timeSlot: e.target.value })
                }
                required
                disabled={timeSlots.length === 0}
              >
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No slots available
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason for Visit"
              multiline
              rows={4}
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Book Appointment"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default BookAppointment;

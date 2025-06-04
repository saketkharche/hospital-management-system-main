import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  TextField,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        const token = sessionStorage.getItem("token"); // JWT token

        const response = await axios.get(
          "http://localhost:8080/hospital/my-appointments/details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(response.data);
      } catch (err) {
        console.error("Failed to fetch doctor appointments", err);
        setError("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAppointments();
  }, []);

  const filteredAppointments = filterStatus
    ? appointments.filter((appt) => appt.status === filterStatus)
    : appointments;

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "primary";
      case "COMPLETED":
        return "success";
      case "CANCELLED":
        return "error";
      case "PENDING":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Navigation Bar */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        {/* Back Button */}
        <Button variant="outlined" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        {/* Other Navigation Buttons */}
        <Button variant="contained" color="primary" onClick={() => navigate("/doctor/dashboard")}>
          Dashboard
        </Button>
        <Button variant="text" onClick={() => navigate("/doctor/patients")}>
          Patients
        </Button>
      </Stack>

      {/* Page Title */}
      <Typography variant="h5" gutterBottom>
        Assigned Appointments
      </Typography>

      {/* Status Filter */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Filter by Status"
            SelectProps={{
              native: true,
            }}
            fullWidth
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="PENDING">Pending</option>
          </TextField>
        </Grid>
      </Grid>

      {/* Loading / Error / Table */}
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="appointments table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell>{appt.id}</TableCell>
                    <TableCell>{appt.patientName}</TableCell>
                    <TableCell>{appt.date}</TableCell>
                    <TableCell>{appt.time}</TableCell>
                    <TableCell>
                      <Chip
                        label={appt.status}
                        color={getStatusColor(appt.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No matching appointments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ViewAppointments;
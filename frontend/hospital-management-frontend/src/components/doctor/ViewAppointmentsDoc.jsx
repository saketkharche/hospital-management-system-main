import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText,
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Alert, Chip, TextField, Grid, Button, Stack
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/hospital/my-appointments/details", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data);
      } catch (err) {
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
      case "SCHEDULED": return "primary";
      case "COMPLETED": return "success";
      case "CANCELLED": return "error";
      case "PENDING": return "warning";
      default: return "default";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LifeBridge Hospital - Appointments
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate("/doctor/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate("/doctor/patients")}>
            <ListItemText primary="Patients" />
          </ListItem>
        </List>
      </Drawer>

      {/* Page Content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Assigned Appointments</Typography>

        {/* Status Filter */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Filter by Status"
              SelectProps={{ native: true }}
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

        {/* Loading/Error/Table */}
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
                        <Chip label={appt.status} color={getStatusColor(appt.status)} size="small" />
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
    </Box>
  );
};

export default ViewAppointments;
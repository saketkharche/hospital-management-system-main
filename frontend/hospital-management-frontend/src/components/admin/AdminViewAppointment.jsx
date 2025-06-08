import React, {useEffect, useState} from "react";
import axios from "axios";
import {
  Box,
  Chip,
  CircularProgress,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const AdminViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication failed.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
            "http://localhost:8080/hospital/api/appointments/all",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
        );

        setAppointments(response.data);
        setFilteredAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
        setError("Could not load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter on search
  useEffect(() => {
    const filtered = appointments.filter((appt) =>
        Object.values(appt).some(
            (val) =>
                val &&
                val.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredAppointments(filtered);
  }, [searchQuery, appointments]);

  // Map status to color
  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return { bgcolor: "#4caf50", color: "#fff" }; // Green
      case "PENDING":
        return { bgcolor: "#ff9800", color: "#fff" }; // Amber
      case "CANCELLED":
        return { bgcolor: "#f44336", color: "#fff" }; // Red
      case "COMPLETED":
        return { bgcolor: "#2196f3", color: "#fff" }; // Blue
      default:
        return { bgcolor: "#9e9e9e", color: "#fff" }; // Gray
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Title */}
          <Typography variant="h4" align="center" gutterBottom className="text-3xl font-bold text-gray-800 mb-8">
            Manage Appointments
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 700, marginX: "auto", mb: 4 }}>
            <TextField
                fullWidth
                placeholder="Search by patient, email, doctor, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: "#ffffffdd",
                  borderRadius: 2,
                  boxShadow: 2,
                  "& .MuiInputBase-root": {
                    borderRadius: "12px",
                    backgroundColor: "white",
                  },
                }}
            />
          </Box>

          {/* Table Container */}
          <TableContainer
              component={Paper}
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                overflow: "hidden",
                bgcolor: "#fff",
                transition: "all 0.3s ease-in-out",
              }}
          >
            {loading ? (
                <Box py={6} textAlign="center">
                  <CircularProgress size={40} color="primary" />
                </Box>
            ) : error ? (
                <Box p={4}>
                  <Typography color="error" align="center" fontSize="lg">
                    {error}
                  </Typography>
                </Box>
            ) : filteredAppointments.length === 0 ? (
                <Box p={4}>
                  <Typography color="text.secondary" align="center" fontStyle="italic">
                    No matching appointments found.
                  </Typography>
                </Box>
            ) : (
                <Table aria-label="appointments table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "primary.main" }}>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Patient</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Doctor</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Time</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAppointments.map((appt) => (
                        <TableRow
                            key={appt.id}
                            hover
                            sx={{
                              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.03)" },
                              transition: "background-color 0.2s ease",
                            }}
                        >
                          <TableCell>{appt.id}</TableCell>
                          <TableCell>
                            <Tooltip title={appt.patientName || "-"} arrow>
                              <span className="font-medium">{appt.patientName || "-"}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={appt.patientEmail || "-"} arrow>
                              <span>{appt.patientEmail || "-"}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell>{appt.doctorName}</TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <EventIcon fontSize="small" color="action" />
                              {appt.date}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <AccessTimeIcon fontSize="small" color="action" />
                              {appt.time}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                                label={appt.status}
                                size="small"
                                sx={{
                                  ...getStatusStyle(appt.status),
                                  fontWeight: "bold",
                                  borderRadius: "16px",
                                  px: 1.5,
                                  fontSize: "0.75rem",
                                }}
                            />
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )}
          </TableContainer>
        </div>
      </div>
  );
};

export default AdminViewAppointment;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";

const AdminViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication failed. Please log in again.");
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
        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching all appointments:",
          err.response?.data || err.message
        );
        setError("Could not load appointments.");
        setLoading(false);
      }
    };

    fetchAllAppointments();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        p: 3,
        mt: 4,
        maxWidth: 1000,
        mx: "auto",
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="700"
        color="primary.main"
        mb={3}
        textAlign="center"
      >
        Manage Appointments
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress size={48} />
        </Box>
      ) : error ? (
        <Typography
          color="error"
          textAlign="center"
          sx={{ py: 5, fontWeight: "medium" }}
        >
          {error}
        </Typography>
      ) : appointments.length === 0 ? (
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ py: 5, fontStyle: "italic" }}
        >
          No appointments found.
        </Typography>
      ) : (
        <Table
          sx={{
            minWidth: 650,
            "& thead th": {
              fontWeight: "bold",
              bgcolor: "primary.light",
              color: "primary.contrastText",
              fontSize: 14,
            },
            "& tbody td": { fontSize: 14 },
            "& tbody tr:hover": {
              bgcolor: "action.hover",
              cursor: "default",
            },
          }}
          aria-label="appointments table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Patient Email</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id} hover>
                <TableCell>{appt.id}</TableCell>
                <TableCell>
                  <Tooltip title={appt.patientName || "-"} arrow>
                    <span>{appt.patientName || "-"}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={appt.patientEmail || "-"} arrow>
                    <span>{appt.patientEmail || "-"}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>{appt.doctorName}</TableCell>
                <TableCell>{appt.date}</TableCell>
                <TableCell>{appt.time}</TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      px: 1.2,
                      py: 0.3,
                      borderRadius: 1,
                      fontWeight: "bold",
                      fontSize: 12,
                      color: "common.white",
                      bgcolor:
                        appt.status === "Confirmed"
                          ? "success.main"
                          : appt.status === "Pending"
                          ? "warning.main"
                          : "grey.600",
                      userSelect: "none",
                    }}
                  >
                    {appt.status}
                  </Box>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default AdminViewAppointment;

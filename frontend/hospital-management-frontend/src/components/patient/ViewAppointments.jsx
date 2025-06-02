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
} from "@mui/material";

const ViewAppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication failed. Please log in again.");
          setLoading(false);
          return;
        }

        // Decode JWT to get the logged-in user's email (assuming it's stored in `sub` field)
        const payload = JSON.parse(atob(token.split(".")[1]));
        const loggedInUser = payload.sub; // e.g. "saket2@gmail.com"

        console.log("Logged-in User:", loggedInUser);

        const response = await axios.get(
          "http://localhost:8080/hospital/api/appointments/my-appointments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Filter appointments by patientEmail instead of patientName
        const userAppointments = response.data.filter(
          (appt) =>
            appt.patientEmail?.toLowerCase() === loggedInUser.toLowerCase()
        );
        console.log("Filtered Appointments:", userAppointments);

        setAppointments(userAppointments);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching appointments:",
          err.response?.data || err.message
        );
        setError("Could not load appointments.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ p: 2 }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : appointments.length === 0 ? (
        <Typography color="text.secondary" textAlign="center">
          No appointments found.
        </Typography>
      ) : (
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Doctor</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Time</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt, index) => (
              <TableRow key={index}>
                <TableCell>{appt.doctorName}</TableCell>
                <TableCell>{appt.date}</TableCell>
                <TableCell>{appt.time}</TableCell>
                <TableCell>{appt.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ViewAppointmentTable;

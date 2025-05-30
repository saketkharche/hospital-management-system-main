import React from "react";
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
} from "@mui/material";

const appointments = [
  {
    id: 1,
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    date: "2025-06-01",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Jane Roe",
    doctorName: "Dr. Adams",
    date: "2025-06-02",
    time: "02:00 PM",
    status: "Pending",
  },
];

const ViewAppointments = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        View Appointments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>{appt.id}</TableCell>
                <TableCell>{appt.patientName}</TableCell>
                <TableCell>{appt.doctorName}</TableCell>
                <TableCell>{appt.date}</TableCell>
                <TableCell>{appt.time}</TableCell>
                <TableCell>{appt.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewAppointments;

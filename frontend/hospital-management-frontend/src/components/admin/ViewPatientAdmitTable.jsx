import React from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const initialAdmitData = [
  { id: 1, patientName: "John Doe", room: "A101", admittedOn: "2025-06-01" },
  { id: 2, patientName: "Jane Smith", room: "B203", admittedOn: "2025-05-28" },
  {
    id: 3,
    patientName: "Michael Johnson",
    room: "C305",
    admittedOn: "2025-06-03",
  },
  { id: 4, patientName: "Emily Davis", room: "D410", admittedOn: "2025-05-30" },
];

const ViewPatientAdmitTable = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          bgcolor: "background.default",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700, color: "primary.main", textAlign: "center" }}
        >
          🏥 Admitted Patients
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Patient Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Room</strong>
                </TableCell>
                <TableCell>
                  <strong>Admitted On</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialAdmitData.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.patientName}</TableCell>
                  <TableCell>{patient.room}</TableCell>
                  <TableCell>{patient.admittedOn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ViewPatientAdmitTable;

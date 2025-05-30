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

const prescriptionsData = [
  {
    id: 1,
    patientName: "John Doe",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times a day",
    prescribedDate: "2025-05-20",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    medication: "Metformin",
    dosage: "1000mg",
    frequency: "2 times a day",
    prescribedDate: "2025-05-25",
  },
];

const Prescriptions = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Prescriptions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Medication</TableCell>
              <TableCell>Dosage</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Prescribed Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptionsData.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell>{prescription.id}</TableCell>
                <TableCell>{prescription.patientName}</TableCell>
                <TableCell>{prescription.medication}</TableCell>
                <TableCell>{prescription.dosage}</TableCell>
                <TableCell>{prescription.frequency}</TableCell>
                <TableCell>{prescription.prescribedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Prescriptions;

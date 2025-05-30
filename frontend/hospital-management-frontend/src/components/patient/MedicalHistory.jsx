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

const historyData = [
  {
    id: 1,
    patientName: "John Doe",
    condition: "Hypertension",
    treatment: "Medication",
    date: "2024-12-10",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    condition: "Diabetes",
    treatment: "Insulin Therapy",
    date: "2025-02-20",
  },
];

const MedicalHistory = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Medical History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Treatment</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.patientName}</TableCell>
                <TableCell>{record.condition}</TableCell>
                <TableCell>{record.treatment}</TableCell>
                <TableCell>{record.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MedicalHistory;

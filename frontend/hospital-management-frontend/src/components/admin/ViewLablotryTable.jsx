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

const initialLabData = [
  { id: 1, name: "Biochemistry Lab", location: "Building A - 2nd Floor" },
  { id: 2, name: "Microbiology Lab", location: "Building B - 3rd Floor" },
  { id: 3, name: "Radiology Lab", location: "Main Hospital - Ground Floor" },
  { id: 4, name: "Pathology Lab", location: "Building C - 1st Floor" },
];

const ViewLablotryTable = () => {
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
          🧪 Laboratory Management
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Laboratory Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Location</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialLabData.map((lab) => (
                <TableRow key={lab.id}>
                  <TableCell>{lab.id}</TableCell>
                  <TableCell>{lab.name}</TableCell>
                  <TableCell>{lab.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ViewLablotryTable;

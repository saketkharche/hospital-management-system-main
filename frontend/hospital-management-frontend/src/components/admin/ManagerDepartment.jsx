import React, { useState } from "react";
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
  Button,
  TextField,
} from "@mui/material";

const initialDepartments = [
  { id: 1, name: "Cardiology" },
  { id: 2, name: "Neurology" },
  { id: 3, name: "Orthopedics" },
  { id: 4, name: "Pediatrics" },
];

const ManagerDepartment = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [newDepartment, setNewDepartment] = useState("");

  const handleAddDepartment = () => {
    if (!newDepartment) return;
    const newId = departments.length + 1;
    setDepartments([...departments, { id: newId, name: newDepartment }]);
    setNewDepartment("");
  };

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

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
          🏢 Manage Departments
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <TextField
            label="New Department Name"
            variant="outlined"
            fullWidth
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600 }}
            onClick={handleAddDepartment}
          >
            Add
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Department Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>{dept.id}</TableCell>
                  <TableCell>{dept.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteDepartment(dept.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ManagerDepartment;

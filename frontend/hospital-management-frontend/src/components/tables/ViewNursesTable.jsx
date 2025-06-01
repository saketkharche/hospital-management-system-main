import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Paper,
} from "@mui/material";

const nurseList = [
  {
    id: 1,
    name: "Sita Verma",
    email: "sita.verma@example.com",
    phone: "8765432109",
    shift: "Morning",
    department: "Pediatrics",
    qualification: "B.Sc Nursing",
  },
  {
    id: 2,
    name: "Anjali Singh",
    email: "anjali.singh@example.com",
    phone: "9876543210",
    shift: "Evening",
    department: "ICU",
    qualification: "M.Sc Nursing",
  },
  {
    id: 3,
    name: "Meena Kumari",
    email: "meena.kumari@example.com",
    phone: "9123456789",
    shift: "Night",
    department: "Emergency",
    qualification: "Diploma in Nursing",
  },
  {
    id: 4,
    name: "Ritu Sharma",
    email: "ritu.sharma@example.com",
    phone: "9988776655",
    shift: "Morning",
    department: "Surgery",
    qualification: "B.Sc Nursing",
  },
];

const themeBlue = "#1976d2"; // MUI Primary Blue

const shiftColor = (shift) => {
  switch (shift) {
    case "Morning":
      return "success";
    case "Evening":
      return "warning";
    case "Night":
      return "info";
    default:
      return "default";
  }
};

function ViewNurseTable() {
  return (
    <Card sx={{ m: 4, boxShadow: 5 }}>
      <CardHeader
        title="Nurse Directory"
        sx={{
          textAlign: "center",
          backgroundColor: themeBlue,
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1.5rem",
          borderRadius: "4px 4px 0 0",
        }}
      />
      <CardContent>
        {nurseList.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No nurse data available.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: 0 }}
          >
            <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
              <TableHead
                sx={{
                  backgroundColor: themeBlue,
                  "& th": { color: "#fff", fontWeight: "bold", border: "none" },
                  borderBottom: "none",
                }}
              >
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Qualification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nurseList.map((nurse, index) => (
                  <TableRow
                    key={nurse.id}
                    hover
                    sx={{
                      backgroundColor: "#f9faff",
                      borderRadius: 2,
                      mb: 1,
                      display: "table-row",
                      "&:hover": { backgroundColor: "#d0e3ff" },
                      "& td": { borderBottom: "none" },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{nurse.name}</TableCell>
                    <TableCell>{nurse.email}</TableCell>
                    <TableCell>{nurse.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={nurse.shift}
                        color={shiftColor(nurse.shift)}
                        variant="outlined"
                        sx={{
                          borderColor: themeBlue,
                          color:
                            nurse.shift === "Morning"
                              ? "green"
                              : nurse.shift === "Evening"
                              ? "#ff9800"
                              : themeBlue,
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell>{nurse.department}</TableCell>
                    <TableCell>{nurse.qualification}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default ViewNurseTable;

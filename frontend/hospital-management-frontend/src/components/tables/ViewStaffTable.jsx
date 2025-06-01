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

const staffList = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    role: "Ward Boy",
    department: "General",
  },
  {
    id: 2,
    name: "Sita Verma",
    email: "sita.verma@example.com",
    phone: "8765432109",
    role: "Nurse",
    department: "Pediatrics",
  },
  {
    id: 3,
    name: "Amit Joshi",
    email: "amit.joshi@example.com",
    phone: "9988776655",
    role: "Lab Technician",
    department: "Pathology",
  },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "9123456780",
    role: "Receptionist",
    department: "Front Desk",
  },
  {
    id: 5,
    name: "Ravi Deshmukh",
    email: "ravi.deshmukh@example.com",
    phone: "7012345678",
    role: "Pharmacist",
    department: "Pharmacy",
  },
];

const roleColor = (role) => {
  switch (role) {
    case "Nurse":
      return "primary";
    case "Ward Boy":
      return "secondary";
    case "Lab Technician":
      return "success";
    case "Receptionist":
      return "info";
    case "Pharmacist":
      return "warning";
    default:
      return "default";
  }
};

function ViewStaffTable() {
  return (
    <Card sx={{ m: 4, boxShadow: 5 }}>
      <CardHeader
        title="Hospital Staff Directory"
        sx={{ textAlign: "center", backgroundColor: "#1976d2", color: "#fff" }}
      />
      <CardContent>
        {staffList.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No staff data available.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffList.map((staff, index) => (
                  <TableRow key={staff.id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={staff.role}
                        color={roleColor(staff.role)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{staff.department}</TableCell>
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

export default ViewStaffTable;

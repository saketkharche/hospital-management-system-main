import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import {
  fetchAllDoctors,
  registerDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../services/doctorService";

function ViewDoctorTable() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [currentDoctor, setCurrentDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: null,
    city: "",
    state: "",
    country: "",
    password: "",
    joiningDate: null,
    specialization: "",
    bloodGroup: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const specializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Psychiatry",
    "General Medicine",
  ];

  // Validation function
  const validateDoctorForm = () => {
    const errors = {};

    if (!currentDoctor.firstName) errors.firstName = "First name is required";
    if (!currentDoctor.lastName) errors.lastName = "Last name is required";
    if (!currentDoctor.email) errors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentDoctor.email)) {
      errors.email = "Invalid email format";
    }
    if (!currentDoctor.phoneNumber)
      errors.phoneNumber = "Phone number is required";
    if (!currentDoctor.specialization)
      errors.specialization = "Specialization is required";
    if (!currentDoctor.bloodGroup)
      errors.bloodGroup = "Blood group is required";
    if (!currentDoctor.joiningDate)
      errors.joiningDate = "Joining date is required";
    if (formMode === "add" && !currentDoctor.password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors).join(", "));
      setShowError(true);
      return false;
    }
    return true;
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchAllDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        setErrorMessage("Failed to fetch doctors: " + error.message);
        setShowError(true);
      }
    };
    loadDoctors();
  }, []);

  // Search functionality
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = doctors.filter(
      (doctor) =>
        doctor.firstName.toLowerCase().includes(value) ||
        doctor.lastName.toLowerCase().includes(value) ||
        doctor.email.toLowerCase().includes(value) ||
        doctor.specialization.toLowerCase().includes(value)
    );
    setFilteredDoctors(filtered);
  };

  // Modal handlers
  const handleOpenModal = (mode, doctor = null) => {
    setFormMode(mode);
    if (mode === "edit" && doctor) {
      setCurrentDoctor({
        ...doctor,
        joiningDate: new Date(doctor.joiningDate),
        dateOfBirth: new Date(doctor.dateOfBirth),
      });
    } else {
      setCurrentDoctor({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: null,
        city: "",
        state: "",
        country: "",
        password: "",
        joiningDate: null,
        specialization: "",
        bloodGroup: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!validateDoctorForm()) return;

    try {
      if (formMode === "add") {
        await registerDoctor(currentDoctor);
        setSuccessMessage("Doctor registered successfully!");
      } else {
        await updateDoctor(currentDoctor.email, currentDoctor);
        setSuccessMessage("Doctor updated successfully!");
      }

      // Refresh the doctors list
      const updatedDoctors = await fetchAllDoctors();
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
      setShowSuccess(true);
      handleCloseModal();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Operation failed");
      setShowError(true);
    }
  };

  // Delete handler
  const handleDeleteDoctor = async (email) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoctor(email);
        const updatedDoctors = await fetchAllDoctors();
        setDoctors(updatedDoctors);
        setFilteredDoctors(updatedDoctors);
        setSuccessMessage("Doctor deleted successfully!");
        setShowSuccess(true);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Failed to delete doctor"
        );
        setShowError(true);
      }
    }
  };

  return (
    <div className="mt-5">
      <h4>Doctor Details</h4>

      {/* Search Field */}
      <TextField
        label="Search by name, email, or specialization"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
        }}
        style={{ marginBottom: "20px" }}
      />

      {/* Add Doctor Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal("add")}
        style={{ marginBottom: "20px" }}
      >
        Add Doctor
      </Button>

      {/* Doctor Table */}
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="doctor table">
          <TableHead>
            <TableRow>
              <TableCell>Doctor ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredDoctors.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredDoctors
            ).map((doctor) => (
              <TableRow key={doctor.doctorId}>
                <TableCell>{doctor.doctorId}</TableCell>
                <TableCell>{`${doctor.firstName} ${doctor.lastName}`}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.phoneNumber}</TableCell>
                <TableCell>{doctor.bloodGroup}</TableCell>
                <TableCell>
                  {new Date(doctor.joiningDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenModal("edit", doctor)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteDoctor(doctor.email)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredDoctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add/Edit Doctor Modal */}
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {formMode === "add" ? "Add New Doctor" : "Edit Doctor"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={currentDoctor.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={currentDoctor.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={currentDoctor.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={formMode === "edit"}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={currentDoctor.phoneNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            name="gender"
            value={currentDoctor.gender}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            value={currentDoctor.dateOfBirth}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={currentDoctor.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="State"
            name="state"
            value={currentDoctor.state}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            name="country"
            value={currentDoctor.country}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {formMode === "add" && (
            <TextField
              label="Password"
              name="password"
              type="password"
              value={currentDoctor.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          )}
          {/* ... Other basic fields similar to patient form ... */}

          {/* Doctor-specific fields */}
          <Select
            label="Specialization"
            name="specialization"
            value={currentDoctor.specialization}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            {specializations.map((spec) => (
              <MenuItem key={spec} value={spec}>
                {spec}
              </MenuItem>
            ))}
          </Select>

          <Select
            label="Blood Group"
            name="bloodGroup"
            value={currentDoctor.bloodGroup}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            {bloodGroups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </Select>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Joining Date"
              value={currentDoctor.joiningDate}
              onChange={(newValue) => {
                setCurrentDoctor((prev) => ({
                  ...prev,
                  joiningDate: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {formMode === "add" ? "Add Doctor" : "Update Doctor"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success and Error Snackbars */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  );
}

export default ViewDoctorTable;

import React, {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

// Services
import {deleteDoctor, fetchAllDoctors, registerDoctor, updateDoctor,} from "../../services/doctorService";

// Toastify imports
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// SweetAlert2 import (compiled CSS only)
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
  const [formErrors, setFormErrors] = useState({});

  // Options
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
  const genders = ["Male", "Female", "Other"];

  // Toast notification helpers
  const showSuccessMessage = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const showErrorMessage = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
    });
  };

  // Validate doctor form
  const validateDoctorForm = () => {
    const errors = {};
    if (!currentDoctor.firstName.trim()) errors.firstName = "First name is required";
    if (!currentDoctor.lastName.trim()) errors.lastName = "Last name is required";
    if (!currentDoctor.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentDoctor.email)) {
      errors.email = "Invalid email format";
    }
    if (!currentDoctor.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    if (!currentDoctor.gender) errors.gender = "Gender is required";
    if (!currentDoctor.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!currentDoctor.city.trim()) errors.city = "City is required";
    if (!currentDoctor.state.trim()) errors.state = "State is required";
    if (!currentDoctor.country.trim()) errors.country = "Country is required";
    if (!currentDoctor.specialization) errors.specialization = "Specialization is required";
    if (!currentDoctor.bloodGroup) errors.bloodGroup = "Blood group is required";
    if (!currentDoctor.joiningDate) errors.joiningDate = "Joining date is required";
    if (formMode === "add" && !currentDoctor.password.trim()) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Load doctors on mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchAllDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        showErrorMessage("Failed to fetch doctors: " + error.message);
      }
    };
    loadDoctors();
  }, []);

  // Search handler
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
    setFormErrors({});
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
    setFormErrors({});
  };

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDoctor((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!validateDoctorForm()) return;
    try {
      if (formMode === "add") {
        await registerDoctor(currentDoctor);
        showSuccessMessage("Doctor registered successfully!");
      } else {
        await updateDoctor(currentDoctor.email, currentDoctor);
        showSuccessMessage("Doctor updated successfully!");
      }
      const updatedDoctors = await fetchAllDoctors();
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
      handleCloseModal();
    } catch (error) {
      showErrorMessage(error.response?.data?.message || "Operation failed");
    }
  };

  // Delete handler with SweetAlert2 confirmation modal
  const handleDeleteDoctor = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const encodedEmail = encodeURIComponent(email);
        await deleteDoctor(encodedEmail); // Fixed URL encoding
        const updatedDoctors = await fetchAllDoctors();
        setDoctors(updatedDoctors);
        setFilteredDoctors(updatedDoctors);
        showSuccessMessage("Doctor deleted successfully!");
      } catch (error) {
        showErrorMessage(
            error.response?.data?.message || "Failed to delete doctor"
        );
      }
    }
  };

  return (
      <div className="mt-5">
        <h4>Doctor Details</h4>

        {/* Search Box */}
        <TextField
            label="Search by name, email, or specialization"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">🔍</InputAdornment>
              ),
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

        {/* Doctors Table */}
        <TableContainer>
          <Table>
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
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.id}</TableCell>
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
        <Dialog open={showModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>
            {formMode === "add" ? "Add New Doctor" : "Edit Doctor"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {/* First Name, Last Name, Email, Phone */}
              {[
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["email", "Email", formMode === "edit"],
                ["phoneNumber", "Phone Number"],
                ["city", "City"],
                ["state", "State"],
                ["country", "Country"],
              ].map(([name, label, disabled]) => (
                  <Grid item xs={12} sm={6} key={name}>
                    <TextField
                        label={label}
                        name={name}
                        value={currentDoctor[name]}
                        onChange={handleInputChange}
                        fullWidth
                        disabled={disabled}
                        error={!!formErrors[name]}
                        helperText={formErrors[name]}
                    />
                  </Grid>
              ))}

              {/* Password Field (only in add mode) */}
              {formMode === "add" && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={currentDoctor.password}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                    />
                  </Grid>
              )}

              {/* Gender Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!formErrors.gender}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                      name="gender"
                      value={currentDoctor.gender}
                      onChange={handleInputChange}
                      label="Gender"
                  >
                    {genders.map((g) => (
                        <MenuItem key={g} value={g}>
                          {g}
                        </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors.gender}</FormHelperText>
                </FormControl>
              </Grid>

              {/* Date of Birth */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                      label="Date of Birth"
                      value={currentDoctor.dateOfBirth}
                      onChange={(newVal) =>
                          setCurrentDoctor((prev) => ({
                            ...prev,
                            dateOfBirth: newVal,
                          }))
                      }
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              fullWidth
                              error={!!formErrors.dateOfBirth}
                              helperText={formErrors.dateOfBirth}
                          />
                      )}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Specialization Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!formErrors.specialization}>
                  <InputLabel>Specialization</InputLabel>
                  <Select
                      name="specialization"
                      value={currentDoctor.specialization}
                      onChange={handleInputChange}
                      label="Specialization"
                  >
                    {specializations.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors.specialization}</FormHelperText>
                </FormControl>
              </Grid>

              {/* Blood Group Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!formErrors.bloodGroup}>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                      name="bloodGroup"
                      value={currentDoctor.bloodGroup}
                      onChange={handleInputChange}
                      label="Blood Group"
                  >
                    {bloodGroups.map((bg) => (
                        <MenuItem key={bg} value={bg}>
                          {bg}
                        </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors.bloodGroup}</FormHelperText>
                </FormControl>
              </Grid>

              {/* Joining Date */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                      label="Joining Date"
                      value={currentDoctor.joiningDate}
                      onChange={(newVal) =>
                          setCurrentDoctor((prev) => ({
                            ...prev,
                            joiningDate: newVal,
                          }))
                      }
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              fullWidth
                              error={!!formErrors.joiningDate}
                              helperText={formErrors.joiningDate}
                          />
                      )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </DialogContent>

          {/* Modal Actions */}
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
            >
              {formMode === "add" ? "Add Doctor" : "Update Doctor"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Toast Container */}
        <ToastContainer />
      </div>
  );
}

export default ViewDoctorTable;
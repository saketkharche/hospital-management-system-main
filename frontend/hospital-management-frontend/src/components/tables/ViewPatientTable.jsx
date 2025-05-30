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
} from "@mui/material";
import {
  fetchAllPatients,
  registerPatient,
  updatePatient,
  deletePatient,
} from "../../services/patientService";
import { validatePatientRegistration } from "../../Javascript/patientValidation";

function ViewPatientTable() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentPatient, setCurrentPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    country: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientData = await fetchAllPatients();
        setPatients(patientData);
        setFilteredPatients(patientData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        patient.phoneNumber.includes(searchValue)
    );
    setFilteredPatients(filtered);
  };

  const handleOpenModal = (mode = "add", patient = null) => {
    setFormMode(mode);
    setCurrentPatient(
      mode === "edit" && patient
        ? { ...patient }
        : {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            gender: "",
            dateOfBirth: "",
            city: "",
            state: "",
            country: "",
            password: "",
          }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPatient((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { errors, isValid } = validatePatientRegistration(currentPatient, formMode === "edit");
    if (!isValid) {
      setErrorMessage(Object.values(errors).join(", "));
      setShowError(true);
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (formMode === "add") {
        await registerPatient(currentPatient);
        setSuccessMessage("Patient added successfully!");
      } else {
        await updatePatient(currentPatient.email, currentPatient);
        setSuccessMessage("Patient updated successfully!");
      }

      const updatedPatients = await fetchAllPatients();
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
      setShowSuccess(true);
      handleCloseModal();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const handleDeletePatient = async (email) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await deletePatient(email);
        const updatedPatients = await fetchAllPatients();
        setPatients(updatedPatients);
        setFilteredPatients(updatedPatients);
        setSuccessMessage("Patient deleted successfully!");
        setShowSuccess(true);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Error deleting patient");
        setShowError(true);
      }
    }
  };

  return (
    <div className="mt-5">
      <h4>Patient Details</h4>

      <TextField
        label="Search by name, email, or phone"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
        }}
        style={{ marginBottom: "20px" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal("add")}
        style={{ marginBottom: "20px" }}
      >
        Add Patient
      </Button>

      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="patient table">
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.patientId}>
                <TableCell>{patient.patientId}</TableCell>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenModal("edit", patient)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeletePatient(patient.email)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogTitle>
          {formMode === "add" ? "Add New Patient" : "Edit Patient"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={currentPatient.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={currentPatient.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={currentPatient.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={formMode === "edit"}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={currentPatient.phoneNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            name="gender"
            value={currentPatient.gender}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            value={currentPatient.dateOfBirth}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={currentPatient.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="State"
            name="state"
            value={currentPatient.state}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            name="country"
            value={currentPatient.country}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {formMode === "add" && (
            <TextField
              label="Password"
              name="password"
              type="password"
              value={currentPatient.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {formMode === "add" ? "Add Patient" : "Update Patient"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ViewPatientTable;

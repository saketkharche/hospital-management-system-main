import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {Delete, Edit, Info, PersonAdd, Search,} from "@mui/icons-material";
import Swal from "sweetalert2";
import toast, {Toaster} from "react-hot-toast";
import {deletePatient, fetchAllPatients, registerPatient, updatePatient,} from "../../services/patientService";
import {validatePatientRegistration} from "../../Javascript/patientValidation";

const defaultPatient = {
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
};

function ViewPatientTable() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentPatient, setCurrentPatient] = useState(defaultPatient);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await fetchAllPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch {
      toast.error("Failed to load patients.");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = patients.filter(
        (p) =>
            p.firstName.toLowerCase().includes(value) ||
            p.lastName.toLowerCase().includes(value) ||
            p.email.toLowerCase().includes(value)
    );
    setFilteredPatients(filtered);
  };

  const handleOpenModal = (mode = "add", patient = null) => {
    setFormMode(mode);
    setCurrentPatient(mode === "edit" && patient ? { ...patient } : defaultPatient);
    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPatient((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { errors, isValid } = validatePatientRegistration(currentPatient, formMode === "edit");
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix errors in the form.");
      return;
    }
    try {
      if (formMode === "add") {
        await registerPatient(currentPatient);
        toast.success("Patient registered successfully.");
      } else {
        await updatePatient(currentPatient.email, currentPatient);
        toast.success("Patient updated successfully.");
      }
      await fetchPatients();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed.");
    }
  };

  const handleDeletePatient = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Patient record will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePatient(email);
          toast.success("Patient deleted.");
          await fetchPatients();
        } catch {
          toast.error("Error deleting patient.");
        }
      }
    });
  };

  return (
      <Box p={3}>
        <Toaster position="top-right" />
        <Typography variant="h4" gutterBottom>
          🧑‍⚕️ Patient Management
        </Typography>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={8}>
            <TextField
                label="Search by name or email"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                  ),
                }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
                variant="contained"
                fullWidth
                startIcon={<PersonAdd />}
                onClick={() => handleOpenModal("add")}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
            >
              Add Patient
            </Button>
          </Grid>
        </Grid>

        <Paper elevation={4}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>First</TableCell>
                  <TableCell>Last</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((p) => (
                    <TableRow key={p.patientId}>
                      <TableCell>{p.firstName}</TableCell>
                      <TableCell>{p.lastName}</TableCell>
                      <TableCell>{p.email}</TableCell>
                      <TableCell>{p.phoneNumber}</TableCell>
                      <TableCell>{p.gender}</TableCell>
                      <TableCell>{p.dateOfBirth}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit Patient" arrow>
                          <Button
                              color="info"
                              variant="outlined"
                              onClick={() => handleOpenModal("edit", p)}
                              sx={{ mr: 1 }}
                          >
                            <Edit fontSize="small" />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete Patient" arrow>
                          <Button
                              color="error"
                              variant="outlined"
                              onClick={() => handleDeletePatient(p.email)}
                          >
                            <Delete fontSize="small" />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                ))}
                {filteredPatients.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Info fontSize="small" /> No patients found.
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Modal */}
        <Dialog open={showModal} onClose={handleCloseModal} fullWidth maxWidth="md">
          <DialogTitle>
            {formMode === "add" ? "Register New Patient" : "Update Patient Details"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} mt={1}>
              {[
                "firstName",
                "lastName",
                "email",
                "phoneNumber",
                "gender",
                "dateOfBirth",
                "city",
                "state",
                "country",
              ].map((field, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <TextField
                        fullWidth
                        label={field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                        name={field}
                        value={currentPatient[field]}
                        onChange={handleInputChange}
                        error={!!formErrors[field]}
                        helperText={formErrors[field]}
                        disabled={field === "email" && formMode === "edit"}
                    />
                  </Grid>
              ))}
              {formMode === "add" && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={currentPatient.password}
                        onChange={handleInputChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                    />
                  </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {formMode === "add" ? "Register" : "Update"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
}


export default ViewPatientTable;

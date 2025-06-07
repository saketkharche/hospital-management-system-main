import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Add, ArrowBack, Remove } from "@mui/icons-material";
import DoctorLayout from "./DoctorLayout";

const PrescriptionForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/hospital/api/appointments/doctor-appointments",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          },
        );
        setAppointments(res.data || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError("Failed to load appointments. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (!selectedAppointmentId || !appointments.length) return;
    const selected = appointments.find(
      (apt) => apt.id === parseInt(selectedAppointmentId),
    );
    if (selected) {
      setPatientData({
        name: selected.patientName,
        date: selected.date,
        time: selected.time,
        email: selected.patientEmail || "", // Ensure no null value
        patientId: selected.patientId,
      });
    }
  }, [selectedAppointmentId, appointments]);

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  const removeMedicine = (index) => {
    if (medicines.length > 1) {
      const updatedMedicines = [...medicines];
      updatedMedicines.splice(index, 1);
      setMedicines(updatedMedicines);
    }
  };

  const validateForm = () => {
    if (!selectedAppointmentId) {
      setError("Please select an appointment.");
      return false;
    }

    if (!doctorName.trim()) {
      setError("Doctor name is required.");
      return false;
    }

    if (!patientData?.email?.trim()) {
      setError("Patient email is missing. Please reselect the appointment.");
      return false;
    }

    if (!medicines.some((med) => med.name.trim() !== "")) {
      setError("At least one medicine is required.");
      return false;
    }

    for (const med of medicines) {
      if (med.name.trim() === "") continue;
      if (med.dosage.trim() === "") {
        setError("Please enter dosage for all medicines.");
        return false;
      }
      if (med.frequency.trim() === "") {
        setError("Please enter frequency for all medicines.");
        return false;
      }
      if (med.duration.trim() === "") {
        setError("Please enter duration for all medicines.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setSubmitting(true);

    const prescriptionData = {
      patientName: patientData.name,
      doctorName: doctorName.trim(),
      medicines: medicines
        .filter((med) => med.name.trim() !== "")
        .map((med) => med.name.trim()),
      instructions: additionalInstructions,
      issued: false,
      date: patientData.date,
      patientEmail: patientData.email, // Ensured to be not null
    };

    try {
      await axios.post(
        "http://localhost:8080/hospital/api/prescriptions/issue",
        prescriptionData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      setSuccess(true);
      setTimeout(() => navigate("/doctor/appointments"), 2000);
    } catch (err) {
      console.error("Failed to submit prescription:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to submit prescription. Please try again.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DoctorLayout>
        <Container
          maxWidth="md"
          sx={{ display: "flex", justifyContent: "center", mt: 4 }}
        >
          <CircularProgress />
        </Container>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1">
            New Prescription
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Select Appointment
          </Typography>
          <FormControl fullWidth required>
            <InputLabel id="appointment-select-label">
              Select Appointment
            </InputLabel>
            <Select
              labelId="appointment-select-label"
              value={selectedAppointmentId}
              label="Select Appointment"
              onChange={(e) => setSelectedAppointmentId(e.target.value)}
              disabled={submitting}
            >
              {appointments.map((apt) => (
                <MenuItem key={apt.id} value={apt.id}>
                  {`ID: ${apt.id} | Patient: ${apt.patientName} | Date: ${apt.date}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {patientData && (
          <>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Appointment Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Chip
                    label={`Name: ${patientData.name}`}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Chip
                    label={`Date: ${patientData.date}`}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Chip
                    label={`Time: ${patientData.time}`}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Patient Email"
                    value={patientData.email}
                    fullWidth
                    disabled
                    sx={{ mt: 2 }}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Prescription Details
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  label="Doctor Name"
                  fullWidth
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  sx={{ mb: 3 }}
                  disabled={submitting}
                />

                {medicines.map((medicine, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={5}>
                        <TextField
                          required
                          label="Medicine Name"
                          fullWidth
                          value={medicine.name}
                          onChange={(e) =>
                            handleMedicineChange(index, "name", e.target.value)
                          }
                          disabled={submitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          required
                          label="Dosage"
                          fullWidth
                          value={medicine.dosage}
                          onChange={(e) =>
                            handleMedicineChange(
                              index,
                              "dosage",
                              e.target.value,
                            )
                          }
                          disabled={submitting}
                          placeholder="e.g., 500mg"
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          required
                          label="Frequency"
                          fullWidth
                          value={medicine.frequency}
                          onChange={(e) =>
                            handleMedicineChange(
                              index,
                              "frequency",
                              e.target.value,
                            )
                          }
                          disabled={submitting}
                          placeholder="e.g., Twice daily"
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          required
                          label="Duration"
                          fullWidth
                          value={medicine.duration}
                          onChange={(e) =>
                            handleMedicineChange(
                              index,
                              "duration",
                              e.target.value,
                            )
                          }
                          disabled={submitting}
                          placeholder="e.g., 7 days"
                        />
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <IconButton
                          onClick={() => removeMedicine(index)}
                          color="error"
                          disabled={medicines.length <= 1 || submitting}
                        >
                          <Remove />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Special Instructions"
                          fullWidth
                          multiline
                          rows={2}
                          value={medicine.instructions}
                          onChange={(e) =>
                            handleMedicineChange(
                              index,
                              "instructions",
                              e.target.value,
                            )
                          }
                          disabled={submitting}
                        />
                      </Grid>
                    </Grid>
                    {index < medicines.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}

                <Button
                  startIcon={<Add />}
                  onClick={addMedicine}
                  variant="outlined"
                  sx={{ mb: 3 }}
                  disabled={submitting}
                >
                  Add Another Medicine
                </Button>

                <TextField
                  label="Additional Instructions"
                  fullWidth
                  multiline
                  rows={3}
                  value={additionalInstructions}
                  onChange={(e) => setAdditionalInstructions(e.target.value)}
                  sx={{ mb: 3 }}
                  disabled={submitting}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ px: 4 }}
                    disabled={
                      submitting ||
                      !medicines.some((med) => med.name.trim() !== "")
                    }
                  >
                    {submitting ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 1 }} />
                        Submitting...
                      </>
                    ) : (
                      "Submit Prescription"
                    )}
                  </Button>
                </Box>
              </form>
            </Paper>
          </>
        )}

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Prescription submitted successfully!
          </Alert>
        </Snackbar>
      </Container>
    </DoctorLayout>
  );
};

export default PrescriptionForm;

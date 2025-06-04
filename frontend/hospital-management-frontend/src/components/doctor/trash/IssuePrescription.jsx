import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";

// Stylish Container
const IssuePrescription = () => {
  const [form, setForm] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    status: "PENDING", // Default status
    prescriptionID: "",
    medicines: [],
    instructions: "",
  });

  const [patients, setPatients] = useState([]);
  const [medicineList, setMedicineList] = useState([
    "Paracetamol",
    "Antibiotic",
    "Cough Syrup",
  ]);
  const [selectedMed, setSelectedMed] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch list of patients and doctor info from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Authentication failed. Please log in.");
          return;
        }

        // Fetch logged-in doctor details
        const doctorResponse = await axios.get(
          "http://localhost:8080/hospital/api/doctors/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setForm((prev) => ({ ...prev, doctorName: doctorResponse.data.name }));

        // Fetch list of patients for selection
        const patientResponse = await axios.get(
          "http://localhost:8080/hospital/api/patients/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPatients(patientResponse.data);
      } catch (err) {
        console.error("Failed to fetch doctor or patient data:", err);
      }
    };

    fetchData();
  }, []);

  const handleAddMedicine = () => {
    if (!selectedMed || form.medicines.includes(selectedMed)) return;
    setForm({ ...form, medicines: [...form.medicines, selectedMed] });
    setSelectedMed("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/hospital/api/doctors/issue-prescription",
        form,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Prescription issued successfully!");
      setForm({
        patientName: "",
        doctorName: "",
        date: "",
        time: "",
        status: "PENDING",
        prescriptionID: "",
        medicines: [],
        instructions: "",
      });
    } catch (err) {
      console.error("Failed to issue prescription:", err);
      alert("Error issuing prescription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Issue Medicine Prescription
      </Typography>

      {/* Select Patient */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Patient Name</InputLabel>
        <Select
          name="patientName"
          value={form.patientName}
          onChange={handleChange}
          label="Patient Name"
        >
          {patients.map((patient, index) => (
            <MenuItem key={index} value={patient.name}>
              {patient.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select Date */}
      <TextField
        fullWidth
        label="Appointment Date"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      {/* Select Time */}
      <TextField
        fullWidth
        label="Appointment Time"
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      {/* Prescription ID */}
      <TextField
        fullWidth
        label="Prescription ID"
        name="prescriptionID"
        value={form.prescriptionID}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      {/* Instructions */}
      <TextField
        fullWidth
        label="Instructions"
        multiline
        rows={3}
        name="instructions"
        value={form.instructions}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      {/* Select Medicine */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Medicine</InputLabel>
        <Select
          value={selectedMed}
          onChange={(e) => setSelectedMed(e.target.value)}
          label="Select Medicine"
        >
          {medicineList.map((med, index) => (
            <MenuItem key={index} value={med}>
              {med}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={handleAddMedicine} variant="outlined" sx={{ mb: 2 }}>
        Add Medicine
      </Button>

      {/* Display Added Medicines */}
      <Box sx={{ mb: 2 }}>
        {form.medicines.length > 0 && (
          <Typography>
            <strong>Medicines:</strong>
          </Typography>
        )}
        {form.medicines.map((med, index) => (
          <Typography key={index}>- {med}</Typography>
        ))}
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Issue Prescription"}
      </Button>
    </Box>
  );
};

export default IssuePrescription;

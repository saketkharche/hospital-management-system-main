import React, { useState } from "react";
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
} from "@mui/material";

const IssuePrescription = () => {
  const [form, setForm] = useState({
    patientName: "",
    doctorName: "Dr. John Doe", // Get dynamically from login
    medicines: [],
    instructions: "",
  });

  const [medicineList, setMedicineList] = useState([
    "Paracetamol",
    "Antibiotic",
    "Cough Syrup",
  ]);
  const [selectedMed, setSelectedMed] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMedicine = () => {
    if (!selectedMed || form.medicines.includes(selectedMed)) return;
    setForm({ ...form, medicines: [...form.medicines, selectedMed] });
    setSelectedMed("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/api/doctors/issue-prescription",
        form
      );
      alert("Prescription issued successfully!");
      setForm({
        patientName: "",
        doctorName: "Dr. John Doe",
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Patient Name</InputLabel>
        <Select
          value={form.patientName}
          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
          label="Patient Name"
        >
          {/* Fetch from backend */}
          <MenuItem value="John Doe">John Doe</MenuItem>
          <MenuItem value="Jane Smith">Jane Smith</MenuItem>
        </Select>
      </FormControl>

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

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Issue Prescription"}
      </Button>
    </Box>
  );
};

export default IssuePrescription;

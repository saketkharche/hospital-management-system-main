import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerPatient } from "../services/patientService";
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import RegisterPatientForm from "../components/common/RegisterPatientForm";
import { validatePatientRegistration } from "../Javascript/patientValidation";

const RegisterPatient = () => {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const validateForm = () => {
    const { errors: newErrors, isValid } = validatePatientRegistration(patientData);
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      await registerPatient(patientData);
      setMessage("Patient registered successfully!");
      setPatientData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        country: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      setMessage(error.message);
    }
  };
  
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ p: 4, width: "100%", boxShadow: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register Patient
        </Typography>
        {message && (
          <Typography color="primary" align="center">
            {message}
          </Typography>
        )}
        
        <RegisterPatientForm 
          patientData={patientData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            color="secondary"
            startIcon={<Home />}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="secondary"
          >
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default RegisterPatient;

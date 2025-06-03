import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerPatient } from "../services/patientService";
import { Box, Button, Typography, Container, Card } from "@mui/material";
import { Home } from "@mui/icons-material";
import RegisterPatientForm from "../components/common/RegisterPatientForm";
import { validatePatientRegistration } from "../Javascript/patientValidation";
import { motion } from "framer-motion";

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
    const { errors: newErrors, isValid } =
      validatePatientRegistration(patientData);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundImage: `url(./assets/images/loginbg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              p: 4,
              width: "100%",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              textAlign: "center",
            }}
          >
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

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
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
      </Box>
    </motion.div>
  );
};

export default RegisterPatient;

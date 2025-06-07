import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerPatient } from "../services/patientService";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!patientData.firstName) newErrors.firstName = "First Name is required";
    if (!patientData.lastName) newErrors.lastName = "Last Name is required";
    if (!patientData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(patientData.email))
      newErrors.email = "Email is invalid";
    if (!patientData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!patientData.gender) newErrors.gender = "Gender is required";
    if (!patientData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!patientData.address) newErrors.address = "Address is required";
    if (!patientData.city) newErrors.city = "City is required";
    if (!patientData.password) newErrors.password = "Password is required";
    else if (patientData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await registerPatient(patientData);
      toast.success("Patient registered successfully!");
      setPatientData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        city: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Register as a Patient
              </Typography>

              <form onSubmit={handleSubmit} noValidate>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={patientData.firstName}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    size="small"
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={patientData.lastName}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={patientData.email}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={patientData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
                  <FormControl fullWidth size="small" error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={patientData.gender}
                      onChange={handleChange}
                      label="Gender"
                    >
                      <MenuItem value="">Select Gender</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {errors.gender && (
                      <Typography color="error" variant="caption">
                        {errors.gender}
                      </Typography>
                    )}
                  </FormControl>

                  <TextField
                    label="DOB"
                    name="dateOfBirth"
                    type="date"
                    value={patientData.dateOfBirth}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Address"
                    name="address"
                    value={patientData.address}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="City"
                    name="city"
                    value={patientData.city}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={patientData.password}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password}
                    size="small"
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, py: 1.2, fontWeight: "bold" }}
                >
                  Register
                </Button>
              </form>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <Button
                  component={Link}
                  to="/"
                  variant="outlined"
                  color="secondary"
                  startIcon={<Home />}
                  size="small"
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  Login
                </Button>
              </Box>
            </Card>
          </Container>
        </Box>
      </motion.div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default RegisterPatient;

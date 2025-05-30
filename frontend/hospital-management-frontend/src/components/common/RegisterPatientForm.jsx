import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { Person, Email, Phone, Lock } from "@mui/icons-material";

const RegisterPatientForm = ({ 
  patientData, 
  errors, 
  handleChange, 
  handleSubmit 
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* First Name */}
        <TextField
          label="First Name"
          name="firstName"
          value={patientData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          InputProps={{
            startAdornment: <Person />,
          }}
          fullWidth
        />

        {/* Last Name */}
        <TextField
          label="Last Name"
          name="lastName"
          value={patientData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
        />

        {/* Email */}
        <TextField
          label="Email"
          name="email"
          value={patientData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: <Email />,
          }}
          fullWidth
        />

        {/* Phone Number */}
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={patientData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          InputProps={{
            startAdornment: <Phone />,
          }}
          fullWidth
        />

        {/* Gender */}
        <FormControl fullWidth error={!!errors.gender}>
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
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>

        {/* Date of Birth */}
        <TextField
          type="date"
          name="dateOfBirth"
          value={patientData.dateOfBirth}
          onChange={handleChange}
          label="Date of Birth"
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth}
        />

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={patientData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: <Lock />,
          }}
          fullWidth
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>
    </form>
  );
};

export default RegisterPatientForm;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { validateForm } from "../../Javascript/validateForm"; // Assuming this function does validation
import { updatePatient } from "../../services/patientService";

const PatientDetails = ({ userData }) => {
  const [patientData, setPatientData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    country: "",
  });

  // Load user data into form
  useEffect(() => {
    if (userData) {
      setFormData({
        patientId: userData.patientId || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        gender: userData.gender || "",
        dateOfBirth: userData.dateOfBirth || "",
        city: userData.city || "",
        state: userData.state || "",
        country: userData.country || "",
      });
    }
  }, [userData]);

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      patientId: userData.patientId || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phoneNumber: userData.phoneNumber || "",
      gender: userData.gender || "",
      dateOfBirth: userData.dateOfBirth || "",
      city: userData.city || "",
      state: userData.state || "",
      country: userData.country || "",
    });
    setErrors({}); // Clear errors on cancel
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form data
    const validationErrors = validateForm(formData);
    setErrors(validationErrors); // Set validation errors

    // If validation errors exist, stop submission
    if (Object.keys(validationErrors).length > 0) {
      console.warn("Validation failed:", validationErrors);
      return;
    }

    const previousData = { ...patientData }; // Backup the original data
    setPatientData(formData); // Optimistically update UI

    try {
      setIsLoading(true); // Show loading indicator
           
      // Assume updatePatient is a service to update patient data on the server
      const updatedData = await updatePatient(formData.email, formData);
       if(updatedData)
      alert("Patient details updated successfully!");
      setIsEditing(false); // Exit edit mode after successful update
    } catch (error) {
      setPatientData(previousData); // Rollback data on error
      console.error("Error during patient update:", error.message);
      alert(`Update failed: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  // Update the fields array with disabled property
  const fields = [
    { label: "Patient ID", name: "patientId", disabled: true },
    { label: "First Name", name: "firstName", disabled: false },
    { label: "Last Name", name: "lastName", disabled: false },
    { label: "Phone Number", name: "phoneNumber", disabled: false },
    { label: "Email", name: "email", disabled: true },
    { label: "Date of Birth", name: "dateOfBirth", disabled: false },
    { label: "City", name: "city", disabled: false },
    { label: "State", name: "state", disabled: false },
    { label: "Country", name: "country", disabled: false },
  ];

  return (
    <Box
      sx={{
        padding: 4,
        bgcolor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      {/* Main Container */}
      <Box
        sx={{
          maxWidth: "800px",
          width: "100%",
          bgcolor: "#fff",
          boxShadow: 3,
          borderRadius: 2,
          padding: 4,
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            Patient Profile
          </Typography>
          <Card
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              boxShadow: 3,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              height="100%"
              image="https://cdn1.iconfinder.com/data/icons/doctor-5/100/01-1Patient_1-1024.png"
              alt="Patient Image"
            />
          </Card>
        </Box>

        {/* Patient Details Section */}
        <Grid container spacing={2}>
          {fields.map(({ label, name, disabled }) => (
            <Grid item xs={6} key={name}>
              <Typography fontWeight="bold">{label}:</Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  value={formData[name]}
                  name={name}
                  onChange={handleChange}
                  size="small"
                  error={Boolean(errors[name])}
                  helperText={errors[name] || ""}
                  disabled={disabled}
                  InputProps={{
                    sx: disabled ? {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      '&.Mui-disabled': {
                        color: 'rgba(0, 0, 0, 0.7)',
                      }
                    } : {}
                  }}
                />
              ) : (
                <Typography>{formData[name]}</Typography>
              )}
            </Grid>
          ))}
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ textAlign: "right", marginTop: 3 }}>
          {!isEditing ? (
            <Button variant="contained" onClick={handleEditClick}>
              Edit
            </Button>
          ) : (
            <>
              <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button variant="outlined" onClick={handleCancelClick} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDetails;

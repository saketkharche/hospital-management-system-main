import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  Snackbar,
  Alert,
} from "@mui/material";
import { validateForm } from "../../Javascript/validateForm";
import { updatePatient } from "../../services/patientService";

const PatientDetails = ({ userData }) => {
  const [patientData, setPatientData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setErrors({});
    setFormData(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setToast({
        open: true,
        message: "Validation failed. Please correct errors.",
        severity: "error",
      });
      return;
    }

    const previousData = { ...patientData };
    setPatientData(formData);

    try {
      setIsLoading(true);
      const updatedData = await updatePatient(formData.email, formData);

      if (updatedData) {
        setToast({
          open: true,
          message: "Patient details updated successfully!",
          severity: "success",
        });
        setIsEditing(false);
      }
    } catch (error) {
      setPatientData(previousData);
      setToast({
        open: true,
        message: `Update failed: ${error.message}`,
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
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
              image="https://cdn-icons-png.flaticon.com/512/4190/4190544.png"
              alt="Patient Image"
            />
          </Card>
        </Box>

        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={6} key={key}>
              <Typography fontWeight="bold">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  value={formData[key]}
                  name={key}
                  onChange={handleChange}
                  size="small"
                  error={Boolean(errors[key])}
                  helperText={errors[key] || ""}
                  disabled={["patientId", "email"].includes(key)}
                />
              ) : (
                <Typography>{formData[key]}</Typography>
              )}
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "right", marginTop: 3 }}>
          {!isEditing ? (
            <Button variant="contained" onClick={handleEditClick}>
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancelClick}
                sx={{ ml: 2 }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() =>
          setToast({ open: false, message: "", severity: "success" })
        }
      >
        <Alert
          onClose={() =>
            setToast({ open: false, message: "", severity: "success" })
          }
          severity={toast.severity}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientDetails;

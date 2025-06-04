import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Container,
  CircularProgress,
  Box,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Add, Remove, ArrowBack } from '@mui/icons-material';
import DoctorLayout from './DoctorLayout';

const PrescriptionForm = () => {
  const { id: appointmentId } = useParams();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [medicines, setMedicines] = useState([{
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  }]);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/hospital/api/appointments/${appointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );
        
        if (!res.data) {
          throw new Error('No data received from server');
        }
        
        setPatientData({
          id: res.data.patientId,
          name: res.data.patientName || 'Patient',
          email: res.data.patientEmail,
          age: res.data.patientAge || '',
          gender: res.data.patientGender || '',
          bloodGroup: res.data.patientBloodGroup || ''
        });
      } catch (err) {
        console.error('Failed to fetch appointment details:', err);
        setError(err.response?.data?.message || 
                err.message || 
                'Failed to load appointment details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, {
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }]);
  };

  const removeMedicine = (index) => {
    if (medicines.length > 1) {
      const updatedMedicines = [...medicines];
      updatedMedicines.splice(index, 1);
      setMedicines(updatedMedicines);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const prescriptionData = {
        appointmentId: parseInt(appointmentId),
        patientId: patientData.id,
        patientEmail: patientData.email,
        medicines: medicines.filter(med => med.name.trim() !== ''),
        additionalInstructions: ''
      };

      await axios.post(
        'http://localhost:8080/hospital/api/prescriptions/issue',
        prescriptionData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess(true);
      setTimeout(() => navigate('/doctor/appointments'), 2000);
    } catch (err) {
      console.error('Failed to submit prescription:', err);
      setError(err.response?.data?.message || 'Failed to submit prescription. Please try again.');
    }
  };

  if (loading) {
    return (
      <DoctorLayout>
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Container>
      </DoctorLayout>
    );
  }

  if (error) {
    return (
      <DoctorLayout>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Container>
      </DoctorLayout>
    );
  }

  if (!patientData) {
    return (
      <DoctorLayout>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Alert severity="warning">
            No patient data available for this appointment
          </Alert>
        </Container>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1">
            New Prescription
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Patient Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Chip label={`Name: ${patientData.name}`} variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Chip label={`Age: ${patientData.age || 'N/A'}`} variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Chip label={`Gender: ${patientData.gender || 'N/A'}`} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Chip 
                label={`Blood Group: ${patientData.bloodGroup || 'N/A'}`} 
                variant="outlined" 
                color="primary"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Prescription Details
          </Typography>

          <form onSubmit={handleSubmit}>
            {medicines.map((medicine, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      label="Medicine Name"
                      fullWidth
                      value={medicine.name}
                      onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      label="Dosage"
                      fullWidth
                      value={medicine.dosage}
                      onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      label="Frequency"
                      fullWidth
                      value={medicine.frequency}
                      onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                      placeholder="e.g., 2 times/day"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      label="Duration"
                      fullWidth
                      value={medicine.duration}
                      onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                      placeholder="e.g., 7 days"
                    />
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <IconButton 
                      onClick={() => removeMedicine(index)} 
                      color="error"
                      disabled={medicines.length <= 1}
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
                      onChange={(e) => handleMedicineChange(index, 'instructions', e.target.value)}
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
            >
              Add Another Medicine
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ px: 4 }}
                disabled={!medicines.some(med => med.name.trim() !== '')}
              >
                Submit Prescription
              </Button>
            </Box>
          </form>
        </Paper>

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Prescription submitted successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={3000}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </DoctorLayout>
  );
};

export default PrescriptionForm;
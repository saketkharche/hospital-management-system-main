import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { LocalPharmacy, ArrowBack } from '@mui/icons-material';

const AppointmentDetails = () => {
  const { id: appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [prescription, setPrescription] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hospital/api/appointments/${appointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );
        setAppointment(response.data);
        setPrescription(response.data.prescription || '');
        setStatus(response.data.status || 'PENDING');
      } catch (error) {
        console.error('Error fetching appointment details:', error);
        setError('Failed to load appointment details');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8080/hospital/api/doctor/appointments/${appointmentId}`,
        { prescription, status },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      setSuccess(true);
      setTimeout(() => navigate('/doctor/appointments'), 2000);
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePrescription = () => {
    navigate(`/doctor/appointments/${appointmentId}/prescription`);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!appointment) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">No appointment data found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/doctor/appointments')}
          >
            Back to Appointments
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LocalPharmacy />}
            onClick={handleCreatePrescription}
          >
            Create Prescription
          </Button>
        </Box>

        <Typography variant="h4" gutterBottom>
          Appointment Details
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">
            <strong>Patient:</strong> {appointment.patientName}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Date & Time:</strong> {new Date(appointment.date).toLocaleDateString()} at{' '}
            {appointment.time}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Reason:</strong> {appointment.reason}
          </Typography>
        </Box>

        <TextField
          label="Prescription Notes"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="CANCELLED">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Appointment updated successfully!
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default AppointmentDetails;
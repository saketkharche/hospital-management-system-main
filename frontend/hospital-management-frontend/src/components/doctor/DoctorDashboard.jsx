import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { CalendarToday, LocalHospital, Assignment } from '@mui/icons-material';

const cardStyles = {
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 3,
  bgcolor: '#f9f9f9',
  height: 200,
  boxShadow: 6,
};

const iconStyles = {
  fontSize: 50,
  mb: 1,
};

const DoctorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/doctor/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Dashboard fetch failed:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3, py: 5 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" mb={4}>
        Welcome, Dr. {dashboardData?.name || 'Doctor'}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={cardStyles}>
            <CalendarToday color="primary" sx={iconStyles} />
            <Typography variant="h6">Today’s Appointments</Typography>
            <Typography variant="h3" color="text.secondary">{dashboardData?.appointmentsToday || 0}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={cardStyles}>
            <Assignment color="secondary" sx={iconStyles} />
            <Typography variant="h6">Pending Prescriptions</Typography>
            <Typography variant="h3" color="text.secondary">{dashboardData?.pendingPrescriptions || 0}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={cardStyles}>
            <LocalHospital color="success" sx={iconStyles} />
            <Typography variant="h6">Total Patients</Typography>
            <Typography variant="h3" color="text.secondary">{dashboardData?.totalPatients || 0}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;

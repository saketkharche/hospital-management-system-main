import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PaymentsIcon from '@mui/icons-material/Payment';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <PersonIcon fontSize="large" color="primary" />,
    title: 'Patient Management',
    description: 'Easily manage patient records and appointments.',
  },
  {
    icon: <MedicalServicesIcon fontSize="large" color="primary" />,
    title: 'Doctor Management',
    description: 'Assign doctors to patients and manage their schedules.',
  },
  {
    icon: <PaymentsIcon fontSize="large" color="primary" />,
    title: 'Billing and Payments',
    description: 'Track bills, payments, and financial reports seamlessly.',
  },
];

function FeaturesSection() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Key Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {feature.title}
                </Typography>
                <Typography color="textSecondary">
                  {feature.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FeaturesSection;

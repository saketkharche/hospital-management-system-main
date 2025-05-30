import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Welcome to the Patient Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Select an option from the menu to get started.
      </Typography>
    </Box>
  );
};

export default Dashboard;

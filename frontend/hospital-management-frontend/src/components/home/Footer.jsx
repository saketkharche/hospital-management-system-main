import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ py: 3, textAlign: 'center', backgroundColor: '#333', color: '#fff' }}>
      <Typography variant="body2">&copy; 2024 LifeBridge Hospital. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;

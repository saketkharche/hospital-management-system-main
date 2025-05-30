// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        {/* Logo and brand */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img
            src={`${process.env.PUBLIC_URL}/WebsiteLogo.png`} // Correct image path
            alt="LifeBridge Hospital Logo"
            style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '8px' }} // Adjust margin on the right to space logo and text
          />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LifeBridge Hospital
        </Typography>

        {/* Navigation buttons */}
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Box
         sx={{
           backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/Hero.jpeg)`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           height: '100vh',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           
         }}
       
      >
        <Container>
          <Typography
            variant="h2"
            color="white"
            gutterBottom
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Welcome to Our LifeBridge Hospital
          </Typography>
          <Typography
            variant="h6"
            color="white"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            Manage your hospital records efficiently and securely.
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              book appointment
            </Button>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
}

export default HeroSection;

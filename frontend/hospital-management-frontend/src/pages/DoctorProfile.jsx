import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
  Button,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

function DoctorProfile() {
  const navigate = useNavigate();

  const handleViewAppointments = () => {
    navigate('/doctor/appointments');
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: '#f5f5f5',
        }}
      >
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 10, mb: 3, flexGrow: 1 }}>
          <Card elevation={4} sx={{ borderRadius: 3, bgcolor: '#ffffff' }}>
            <CardHeader
              title="Doctor Profile"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                textAlign: 'center',
              }}
              titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
            />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4} textAlign="center">
                  <Avatar
                    alt="Dr. John Doe"
                    src={`${process.env.PUBLIC_URL}/doctor.jpg`}
                    sx={{ width: 120, height: 120, margin: 'auto' }}
                  />
                  <Typography variant="h6" mt={2} fontWeight="bold">
                    Dr. John Doe
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Cardiologist
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary="doctor@example.com"
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone"
                        secondary="+91 8765432109"
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Experience"
                        secondary="10+ years in Cardiology"
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                      />
                    </ListItem>
                  </List>
                  <Box textAlign="center" mt={3}>
                    <Button variant="contained" color="primary" onClick={handleViewAppointments}>
                      View Appointments
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default DoctorProfile;

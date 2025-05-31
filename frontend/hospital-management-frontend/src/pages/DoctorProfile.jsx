import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Container,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Navbar Component
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "success.dark" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hospital Management
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color="inherit">Doctor</Button>
        <Button color="inherit">Profile</Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// Footer Component
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "success.dark",
        color: "white",
        textAlign: "center",
        py: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Hospital Management System. All rights
        reserved.
      </Typography>
    </Box>
  );
}

// Main Component
function DoctorProfile() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <Container maxWidth="md" sx={{ mt: 5, mb: 3, flexGrow: 1 }}>
          <Card
            sx={{ boxShadow: 3, borderRadius: 2, bgcolor: "#f9f9f9", p: 3 }}
          >
            <CardHeader
              title="Doctor Profile"
              sx={{
                bgcolor: "success.main",
                color: "white",
                textAlign: "center",
                borderRadius: 1,
                mb: 2,
              }}
              titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
            />
            <CardContent>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={4} textAlign="center">
                  <Avatar
                    alt="Dr. John Doe"
                    src={`${process.env.PUBLIC_URL}/doctor.jpg`}
                    sx={{ width: 150, height: 150, margin: "auto" }}
                  />
                  <Typography variant="h6" mt={2} fontWeight="medium">
                    Dr. John Doe
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Specialization"
                        secondary="Cardiologist"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Email"
                        secondary="doctor@example.com"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Phone"
                        secondary="+91 8765432109"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                  </List>
                  <Box textAlign="center" mt={4}>
                    <Button variant="contained" color="success" size="large">
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

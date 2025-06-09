import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";

// Navbar Component
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token or session (if any)
    localStorage.removeItem("token"); // Example
    navigate("/"); // Redirect to home
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "warning.dark" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hospital Management
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color="inherit">Nurse</Button>
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
        bgcolor: "warning.dark",
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

// Main NurseProfile Component
function NurseProfile() {
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
            sx={{ boxShadow: 3, borderRadius: 2, bgcolor: "#fff8e1", p: 3 }}
          >
            <CardHeader
              title="Nurse Profile"
              sx={{
                bgcolor: "warning.main",
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
                    alt="Nurse Alice"
                    src={`https://static.vecteezy.com/system/resources/previews/006/137/650/large_2x/cute-nurse-character-with-flat-and-gradient-style-free-vector.jpg`}
                    sx={{ width: 150, height: 150, margin: "auto" }}
                  />
                  <Typography variant="h6" mt={2} fontWeight="medium">
                    Nurse Alice
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Email"
                        secondary="nurse@example.com"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Phone"
                        secondary="+91 6543210987"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Shift"
                        secondary="Night"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                  </List>
                  <Box textAlign="center" mt={4}>
                    <Button variant="contained" color="warning" size="large">
                      View Duty Schedule
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

export default NurseProfile;

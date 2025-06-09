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
    // Example: Clear token if using authentication
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home page
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "secondary.dark" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hospital Management
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color="inherit">Staff</Button>
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
        bgcolor: "secondary.dark",
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

// Main StaffProfile Component
function StaffProfile() {
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
            sx={{ boxShadow: 3, borderRadius: 2, bgcolor: "#f5f5f5", p: 3 }}
          >
            <CardHeader
              title="Staff Profile"
              sx={{
                bgcolor: "secondary.main",
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
                    alt="Staff Member"
                    src={`https://static.vecteezy.com/system/resources/previews/059/709/656/non_2x/a-flat-style-illustration-of-a-radiologist-checking-chest-xray-vector.jpg`}
                    sx={{ width: 150, height: 150, margin: "auto" }}
                  />
                  <Typography variant="h6" mt={2} fontWeight="medium">
                    Staff Member
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Email"
                        secondary="staff@example.com"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Phone"
                        secondary="+91 5432109876"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Role"
                        secondary="Support Staff"
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                  </List>
                  <Box textAlign="center" mt={4}>
                    <Button variant="contained" color="secondary" size="large">
                      Edit Profile
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

export default StaffProfile;

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Paper,
} from "@mui/material";

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Settings
        </Typography>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Profile" />
          <Tab label="Change Password" />
          <Tab label="System Preferences" />
        </Tabs>

        <Box sx={{ mt: 4 }}>
          {tabIndex === 0 && (
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField label="Name" defaultValue="Admin User" fullWidth />
              <TextField
                label="Email"
                type="email"
                defaultValue="admin@example.com"
                fullWidth
              />
              <Button variant="contained" color="primary">
                Update Profile
              </Button>
            </Box>
          )}
          {tabIndex === 1 && (
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField label="Current Password" type="password" fullWidth />
              <TextField label="New Password" type="password" fullWidth />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
              />
              <Button variant="contained" color="secondary">
                Change Password
              </Button>
            </Box>
          )}
          {tabIndex === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Notification Email"
                defaultValue="admin@example.com"
                fullWidth
              />
              <TextField label="System Theme" defaultValue="Light" fullWidth />
              <Button variant="contained" color="success">
                Save Preferences
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;

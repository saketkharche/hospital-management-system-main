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
  Slide,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [systemTheme, setSystemTheme] = useState("Light"); // ✅ Theme State
  const handleTabChange = (event, newValue) => setTabIndex(newValue);
  const handleThemeChange = (event) => setSystemTheme(event.target.value);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper
        elevation={8}
        sx={{
          p: 5,
          borderRadius: 4,
          bgcolor: "background.default",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          transition: "0.3s ease-in-out",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 4,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          ⚙️ Admin Settings
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: 16,
              px: 3,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
            },
            "& .Mui-selected": {
              bgcolor: "primary.light",
              color: "primary.dark",
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
            },
          }}
        >
          <Tab label="Profile" />
          <Tab label="Change Password" />
          <Tab label="System Preferences" />
        </Tabs>

        <Box sx={{ mt: 4 }}>
          <Slide direction="up" in={tabIndex === 0} mountOnEnter unmountOnExit>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Name"
                defaultValue="Saket Kharche"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Email"
                type="email"
                defaultValue="saket@gmail.com"
                fullWidth
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ py: 1.5, fontWeight: 600, fontSize: 16, mt: 1 }}
              >
                Update Profile
              </Button>
            </Box>
          </Slide>

          <Slide direction="up" in={tabIndex === 1} mountOnEnter unmountOnExit>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                variant="outlined"
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ py: 1.5, fontWeight: 600, fontSize: 16, mt: 1 }}
              >
                Change Password
              </Button>
            </Box>
          </Slide>

          <Slide direction="up" in={tabIndex === 2} mountOnEnter unmountOnExit>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Notification Email"
                defaultValue="saket@gmail.com"
                fullWidth
                variant="outlined"
              />

              <Typography variant="body1" fontWeight={600}>
                Select System Theme:
              </Typography>
              <RadioGroup value={systemTheme} onChange={handleThemeChange} row>
                <FormControlLabel
                  value="Light"
                  control={<Radio />}
                  label="Light Mode"
                />
                <FormControlLabel
                  value="Dark"
                  control={<Radio />}
                  label="Dark Mode"
                />
              </RadioGroup>

              <Button
                variant="contained"
                color="success"
                sx={{ py: 1.5, fontWeight: 600, fontSize: 16, mt: 1 }}
              >
                Save Preferences
              </Button>
            </Box>
          </Slide>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;

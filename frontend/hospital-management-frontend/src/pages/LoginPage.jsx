import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Home,
  Lock,
  Email,
} from "@mui/icons-material";
import { loginUser } from "../services/authService"; // Ensure the correct path is used
import "../styles/LoginPage.css";
import isTokenExpired from "../utils/isTokenExpired";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Check if email and password are provided
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    const credentials = { email, password };
    try {
      // Send login request to the backend
      const response = await loginUser(credentials);
      console.log("Login response:", response);
      if (isTokenExpired(response.token)) {
        setMessage("Session Expired. Please login again.");
        return;
      }

      // Check if the response is valid
      if (!response || !response.token) {
        setMessage("Invalid response from server. Please try again.");
        return;
      }

      // Store the token in sessionStorage
      sessionStorage.setItem("token", response.token);

      console.log("Login successful:", response);

      // Role-based navigation using a dictionary
      const roleRoutes = {
        ROLE_PATIENT: "/patient/profile",
        ROLE_ADMIN: "/admin/profile",
        ROLE_DOCTOR: "/doctor/profile",
        ROLE_NURSE: "/nurse/profile",
        ROLE_STAFF: "/staff/profile",
      };

      // Get the route based on the user's role
      const route = roleRoutes[response.role];

      // Navigate to the appropriate dashboard
      if (route) {
        navigate(route);
      } else {
        setMessage("Unknown role. Please contact support.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        "Login failed. Please check your credentials or try again later."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 4,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <Avatar
          src={`${process.env.PUBLIC_URL}/WebsiteLogo.png`}
          alt="Website Logo"
          sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Welcome to LifeBridge Hospital
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            required
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />

          {message && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            component={Link}
            to="/"
            startIcon={<Home />}
            color="secondary"
          >
            Home
          </Button>
          <Button component={Link} to="/register" color="secondary">
            Register
          </Button>
          <Button component={Link} to="/forgot-password" color="secondary">
            Forgot Password?
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;

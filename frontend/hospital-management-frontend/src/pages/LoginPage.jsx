import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  Email,
  Home,
  Lock,
  PersonAdd,
  Visibility,
  VisibilityOff,
  VpnKey,
} from "@mui/icons-material";
import { loginUser } from "../services/authService";
import "../styles/LoginPage.css";
import isTokenExpired from "../utils/isTokenExpired";
import { motion } from "framer-motion";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    // 🔍 Basic client-side validation
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    // 📧 Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // 🔐 Password length check
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    const credentials = { email, password };

    try {
      const response = await loginUser(credentials);

      console.log("Login response:", response);

      if (!response || !response.token) {
        setMessage("Invalid response from server. Please try again later.");
        return;
      }

      // ⏱ Check if token is expired
      if (isTokenExpired(response.token)) {
        setMessage("Session Expired. Please login again.");
        return;
      }

      // 🎯 Save token and redirect based on role
      sessionStorage.setItem("token", response.token);
      console.log("Login successful:", response);

      const roleRoutes = {
        ROLE_PATIENT: "/patient/profile",
        ROLE_ADMIN: "/admin/profile",
        ROLE_DOCTOR: "/doctor/profile",
        ROLE_NURSE: "/nurse/profile",
        ROLE_STAFF: "/staff/profile",
      };

      const route = roleRoutes[response.role];

      if (route) {
        navigate(route);
      } else {
        setMessage("Unknown role. Please contact support.");
      }
    } catch (error) {
      console.error("Login error:", error);

      // 💬 Friendly error message
      if (error.response && error.response.status === 401) {
        setMessage("Invalid email or password. Please try again.");
      } else if (error.response && error.response.status === 404) {
        setMessage("User not found. Please register first.");
      } else if (error.response && error.response.status === 500) {
        setMessage("Server error. Please try again later.");
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundImage: `url(./assets/images/loginbg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backdropFilter: "brightness(0.9)",
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Box
              sx={{
                p: 4,
                boxShadow: "0px 10px 40px rgba(0,0,0,0.2)",
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(12px)",
                textAlign: "center",
                position: "relative",
                mx: 2,
              }}
            >
              <Avatar
                src={`./assets/images/logo.jpg`}
                alt="logo"
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 2,
                  border: "3px solid #1976d2",
                }}
              />
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "#1976d2",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                LifeBridge Hospital
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "text.secondary", mb: 3 }}
              >
                Log in to access your dashboard
              </Typography>

              <form onSubmit={handleLogin}>
                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                />

                {/* Password Field */}
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
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                />

                {/* Error Message */}
                {message && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ mt: 1, textAlign: "left" }}
                  >
                    {message}
                  </Typography>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    mt: 2,
                    mb: 2,
                    py: 1.5,
                    bgcolor: "#1976d2",
                    "&:hover": {
                      bgcolor: "#1565c0",
                    },
                    fontWeight: "bold",
                    borderRadius: "10px",
                  }}
                >
                  Login
                </Button>
              </form>

              <Divider sx={{ my: 2 }} />

              {/* Navigation Links */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Button
                  component={Link}
                  to="/"
                  startIcon={<Home />}
                  color="secondary"
                  size="small"
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  startIcon={<PersonAdd />}
                  color="secondary"
                  size="small"
                >
                  Register
                </Button>
                <Button
                  component={Link}
                  to="/forgot-password"
                  startIcon={<VpnKey />}
                  color="secondary"
                  size="small"
                >
                  Forgot Password?
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
}

export default LoginPage;

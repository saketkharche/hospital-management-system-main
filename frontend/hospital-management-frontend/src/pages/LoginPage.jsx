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
  PersonAdd,
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

    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    const credentials = { email, password };
    try {
      const response = await loginUser(credentials);
      console.log("Login response:", response);
      if (isTokenExpired(response.token)) {
        setMessage("Session Expired. Please login again.");
        return;
      }

      if (!response || !response.token) {
        setMessage("Invalid response from server. Please try again.");
        return;
      }

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
      route
        ? navigate(route)
        : setMessage("Unknown role. Please contact support.");
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        "Login failed. Please check your credentials or try again later."
      );
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
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: 4,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Avatar
              src={`./assets/images/logo.jpg`}
              alt="logo"
              sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
            />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
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
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
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
              <Button
                component={Link}
                to="/register"
                startIcon={<PersonAdd />}
                color="secondary"
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/forgot-password"
                startIcon={<VpnKey />}
                color="secondary"
              >
                Forgot Password?
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
}

export default LoginPage;

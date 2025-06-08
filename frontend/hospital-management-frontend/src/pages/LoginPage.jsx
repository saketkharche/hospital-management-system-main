import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
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
import {Email, Home, Lock, PersonAdd, Visibility, VisibilityOff, VpnKey} from "@mui/icons-material";
import {loginUser} from "../services/authService";
import "../styles/LoginPage.css";
import isTokenExpired from "../utils/isTokenExpired";
import {motion} from "framer-motion";

// Toastify imports
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Basic validation
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            setIsLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await loginUser({ email, password });

            if (!response?.token || !response?.role) {
                toast.error("Invalid login credentials. Please try again.");
                setIsLoading(false);
                return;
            }

            if (isTokenExpired(response.token)) {
                toast.error("Session expired. Please login again.");
                setIsLoading(false);
                return;
            }

            sessionStorage.setItem("token", response.token);

            const roleRoutes = {
                ROLE_PATIENT: "/patient/profile",
                ROLE_ADMIN: "/admin/profile",
                ROLE_DOCTOR: "/doctor/profile",
                ROLE_NURSE: "/nurse/profile",
                ROLE_STAFF: "/staff/profile",
            };

            const route = roleRoutes[response.role];

            if (!route) {
                toast.error("Unknown role. Please contact support.");
                setIsLoading(false);
                return;
            }

            // Show success toast
            toast.success("Login successful! Redirecting...");

            // Delay redirect to show success message
            setTimeout(() => {
                navigate(route);
            }, 1500);

        } catch (error) {
            console.error("Login error:", error);
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Login failed. Please check your credentials and try again.";

            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
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
                    backgroundImage: `url(./assets/images/loginbg.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
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
                                mx: 2,
                            }}
                        >
                            <Avatar
                                src="./assets/images/logo.jpg"
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
                                sx={{ color: "#1976d2", fontFamily: "'Poppins', sans-serif" }}
                            >
                                LifeBridge Hospital
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.secondary", mb: 3 }}
                            >
                                Log in to access your dashboard
                            </Typography>

                            {/* Login Form */}
                            <form onSubmit={handleLogin}>
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
                                                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    sx={{
                                        "& .MuiOutlinedInput.root": {
                                            borderRadius: "10px",
                                        },
                                    }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isLoading}
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
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                            </form>

                            <Divider sx={{ my: 2 }} />

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

            {/* Toast Container */}
            <ToastContainer />
        </motion.div>
    );
};

export default LoginPage;
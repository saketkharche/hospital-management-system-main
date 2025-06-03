import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOTP = () => {
    setOtpSent(true);
    setMessage("✅ OTP has been sent to your email.");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            bgcolor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, color: "primary.main", textAlign: "center" }}
          >
            🔑 Forgot Password
          </Typography>

          <TextField
            label="Enter Email"
            variant="outlined"
            fullWidth
            sx={{ my: 2, bgcolor: "rgba(255, 255, 255, 0.2)", borderRadius: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSendOTP}
            disabled={otpSent}
            sx={{
              py: 1,
              fontWeight: 700,
              letterSpacing: 1,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            ✉️ Send OTP
          </Button>

          {otpSent && (
            <>
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                sx={{
                  my: 2,
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 2,
                }}
              />

              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{
                  py: 1,
                  fontWeight: 700,
                  letterSpacing: 1,
                  bgcolor: "success.main",
                  "&:hover": { bgcolor: "success.dark" },
                }}
              >
                ✅ Verify OTP
              </Button>
            </>
          )}

          <Typography
            variant="body1"
            sx={{
              mt: 3,
              textAlign: "center",
              fontWeight: 600,
              color: "error.main",
            }}
          >
            {message}
          </Typography>

          {/* 🚀 Added Home & Login Navigation */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="secondary"
            >
              🏠 Go to Home
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="secondary"
            >
              🔑 Back to Login
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ForgotPassword;

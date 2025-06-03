import React from "react";
import { Box, Stack, Typography, IconButton, Link } from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        color: "#333",
        py: 4,
        px: { xs: 2, md: 6 },
        mt: "auto",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Contact Info */}
        <Stack spacing={1}>
          <Typography fontWeight="bold">Contact Us</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Phone fontSize="small" />
            <Typography variant="body2">+91 9119999070</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Email fontSize="small" />
            <Typography variant="body2">
              contact@lifebridgehospital.com
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOn fontSize="small" />
            <Typography variant="body2">
              Akurdi Station Rd, Pune 411035
            </Typography>
          </Stack>
        </Stack>

        {/* Social Links */}
        <Stack direction="row" spacing={2}>
          {[Facebook, Instagram, Twitter].map((Icon, idx) => (
            <IconButton
              key={idx}
              sx={{ color: "#333", "&:hover": { color: "#007bff" } }}
              href="https://www.instagram.com/"
            >
              <Icon />
            </IconButton>
          ))}
        </Stack>

        {/* Footer Links */}
        <Stack direction="row" spacing={2}>
          <Link href="/privacy" underline="hover" sx={{ color: "#333" }}>
            Privacy
          </Link>
          <Link href="/terms" underline="hover" sx={{ color: "#333" }}>
            Terms
          </Link>
          <Link href="/contact" underline="hover" sx={{ color: "#333" }}>
            Help
          </Link>
        </Stack>
      </Stack>

      <Typography
        variant="caption"
        sx={{ display: "block", mt: 3, textAlign: "center" }}
      >
        &copy; 2025 LifeBridge Hospital. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button
      variant="contained"
      color="warning" // 🔸 Change this to "primary", "secondary", "error", etc.
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;

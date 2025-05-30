import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authUtils";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(navigate);
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={handleLogout}
      sx={{
        backgroundColor: "#E74C3C",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#C0392B",
        },
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;


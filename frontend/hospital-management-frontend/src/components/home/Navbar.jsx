// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import { Menu, Home, Info, Login, PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Hide-on-scroll behavior
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navItems = [
    { text: "Home", to: "/", icon: <Home /> },
    { text: "About Us", to: "/about", icon: <Info /> },
    { text: "Login", to: "/login", icon: <Login /> },
    { text: "Register", to: "/register", icon: <PersonAdd /> },
  ];

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={4}
        sx={{
          backgroundColor: "#fffff)", // Transparent teal
          backdropFilter: "blur(6px)",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <IconButton edge="start" component={Link} to="/" sx={{ mr: 1 }}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.jpg`}
              alt="LifeBridge Hospital Logo"
              style={{
                maxWidth: "50px",
                maxHeight: "50px",
                borderRadius: "50%",
              }}
            />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: "white", fontWeight: 600 }}
          >
            LifeBridge Hospital
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 250 }} role="presentation">
                  <List>
                    {navItems.map((item, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={item.to}
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={item.to}
                  startIcon={item.icon}
                  sx={{ color: "white", ml: 1 }}
                >
                  {item.text}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;

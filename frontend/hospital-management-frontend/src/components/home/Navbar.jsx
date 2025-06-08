import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import {
  ExpandLess,
  ExpandMore,
  Home,
  Info,
  Login,
  Menu as MenuIcon,
  MoreHoriz,
  PersonAdd,
} from "@mui/icons-material";
import { Biohazard, Pill } from "lucide-react";
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
  const [moreOpen, setMoreOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const menuOpen = Boolean(anchorEl);

  const navItems = [
    { text: "Home", to: "/", icon: <Home /> },
    { text: "About Us", to: "/about", icon: <Info /> },
    { text: "Login", to: "/login", icon: <Login /> },
    { text: "Register", to: "/register", icon: <PersonAdd /> },
    {
      text: "More",
      icon: <MoreHoriz />,
      subItems: [
        { text: "Drug Info", to: "/drug-info", icon: <Pill size={20} /> },
        {
          text: "Disease Info",
          to: "/disease-info",
          icon: <Biohazard size={20} />,
        },
      ],
    },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawerMore = () => {
    setMoreOpen(!moreOpen);
  };

  const renderNavItems = (items) =>
    items.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem disablePadding>
          <ListItemButton
            component={item.to ? Link : "div"}
            to={item.to}
            onClick={() => {
              if (!item.to) toggleDrawerMore();
              else setDrawerOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            {item.subItems && (moreOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {/* Collapsible sub-items */}
        {item.subItems && (
          <Collapse in={moreOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem, idx) => (
                <ListItem key={idx} disablePadding sx={{ pl: 4 }}>
                  <ListItemButton
                    component={Link}
                    to={subItem.to}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={4}
        sx={{
          backgroundColor: "#1976d2",
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
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 250 }} role="presentation">
                  <List>{renderNavItems(navItems)}</List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              {navItems.map((item, index) => {
                if (item.subItems) {
                  return (
                    <div key={index}>
                      <Button
                        color="inherit"
                        startIcon={item.icon}
                        endIcon={<ExpandMore />}
                        onClick={handleMenuOpen}
                        sx={{ ml: 1 }}
                      >
                        {item.text}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                      >
                        {item.subItems.map((subItem, idx) => (
                          <MenuItem
                            key={idx}
                            component={Link}
                            to={subItem.to}
                            onClick={handleMenuClose}
                          >
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                            {subItem.text}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  );
                }
                return (
                  <Button
                    key={index}
                    component={Link}
                    to={item.to}
                    startIcon={item.icon}
                    sx={{ color: "white", ml: 1 }}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;

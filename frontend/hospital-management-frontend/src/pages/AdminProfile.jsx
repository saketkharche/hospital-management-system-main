import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  PersonAdd,
  Assignment,
  Settings,
} from "@mui/icons-material";
import ViewPatientTable from "../components/tables/ViewPatientTable"; // Patient Table Component
import ViewDoctorTable from "../components/tables/ViewDoctorTable"; // Placeholder
import ViewStaffTable from "../components/tables/ViewStaffTable"; // Placeholder
import ViewNuresTable from "../components/tables/ViewNursesTable"; // Placeholder
import ViewDepartmentTable from "../components/tables/ViewDepartmentTable"; // Placeholder
import ViewLablotryTable from "../components/tables/ViewLablotryTable"; // Placeholder
import ViewAppointmentTable from "../components/tables/ViewAppointmentTable"; // Placeholder
import ViewPatientAdmitTable from "../components/tables/ViewPatientAdmitTable"; // Placeholder
import SettingsComponent from "../components/admin/Settings"; // Settings Component
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { fetchAdminData } from "../services/adminService";

function AdminProfile() {
  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState("manage-patients");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch admin data
  const getAdminData = async () => {
    try {
      const data = await fetchAdminData();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Failed to load admin data. Please log in again.");
      sessionStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const handleSidebarClick = (component) => {
    setActiveComponent(component);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <CssBaseline />
      {/* Top Navbar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LifeBridge Hospital - Admin
          </Typography>
          <Box display="flex" alignItems="center">
            <img
              src="https://cdn1.iconfinder.com/data/icons/doctor-5/100/01-1Patient_1-1024.png"
              alt="Admin"
              className="profile-img"
              style={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                marginRight: "8px",
              }}
            />
            <Typography variant="body1" sx={{ marginRight: "16px" }}>
              {userData.firstName} {userData.lastName}
            </Typography>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar and Main Content Layout */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            position: "fixed",
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              height: "100vh",
              backgroundColor: "#2C3E50",
              color: "#fff",
            },
          }}
        >
          <List sx={{ top: 50 }}>
            <ListItem
              button
              onClick={() => handleSidebarClick("manage-patients")}
              sx={{
                backgroundColor:
                  activeComponent === "manage-patients" ? "#2980B9" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon>
                <PersonAdd style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Patients" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSidebarClick("manage-doctors")}
              sx={{
                backgroundColor:
                  activeComponent === "manage-doctors" ? "#2980B9" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon>
                <Assignment style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Doctors" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSidebarClick("settings")}
              sx={{
                backgroundColor:
                  activeComponent === "settings" ? "#2980B9" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon>
                <Settings style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: "240px",
            padding: "16px",
          }}
        >
          <Container maxWidth="md">
            {activeComponent === "manage-patients" && <ViewPatientTable />}
            {activeComponent === "manage-doctors" && <ViewDoctorTable />}
            {activeComponent === "manage-staff" && <ViewStaffTable />}
            {activeComponent === "manage-nures" && <ViewNuresTable />}
            {activeComponent === "manage-department" && <ViewDepartmentTable />}
            {activeComponent === "manage-lablotry" && <ViewLablotryTable />}
            {activeComponent === "manage-appointment" && <ViewAppointmentTable />}
            {activeComponent === "manage-patientAdmit" && <ViewPatientAdmitTable />}
            {activeComponent === "settings" && <SettingsComponent />}
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default AdminProfile;

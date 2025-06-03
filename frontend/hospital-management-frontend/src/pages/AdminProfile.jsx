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
  CircularProgress,
} from "@mui/material";
import {
  PersonAdd,
  Assignment,
  Settings,
  Group,
  LocalHospital,
  Apartment,
  Science,
  EventNote,
  Hotel,
  Feedback as FeedbackIcon,
} from "@mui/icons-material";

import ViewPatientTable from "../components/tables/ViewPatientTable";
import ViewDoctorTable from "../components/tables/ViewDoctorTable";
import ViewStaffTable from "../components/tables/ViewStaffTable";
import ViewNursesTable from "../components/tables/ViewNursesTable";
import ManagerDepartment from "../components/admin/ManagerDepartment";
import ViewLablotryTable from "../components/admin/ViewLablotryTable"; // ✅ Fixed import path
import AdminViewAppointment from "../components/admin/AdminViewAppointment";
import ViewPatientAdmitTable from "../components/admin/ViewPatientAdmitTableDoc"; // ✅ Fixed import path
import ViewFeedbackTable from "../components/admin/FeedbackList";
import SettingsComponent from "../components/admin/Settings";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { fetchAdminData } from "../services/adminService";

const sidebarItems = [
  {
    key: "manage-patients",
    label: "Manage Patients",
    icon: <PersonAdd style={{ color: "#fff" }} />,
  },
  {
    key: "manage-doctors",
    label: "Manage Doctors",
    icon: <Assignment style={{ color: "#fff" }} />,
  },
  {
    key: "manage-staff",
    label: "Manage Staff",
    icon: <Group style={{ color: "#fff" }} />,
  },
  {
    key: "manage-nurses",
    label: "Manage Nurses",
    icon: <LocalHospital style={{ color: "#fff" }} />,
  },
  {
    key: "manage-department",
    label: "Manage Department",
    icon: <Apartment style={{ color: "#fff" }} />,
  },
  {
    key: "manage-lablotry",
    label: "Manage Laboratory",
    icon: <Science style={{ color: "#fff" }} />,
  },
  {
    key: "manage-appointment",
    label: "Manage Appointment",
    icon: <EventNote style={{ color: "#fff" }} />,
  },
  {
    key: "manage-patientAdmit",
    label: "Manage Patient Admit",
    icon: <Hotel style={{ color: "#fff" }} />,
  },
  {
    key: "view-feedback",
    label: "View Feedback",
    icon: <FeedbackIcon style={{ color: "#fff" }} />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <Settings style={{ color: "#fff" }} />,
  },
];

function AdminProfile() {
  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState("manage-patients");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <CssBaseline />

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LifeBridge Hospital - Admin
          </Typography>
          <Box display="flex" alignItems="center">
            <img
              src="https://cdn1.iconfinder.com/data/icons/doctor-5/100/01-1Patient_1-1024.png"
              alt="Admin"
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

      <Box sx={{ display: "flex" }}>
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
              top: "64px",
            },
          }}
        >
          <List sx={{ mt: 2 }}>
            {sidebarItems.map(({ key, label, icon }) => (
              <ListItem
                button
                key={key}
                onClick={() => handleSidebarClick(key)}
                sx={{
                  backgroundColor:
                    activeComponent === key ? "#2980B9" : "transparent",
                  "&:hover": { backgroundColor: "#34495E" },
                }}
                aria-current={activeComponent === key ? "page" : undefined}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, marginLeft: "240px", padding: "16px", mt: 2 }}
        >
          <Container maxWidth="md">
            {activeComponent === "manage-patients" && <ViewPatientTable />}
            {activeComponent === "manage-doctors" && <ViewDoctorTable />}
            {activeComponent === "manage-staff" && <ViewStaffTable />}
            {activeComponent === "manage-nurses" && <ViewNursesTable />}
            {activeComponent === "manage-department" && <ManagerDepartment />}
            {activeComponent === "manage-lablotry" && (
              <ViewLablotryTable />
            )}{" "}
            {/* ✅ Fixed */}
            {activeComponent === "manage-appointment" && (
              <AdminViewAppointment />
            )}
            {activeComponent === "manage-patientAdmit" && (
              <ViewPatientAdmitTable />
            )}{" "}
            {/* ✅ Fixed */}
            {activeComponent === "view-feedback" && <ViewFeedbackTable />}
            {activeComponent === "settings" && <SettingsComponent />}
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default AdminProfile;

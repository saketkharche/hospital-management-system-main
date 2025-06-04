import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPatient from "./pages/RegisterPatient";
import ForgotPassword from "./pages/ForgotPassword";

// Profiles
import AdminProfile from "./pages/AdminProfile";
import DoctorProfile from "./pages/DoctorProfile";
import PatientProfile from "./pages/PatientProfile";
import NurseProfile from "./pages/NurseProfile";
import StaffProfile from "./pages/StaffProfile";

// Components
import NotFound from "./components/common/NotFound";
import AboutUs from "./components/home/AboutUs.jsx";

// Doctor Section
import AppointmentListDoc from "./components/doctor/ViewAppointmentsDoc.jsx";
import AppointmentDetails from "./components/doctor/AppointmentDetails";
import PrescriptionForm from "./components/doctor/PrescriptionForm";

function App() {
  return (
    <Router basename="/LifeBridgeHospital">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutUs />} />
        {/* Profile Routes */}
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/nurse/profile" element={<NurseProfile />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
        {/* Doctor Functionality Routes */}
        <Route path="/doctor/appointments" element={<AppointmentListDoc />} />
        <Route
          path="/doctor/appointments/:id"
          element={<AppointmentDetails />}
        />
        <Route
          path="/doctor/appointments/:id/prescription"
          element={<PrescriptionForm />}
        />
        <Route
          path="/doctor/prescriptions/new"
          element={<PrescriptionForm />}
        />{" "}
        {/* <-- This is for Sidebar */}
        {/* Fallback for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

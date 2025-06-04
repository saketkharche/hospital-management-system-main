import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./components/common/NotFound";
import RegisterPatient from "./pages/RegisterPatient";
import AdminProfile from "./pages/AdminProfile";
import DoctorProfile from "./pages/DoctorProfile";
import PatientProfile from "./pages/PatientProfile";
import NurseProfile from "./pages/NurseProfile";
import StaffProfile from "./pages/StaffProfile";
import AboutUs from "./components/home/AboutUs.jsx";
import ForgotPassword from "./pages/ForgotPassword";

// Updated imports from components/doctor
import ViewAppointmentsDoc from "./components/doctor/ViewAppointmentsDoc.jsx";
import AppointmentDetails from "./components/doctor/AppointmentDetails";
import PrescriptionForm from "./components/doctor/PrescriptionForm";

function App() {
  return (
    <Router basename="/LifeBridgeHospital">
      {" "}
      {/* Set the basename to match your context path */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/nurse/profile" element={<NurseProfile />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
        <Route path="/about" element={<AboutUs />} />
        {/* Doctor Section */}
        <Route path="/doctor/appointments" element={<ViewAppointmentsDoc />} />
        <Route
          path="/doctor/appointments/:id"
          element={<AppointmentDetails />}
        />
        <Route
          path="/doctor/appointments/:id/prescription"
          element={<PrescriptionForm />}
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
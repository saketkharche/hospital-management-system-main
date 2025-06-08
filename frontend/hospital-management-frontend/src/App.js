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

// Disease & Drug Info
import DiseaseInfo from "./components/diseaseInfo/Dashboard";
import DrugInfo from "./components/drugInfo/DrugInfo"; // <-- Make sure this exists
// Common
import AboutUs from "./components/home/AboutUs";
import NotFound from "./components/common/NotFound";

// Doctor Section
import ViewAppointmentsDoc from "./components/doctor/ViewDoctorAppointments";
import AppointmentDetails from "./components/doctor/AppointmentDetails";
import PrescriptionForm from "./components/doctor/PrescriptionForm";
import DoctorFeedbackList from "./components/doctor/DoctorFeedback";

// Layouts
import DoctorLayout from "./components/doctor/DoctorLayout"; // or correct path

function App() {
  return (
    <Router basename="/LifeBridgeHospital">
      <Routes>
        {/* General */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Info Pages */}
        <Route path="/disease-info" element={<DiseaseInfo />} />
        <Route path="/drug-info" element={<DrugInfo />} />

        {/* Profiles */}
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/nurse/profile" element={<NurseProfile />} />
        <Route path="/staff/profile" element={<StaffProfile />} />

        {/* Doctor Functional Pages */}
        <Route path="/doctor/appointments" element={<ViewAppointmentsDoc />} />
        <Route
          path="/doctor/appointments/:id"
          element={<AppointmentDetails />}
        />
        <Route
          path="/doctor/prescriptions/new"
          element={<PrescriptionForm />}
        />
        <Route
          path="/doctor/appointments/:id/prescription"
          element={<PrescriptionForm />}
        />
        <Route
          path="/doctor/feedback"
          element={
            <DoctorLayout>
              <DoctorFeedbackList />
            </DoctorLayout>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import NotFound from './components/common/NotFound';
import RegisterPatient from './pages/RegisterPatient';
import AdminProfile from './pages/AdminProfile';
import DoctorProfile from './pages/DoctorProfile';
import PatientProfile from './pages/PatientProfile';
import NurseProfile from './pages/NurseProfile';
import StaffProfile from './pages/StaffProfile';

function App() {
  return (
    <Router basename="/LifeBridgeHospital"> {/* Set the basename to match your context path */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/doctor/profile" element={<DoctorProfile/>} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/nurse/profile" element={<NurseProfile />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;                                                          

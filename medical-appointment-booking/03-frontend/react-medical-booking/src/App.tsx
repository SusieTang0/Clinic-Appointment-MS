import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './layouts/DoctorPage/DoctorDashboard';
import { SignUpForm } from './layouts/HomePage/Components/SignUpForm';
import HomePage from './layouts/HomePage/HomePage';
import PatientDashboard from './layouts/PatientPage/PatientDashboard';



const App: React.FC = () => {
  return (
    
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patientPage" element={<PatientDashboard/>} />
          <Route path="/doctorPage" element={<DoctorDashboard />} />
          <Route path='/signUp' element={<SignUpForm/>} />
        </Routes>
    </Router>
  );
};



export default App;

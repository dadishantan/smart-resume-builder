import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ProfileForm from "./components/ProfileForm";
import ResumeGenerator from "./components/ResumeGenerator";
import ProtectedRouteWithProfile from "./components/ProtectedRouteWithProfile";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/generate" element={ <ProtectedRouteWithProfile> <ResumeGenerator /> </ProtectedRouteWithProfile>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
// src/routes/Router.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../utils/Navbar";
import LandingPage from "../pages/LandingPage";
import Footer from "../utils/Footer";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Courses from "../pages/Courses";
import Explore from "../screens/Explore";
import Contact from "../pages/Contact";
import About from "../pages/About";
import ProfessionalLogin from "../auth/ProfessionalLogin";
import Test from "../pages/Test";
import Main from "../pages/Main";
import Sidebar from "../components/Sidebar";

const Router = ({ onLogin }) => {
  // Receive onLogin as a prop
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />{" "}
        {/* Pass onLogin to Login */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/professional-login" element={<ProfessionalLogin />} /> */}
        <Route path="/tutorials" element={<Test />} />
        {/* Main */}
        {/* <Route path="/main" element={<Main />} /> */}
        {/* <Route path="/main" element={<Sidebar />} /> */}


      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

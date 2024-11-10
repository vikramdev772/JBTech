import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

// Import your components
import Home from "../components/admin/Home";
import Assessment from "../components/admin/Assessment";
import Editor from "../components/admin/Editor";
import Data from "../db/Data";


const Dashboard = () =>{
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen relative">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
                 {/* Page Content */}
          <div className="flex-grow p-6 bg-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/data" element={<Data />} /> {/* This matches "/data" */}
              <Route
                path="/mycourses"
                element={<h1 className="text-2xl font-bold text-blue-600">My Courses Page</h1>}
              />
              <Route
                path="/courses"
                element={<h1 className="text-2xl font-bold text-blue-600">Courses Page</h1>}
              />
      
            </Routes>
          </div>
        </div>

        {/* Toggle Button to Open the Sidebar when it's closed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 bg-gray-100 p-2 rounded-full shadow-md z-50"
          >
            <FiMenu className="text-2xl" />
          </button>
        )}
      </div>
    </Router>
  );
};

export default Dashboard;
 
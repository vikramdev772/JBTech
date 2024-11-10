import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Search, LogOut, Bell, Settings, Menu, X } from 'lucide-react';

const GlassButton = ({ children, onClick, variant = "default" }) => {
  const variants = {
    default: "bg-white/10 hover:bg-white/20",
    danger: "bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${variants[variant]} backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 transition-all duration-300`}
    >
      {children}
    </motion.button>
  );
};

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="backdrop-blur-lg bg-black/30 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center p-4">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            >
              JBTech
            </motion.div>

            {/* Search Bar */}
            <div className="relative flex-grow max-w-2xl mx-8">
              <motion.div
                animate={isSearchFocused ? {
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)"
                } : {}}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, tutorials, and more..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/20 transition-all duration-300"
                />
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <GlassButton>
                <Bell className="w-5 h-5 text-gray-300" />
              </GlassButton>

              {/* Settings */}
              <GlassButton>
                <Settings className="w-5 h-5 text-gray-300" />
              </GlassButton>

              {/* Profile */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 px-3 py-1 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="relative">
                  <img
                    src="https://4kwallpapers.com/images/walls/thumbs_v/19136.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-purple-500/50"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                </div>
                <span className="text-white font-medium">jb</span>
              </motion.div>

              {/* Logout Button */}
              <GlassButton variant="danger" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </GlassButton>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden p-4">
            <div className="flex justify-between items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              >
                JBTech
              </motion.div>

              <GlassButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-300" />
                )}
              </GlassButton>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 px-3 py-1 rounded-lg bg-white/5 border border-white/10"
                  >
                    <img
                      src="https://4kwallpapers.com/images/walls/thumbs_v/19136.jpg"
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-purple-500/50"
                    />
                    <span className="text-white font-medium">jb</span>
                  </motion.div>

                  <div className="flex space-x-2">
                    <GlassButton>
                      <Bell className="w-5 h-5 text-gray-300" />
                    </GlassButton>
                    <GlassButton>
                      <Settings className="w-5 h-5 text-gray-300" />
                    </GlassButton>
                    <GlassButton variant="danger" onClick={handleLogout}>
                      <LogOut className="w-5 h-5" />
                    </GlassButton>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Compass, 
  Phone, 
  Info, 
  Book, 
  LogIn,
  Menu,
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const NavLink = ({ to, children, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`relative group px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2
          ${isActive 
            ? 'text-white bg-white/10' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
      >
        <Icon className="w-4 h-4" />
        <span>{children}</span>
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 rounded-lg bg-white/10 -z-10"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", to: "/", icon: Home },
    { name: "Courses", to: "/courses", icon: BookOpen },
    { name: "Explore", to: "/explore", icon: Compass },
    { name: "Contact", to: "/contact", icon: Phone },
    { name: "About", to: "/about", icon: Info },
    { name: "test", to: "/tutorials", icon: Book },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="backdrop-blur-lg bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  JBTech
                </div>
                <Sparkles className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <NavLink key={item.name} to={item.to} icon={item.icon}>
                  {item.name}
                </NavLink>
              ))}
              
              {/* Login Button */}
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center space-x-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden backdrop-blur-lg bg-black/30"
            >
              <div className="px-4 py-6 space-y-3">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group"
                  >
                    <Link
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Login Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center justify-center space-x-2">
                      <LogIn className="w-5 h-5" />
                      <span>Login</span>
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
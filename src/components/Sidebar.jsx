import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { 
  Home, 
  BookOpen, 
  Layers, 
  Code, 
  FileText, 
  Database,
  Menu,
  X,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import "../styles/Sidebar.css";

const MenuItem = ({ icon: Icon, label, to, isActive, isOpen, tooltipId }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="relative"
  >
    <Link
      to={to}
      data-tooltip-id={tooltipId}
      data-tooltip-content={!isOpen ? label : ""}
    >
      <div className={`
        relative group flex items-center gap-3 px-4 py-3 rounded-lg
        transition-all duration-300
        ${isActive 
          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
          : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
        }
      `}>
        {/* Icon Glow */}
        <div className={`
          absolute left-3 w-8 h-8 rounded-full blur-md transition-opacity
          ${isActive ? 'bg-purple-500/20 opacity-100' : 'opacity-0 group-hover:opacity-50'}
        `} />

        {/* Icon */}
        <div className="relative">
          <Icon className="w-5 h-5" />
        </div>

        {/* Label */}
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm font-medium whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute right-2 w-1.5 h-1.5 rounded-full bg-purple-400"
          />
        )}
      </div>
    </Link>
  </motion.div>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { label: "Home", to: "/", icon: Home },
    { label: "My Courses", to: "/mycourses", icon: BookOpen },
    { label: "Courses", to: "/courses", icon: Layers },
    { label: "Editor", to: "/editor", icon: Code },
    { label: "Assessments", to: "/assessment", icon: FileText },
    { label: "Data", to: "/data", icon: Database }
  ];

  // Mobile overlay backdrop
  const Backdrop = ({ onClick }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
    />
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}
      </AnimatePresence>

      <motion.aside
        initial={{ width: isOpen ? "280px" : "88px", x: 0 }}
        animate={{ 
          width: isOpen ? "280px" : "88px",
          x: 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed left-0 h-screen
          backdrop-blur-md bg-black/30
          border-r border-white/10
          flex flex-col
          overflow-hidden z-50
          md:relative
          ${!isOpen && 'md:hover:width-280'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              >
                EduTech Pro
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              {isOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.to}
              {...item}
              isActive={location.pathname === item.to}
              isOpen={isOpen}
              tooltipId={`sidebar-tooltip-${index}`}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <MenuItem
            icon={Settings}
            label="Settings"
            to="/settings"
            isActive={location.pathname === '/settings'}
            isOpen={isOpen}
            tooltipId="settings-tooltip"
          />
          <MenuItem
            icon={LogOut}
            label="Logout"
            to="/logout"
            isActive={false}
            isOpen={isOpen}
            tooltipId="logout-tooltip"
          />
        </div>

        {/* Tooltips */}
        {!isOpen && menuItems.map((item, index) => (
          <Tooltip
            key={index}
            id={`sidebar-tooltip-${index}`}
            place="right"
            effect="solid"
            className="z-[60] !bg-gray-800 !text-white px-3 py-2 rounded-lg shadow-lg border border-white/10"
          />
        ))}
        <Tooltip
          id="settings-tooltip"
          place="right"
          effect="solid"
          className="z-[60] !bg-gray-800 !text-white px-3 py-2 rounded-lg shadow-lg border border-white/10"
        />
        <Tooltip
          id="logout-tooltip"
          place="right"
          effect="solid"
          className="z-[60] !bg-gray-800 !text-white px-3 py-2 rounded-lg shadow-lg border border-white/10"
        />
      </motion.aside>
    </>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Updated for Heroicons v2

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
      className="bg-black text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-xl font-bold"
            >
              <span className="text-blue-400">JB</span>
              <span className="text-purple-500">Tech</span>
            </motion.div>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {['Home', 'Courses', 'Explore', 'Contact', 'About', 'Tutorials'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-white"
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg"
            >
              Login
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black text-white"
        >
          <div className="flex flex-col space-y-4 p-4">
            {['Home', 'Courses', 'Explore', 'Contact', 'About', 'Tutorials'].map((item) => (
              <a key={item} href="#" className="text-gray-300 hover:text-white text-lg">
                {item}
              </a>
            ))}
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg w-full">
              Login
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
      className="bg-black text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-xl font-bold"
            >
              <span className="text-blue-400">CODE</span>
              <span className="text-purple-500">HELP</span>
            </motion.div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-gray-300 hover:text-white"
            >
              Home
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-gray-300 hover:text-white"
            >
              Courses
            </motion.a>
            <motion.div className="relative">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-white"
              >
                Explore
              </motion.a>
              {/* Dropdown Example */}
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-gray-300 hover:text-white"
            >
              Contact
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-gray-300 hover:text-white"
            >
              Articles
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-gray-300 hover:text-white"
            >
              Tutorials
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg"
            >
              Login
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;



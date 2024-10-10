import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfessionalLogin = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-zinc-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-gray-900/20 p-6 rounded-lg shadow-lg"
      >
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <motion.button 
            whileHover={{ rotate: 90 }}
            className="text-white"
          >
            ✕
          </motion.button>
        </div>

        {/* Title */}
        <h2 className="text-xl text-white font-bold mb-4 text-center">Login to your account</h2>

        {/* Buttons */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full mb-4 bg-blue-600 text-white p-3 rounded-lg"
        >
          Login with Password
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full mb-6 bg-blue-500 text-white p-3 rounded-lg"
        >
          Login with OTP
        </motion.button>

        {/* Forgot Password */}
        <div className="text-center mb-4">
          <Link to="/forgot-password" className="text-blue-400 hover:underline">
            Forgot Password
          </Link>
        </div>

        {/* Terms and Privacy */}
        <p className="text-center text-gray-500 text-sm mt-4">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-blue-400 hover:underline">Terms & Conditions</Link> 
          &{' '}
          <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ProfessionalLogin;

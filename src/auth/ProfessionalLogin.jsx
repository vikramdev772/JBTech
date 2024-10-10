import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const ProfessionalLogin = () => {
  const navigate = useNavigate(); // For navigating back

  // State to manage modals visibility
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isRecoverPasswordModalOpen, setIsRecoverPasswordModalOpen] = useState(false);

  // Framer Motion variants for smooth closing animation
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
  };

  // Function to open and close modals
  const handlePasswordModalOpen = () => setIsPasswordModalOpen(true);
  const handlePasswordModalClose = () => setIsPasswordModalOpen(false);
  
  const handleOtpModalOpen = () => setIsOtpModalOpen(true);
  const handleOtpModalClose = () => setIsOtpModalOpen(false);

  const handleRecoverPasswordModalOpen = () => setIsRecoverPasswordModalOpen(true);
  const handleRecoverPasswordModalClose = () => setIsRecoverPasswordModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-zinc-950 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit" // Exit animation when closing
        className="max-w-md w-full bg-gray-900/20 p-6 rounded-lg shadow-lg"
      >
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <motion.button 
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="text-white"
            onClick={() => navigate(-1)} // Navigate back on close
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
          onClick={handlePasswordModalOpen} // Open Password Modal
        >
          Login with Password
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full mb-6 bg-blue-500 text-white p-3 rounded-lg"
          onClick={handleOtpModalOpen} // Open OTP Modal
        >
          Login with OTP
        </motion.button>

        {/* Forgot Password */}
        <div className="text-center mb-4">
          <button onClick={handleRecoverPasswordModalOpen} className="text-blue-400 hover:underline">
            Forgot Password
          </button>
        </div>

        {/* Terms and Privacy */}
        <p className="text-center text-gray-500 text-sm mt-4">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-blue-400 hover:underline">Terms & Conditions</Link> 
          &{' '}
          <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
        </p>
      </motion.div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-sm shadow-xl relative">
            <div className="absolute top-3 right-3">
              <motion.button 
                whileHover={{ rotate: 90 }}
                onClick={handlePasswordModalClose} // Close Password Modal
                className="text-gray-400 hover:text-white transition-all"
              >
                ✕
              </motion.button>
            </div>

            <h2 className="text-lg font-bold text-center text-white mb-6">Login to your account</h2>
            <label className="block text-gray-400 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-full mb-4 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <Link to="/forgot-password" className="text-blue-400 hover:underline text-sm mb-4 block text-right">
              Forgot Password
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full bg-blue-600 text-white p-3 rounded-full"
            >
              Login
            </motion.button>
            <p className="text-center text-gray-500 text-sm mt-4">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-blue-400 hover:underline">Terms & Conditions</Link> 
              &{' '}
              <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      )}

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-sm shadow-xl relative">
            <div className="absolute top-3 right-3">
              <motion.button 
                whileHover={{ rotate: 90 }}
                onClick={handleOtpModalClose} // Close OTP Modal
                className="text-gray-400 hover:text-white transition-all"
              >
                ✕
              </motion.button>
            </div>

            <h2 className="text-lg font-bold text-center text-white mb-6">Verify OTP</h2>
            <label className="block text-gray-400 mb-2">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-full mb-4 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <div className="bg-green-200 text-gray-900 p-2 rounded-lg mb-4">
              We've sent an OTP to your phone/email
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full bg-blue-600 text-white p-3 rounded-full"
            >
              Submit
            </motion.button>
            <p className="text-center text-gray-400 text-sm mt-4">
              Request new OTP in 25 seconds
            </p>
            <p className="text-center text-gray-500 text-sm mt-4">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-blue-400 hover:underline">Terms & Conditions</Link> 
              &{' '}
              <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      )}

      {/* Recover Password Modal */}
      {isRecoverPasswordModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-sm shadow-xl relative">
            <div className="absolute top-3 right-3">
              <motion.button 
                whileHover={{ rotate: 90 }}
                onClick={handleRecoverPasswordModalClose} // Close Recover Password Modal
                className="text-gray-400 hover:text-white transition-all"
              >
                ✕
              </motion.button>
            </div>

            <h2 className="text-lg font-bold text-center text-white mb-6">Recover your password</h2>
            <label className="block text-gray-400 mb-2">Phone number/Email Id</label>
            <input
              type="text"
              placeholder="Enter your phone number or email id"
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-full mb-4 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full bg-blue-600 text-white p-3 rounded-full"
            >
              Reset Password
            </motion.button>
            <p className="text-center text-gray-500 text-sm mt-4">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-blue-400 hover:underline">Terms & Conditions</Link> 
              &{' '}
              <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfessionalLogin;

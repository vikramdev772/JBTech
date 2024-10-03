import React from 'react';
import { motion } from 'framer-motion';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-800 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-gray-900 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl text-white font-semibold mb-6">Secure Access Made Simple</h2>
        <p className="text-gray-400 mb-4">Accessing your account is easy. Pick your preferred login method.</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full mb-4 bg-white text-gray-900 p-3 rounded-lg flex items-center justify-center space-x-2"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full mb-6 bg-gray-800 text-white p-3 rounded-lg flex items-center justify-center space-x-2"
        >
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-5 h-5" />
          <span>Continue with GitHub</span>
        </motion.button>
        
        <p className="text-center text-gray-500 mb-4">OR Register/Login with email</p>
        
        <input
          type="text"
          placeholder="User Name"
          className="w-full mb-4 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 placeholder-gray-500"
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-6 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 placeholder-gray-500"
        />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full bg-purple-600 text-white p-3 rounded-lg"
        >
          Register
        </motion.button>
        
        <p className="text-center text-gray-500 mt-4">
          Already have an account? <a href="#" className="text-purple-500">Login</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { LockKeyhole, Mail, ArrowLeft } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleLoginClick = async () => {
    setIsLoading(true);
    try {
      const validEmail = 'jb@gmail.com';
      const validPassword = 'admin@123';

      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      if (email !== validEmail) {
        setError('Invalid email address.');
        return;
      }

      if (password !== validPassword) {
        setError('Invalid password.');
        return;
      }

      setError('');
      onLogin();
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLoginClick();
    }
  };

  const handleSendOtp = () => {
    if (!forgotEmail) {
      setOtpError('Please enter your registered Gmail address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setOtpError('Please enter a valid Gmail address.');
      return;
    }

    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(generated);
    setOtpError('');
    alert(`OTP has been sent to ${forgotEmail}. (For demo, OTP is ${generated})`);
  };

  const handleVerifyOtp = () => {
    if (otp !== generatedOtp) {
      setOtpError('Invalid OTP. Please try again.');
      return;
    }
    setOtpError('');
    setResetSuccess('OTP verified! You can now reset your password.');
  };

  const handleResetPassword = () => {
    if (!newPassword) {
      setOtpError('Please enter a new password.');
      return;
    }
    alert('Password has been reset successfully.');
    resetForgotPasswordState();
  };

  const resetForgotPasswordState = () => {
    setIsForgotPassword(false);
    setForgotEmail('');
    setOtp('');
    setGeneratedOtp('');
    setNewPassword('');
    setOtpError('');
    setResetSuccess('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-900 via-gray-900 to-black p-4">
      <div className="w-full max-w-md space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            EduTech Pro
          </h1>
          <p className="text-gray-400">Your Gateway to Professional Learning</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {!isForgotPassword ? 'Welcome Back!' : 'Reset Password'}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {!isForgotPassword 
                  ? 'Enter your credentials to access your account' 
                  : 'Follow the steps to reset your password'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isForgotPassword ? (
                <>
                  <div className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Email address"
                        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      />
                    </div>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Password"
                        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handleLoginClick}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="space-y-2 text-center">
                    <button
                      onClick={() => setIsForgotPassword(true)}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Forgot your password?
                    </button>
                    <p className="text-gray-400 text-sm">
                      Don't have an account?{' '}
                      <Link 
                        to="/signup" 
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <Input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />

                  {!generatedOtp && (
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </Button>
                  )}

                  {generatedOtp && (
                    <>
                      <Input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        maxLength={6}
                      />
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={handleVerifyOtp}
                      >
                        Verify OTP
                      </Button>
                    </>
                  )}

                  {resetSuccess && (
                    <>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      />
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={handleResetPassword}
                      >
                        Reset Password
                      </Button>
                    </>
                  )}

                  {otpError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm"
                    >
                      {otpError}
                    </motion.p>
                  )}

                  {resetSuccess && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-500 text-sm"
                    >
                      {resetSuccess}
                    </motion.p>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white"
                    onClick={resetForgotPasswordState}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
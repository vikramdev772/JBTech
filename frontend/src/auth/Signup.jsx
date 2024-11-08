import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { User, Mail, Phone, Calendar, School, MapPin, LockKeyhole } from 'lucide-react';
import axios from 'axios';
import authURL from '../api/authapi';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
    college: '',
    state: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    // College validation
    if (!formData.college.trim()) {
      newErrors.college = 'College name is required';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${authURL}/api/auth/register`, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        college: formData.college,
        state: formData.state,
        password: formData.password
      });

      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-900 via-gray-900 to-black p-4">
      <div className="w-full max-w-md space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 mb-8"
        >
          {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            EduTech Pro
          </h1> */}
          <p className="text-gray-400">Start Your Learning Journey Today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Create Account</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your details to register for an account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Username Input */}
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="pl-10"
                    error={errors.username}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                {/* Email Input */}
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="pl-10"
                    error={errors.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="pl-10"
                    error={errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Date of Birth Input */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="pl-10"
                    error={errors.dob}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                  )}
                </div>

                {/* College Input */}
                <div className="relative">
                  <School className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="College name"
                    className="pl-10"
                    error={errors.college}
                  />
                  {errors.college && (
                    <p className="text-red-500 text-sm mt-1">{errors.college}</p>
                  )}
                </div>

                {/* State Input */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="pl-10"
                    error={errors.state}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                {/* Password Input */}
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="pl-10"
                    error={errors.password}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="pl-10"
                    error={errors.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <p className="text-center text-gray-400 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
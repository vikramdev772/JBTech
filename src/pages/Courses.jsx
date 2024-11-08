import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import mern from "../images/MERN.webp";
import Java from "../images/JavaFs.png";
import Dsa from "../images/Dsa.jpg";
import Flutter from "../images/flutter.jpg";
import py from "../images/python.png";
import ReactNative from "../images/react.png";

const CourseCard = ({ course, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
    <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm bg-gray-900/50 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={course.imgSrc}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {course.tag && (
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{course.tag}</span>
            </motion.div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all">
          {course.title}
        </h2>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>4 months</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>500+ enrolled</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-gray-400 text-sm line-through">{course.originalPrice}</p>
              <p className="text-2xl font-bold text-white">{course.price}</p>
            </div>
            <div className="bg-green-500/10 px-3 py-1 rounded-full">
              <p className="text-green-400 text-sm font-semibold">{course.discount}</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
            <span className="text-gray-400 text-sm ml-2">(4.8)</span>
          </div>
        </div>

        {/* Enroll Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 group"
        >
          <span>Enroll Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const Courses = () => {
  const coursesData = [
    {
      id: 1,
      title: 'Data Structures & Algorithms ',
      price: '₹8499',
      originalPrice: '₹15000',
      discount: '50% off',
      imgSrc: Dsa,
      tag: 'New',
    },
    {
      id: 2,
      title: 'Java Full Stack BootCamp',
      price: '₹21999',
      originalPrice: '₹28000',
      discount: '57% off',
      imgSrc: Java,
    },
    {
      id: 3,
      title: 'Web Development Master Course',
      price: '₹24999',
      originalPrice: '₹29999',
      discount: '50% off',
      imgSrc: mern,
    },
    {
      id: 4,
      title: 'Flutter BootCamp',
      price: '₹21999',
      originalPrice: '₹28000',
      discount: '57% off',
      imgSrc: Flutter,
    },
    {
      id: 5,
      title: 'React Native',
      price: '₹21999',
      originalPrice: '₹28000',
      discount: '57% off',
      imgSrc: ReactNative,
    },
    {
      id: 6,
      title: 'Python Full Stack',
      price: '₹21999',
      originalPrice: '₹28000',
      discount: '57% off',
      imgSrc: py,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <BookOpen className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 text-sm">Transform Your Career</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            What would you like to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              learn?
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Choose from our comprehensive selection of courses designed to help you master the skills you need for success.
          </motion.p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
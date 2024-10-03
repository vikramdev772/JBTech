import React from 'react';
import { motion } from 'framer-motion';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Data Structures & Algorithms BootCamp ',
      price: '₹8499',
      originalPrice: '₹15000',
      discount: '50% off',
      imgSrc: 'path/to/image1.png',
      tag: 'New',
    },
    {
      id: 2,
      title: 'Java Full Stack BootCamp ',
      price: '₹21999',
      originalPrice: '₹28000',
      discount: '57% off',
      imgSrc: 'path/to/image2.png',
      transparent: true, // Make this course card background semi-transparent
    },
    {
      id: 3,
      title: 'Web Development Master Course ',
      price: '₹24999',
      originalPrice: '₹29999',
      discount: '50% off',
      imgSrc: 'path/to/image3.png',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8 mb-12">What would you like to <span className="text-blue-400">learn?</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-lg shadow-lg w-full max-w-xs mx-auto ${course.transparent ? 'bg-gray-800/50' : 'bg-gray-800'}`}
          >
            {course.tag && (
              <div className="bg-purple-500 text-xs text-white px-2 py-1 rounded-full absolute top-4 left-4">
                {course.tag}
              </div>
            )}
            <img
              src={course.imgSrc}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-400 line-through">{course.originalPrice}</p>
            <p className="text-xl font-bold">{course.price}</p>
            <div className="text-green-400 font-semibold">{course.discount}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Linkedin, 
  Github, 
  Twitter,
  Quote,
  Sparkles,
  Users,
  GraduationCap
} from 'lucide-react';
import ceo from '../images/Chaithanya.jpg';
import founder from '../images/Vali.jpg';
import sde from '../images/Vikram.png';

const instructors = [
  {
    name: 'T. Chaithanya',
    title: 'CEO, Flutter App Development Instructor',
    description: 'Chiythanaya is the CEO and a seasoned Flutter app development instructor. With years of experience in building cross-platform mobile applications, he has helped many developers master Flutter. His teaching style is highly appreciated for simplifying complex concepts.',
    image: ceo,
    expertise: ['Flutter', 'Dart', 'Mobile Development'],
    experience: '8+ years',
    students: '1000+',
  },
  {
    name: 'Muhammad Vali',
    title: 'Founder, Java Fullstack Instructor',
    description: 'Muhammad Vali is the founder and a highly skilled Java Fullstack instructor. He is known for his expertise in backend and frontend development, with a strong focus on Java technologies. He has mentored numerous students and working professionals to become proficient in full-stack Java development.',
    image: founder,
    expertise: ['Java', 'Spring Boot', 'Microservices'],
    experience: '10+ years',
    students: '2000+',
  },
  {
    name: 'Vikram',
    title: 'Project Manager, Fullstack Instructor',
    description: 'Vikram is a senior software engineer with a passion for MERN stack. He has been working on js-related projects for the past five years, and he is a highly skilled instructor. His teaching style is characterized by simplicity and clarity, making it easy for beginners to grasp the concepts.',
    image: sde,
    expertise: ['MERN Stack', 'JavaScript', 'React'],
    experience: '5+ years',
    students: '800+',
  },
  {
    name: 'Shaziya Sultana',
    title: 'HR Manager',
    description: 'Shaziya Sultana is the HR Manager at JB. She is responsible for managing the recruitment process, employee relations, and other HR-related activities. She is a people person and is known for her friendly and approachable nature.',
    image: "https://cdn-icons-png.flaticon.com/128/4140/4140060.png",
    expertise: ['HR Management', 'Recruitment', 'Employee Relations'],
    experience: '4+ years',
    students: '500+',
  }
];

const NavigationButton = ({ onClick, icon: Icon, direction }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`
      absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? '-left-16' : '-right-16'}
      p-3 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 
      text-white hover:bg-white/20 transition-colors
      hidden lg:flex items-center justify-center
    `}
  >
    <Icon className="w-6 h-6" />
  </motion.button>
);

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % instructors.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + instructors.length) % instructors.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <Users className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 text-sm">Meet Our Team</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Learn from the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Industry Experts
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Discover brilliance in code with our expert instructors. Passionate mentors dedicated to fueling your coding journey at JB.
          </motion.p>
        </div>

        {/* Instructor Showcase */}
        <div className="relative max-w-4xl mx-auto">
          <NavigationButton onClick={handlePrev} icon={ChevronLeft} direction="left" />
          <NavigationButton onClick={handleNext} icon={ChevronRight} direction="right" />
          
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="relative backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="relative p-8 md:p-12">
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-purple-500/20" />
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Image Section */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden border-2 border-white/10">
                      <img
                        src={instructors[currentIndex].image}
                        alt={instructors[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <div className="px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 text-sm">
                        <div className="text-purple-400">{instructors[currentIndex].experience}</div>
                        <div className="text-xs text-gray-400">Experience</div>
                      </div>
                      <div className="px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 text-sm">
                        <div className="text-purple-400">{instructors[currentIndex].students}</div>
                        <div className="text-xs text-gray-400">Students</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        {instructors[currentIndex].name}
                      </h3>
                      <p className="text-gray-400 mt-1">{instructors[currentIndex].title}</p>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      {instructors[currentIndex].description}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2">
                      {instructors[currentIndex].expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-4">
                      {[Linkedin, Github, Twitter].map((Icon, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
                        >
                          <Icon className="w-5 h-5" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation */}
          <div className="flex justify-center mt-8 space-x-4 lg:hidden">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full backdrop-blur-sm bg-white/10 border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full backdrop-blur-sm bg-white/10 border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
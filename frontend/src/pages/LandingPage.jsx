import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Users, ChevronRight, Code, Brain, BookOpen, Terminal, Sparkles } from 'lucide-react';
import EmpowermentSection from './EmpowermentSection';

const GlassCard = ({ children, className = '' }) => (
  <div className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

const FeatureButton = ({ icon: Icon, text }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group relative backdrop-blur-lg bg-white/5 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative flex items-center space-x-2">
      <Icon className="w-5 h-5 text-purple-400" />
      <span className="text-gray-200 group-hover:text-white">{text}</span>
    </div>
  </motion.button>
);

const LandingPage = () => {
  const features = [
    { icon: Code, text: 'Web Dev' },
    { icon: Terminal, text: 'App Dev' },
    { icon: BookOpen, text: 'JAVA FS' },
    { icon: Brain, text: 'MERN' },
    { icon: Terminal, text: 'Dev Challenges' },
    { icon: Users, text: 'Interview Prep' },
    { icon: Brain, text: 'Mock Tests' },
    { icon: BookOpen, text: 'Core CS' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-20 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-20 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center px-4 py-2 mb-6 rounded-full backdrop-blur-lg bg-white/5 border border-white/10 w-fit"
              >
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-white/80">Trusted by 5000+ Students</span>
              </motion.div>

              <GlassCard className="p-8 mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Crack the Code to Success with{' '}
                  <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
                    JBTech
                  </span>
                </h1>

                <p className="text-white/70 text-lg mb-8">
                  Master your programming skills, solve real-world challenges, and unlock endless opportunities in the world of coding.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center group"
                  >
                    Get Started Now
                    <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center"
                  >
                    <Play className="w-5 h-5 mr-2 text-red-500" />
                    Watch Demo
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </GlassCard>

              {/* Social Proof */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.img
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${i}`}
                        alt={`student-${i + 1}`}
                        className="w-12 h-12 rounded-full border-2 border-black/50 backdrop-blur-sm"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      5,000+
                    </span>
                    <span className="text-white/70">Active Learners</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Right Side Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <FeatureButton icon={feature.icon} text={feature.text} />
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Empowerment Section */}
      <div className="relative">
        <GlassCard className="bg-black/30">
          <EmpowermentSection />
        </GlassCard>
      </div>
    </div>
  );
};

export default LandingPage;
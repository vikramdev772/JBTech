import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Target, ArrowRight, Sparkles, Users, Brain, Trophy } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="group relative"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
    <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className={`flex items-center justify-center ${color} rounded-xl h-12 w-12 shrink-0`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all">
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const EmpowermentSection = () => {
  const features = [
    {
      icon: Rocket,
      title: "Accelerate Your Growth",
      description: "Launch your tech career with expertly designed courses and mentorship from industry leaders.",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      delay: 0.2
    },
    {
      icon: Code,
      title: "Hands-On Learning",
      description: "Build real-world projects using cutting-edge technologies and industry best practices.",
      color: "bg-gradient-to-r from-orange-500 to-red-600",
      delay: 0.3
    },
    {
      icon: Trophy,
      title: "Achieve Excellence",
      description: "Master in-demand skills and stand out in the competitive tech industry landscape.",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
      delay: 0.4
    }
  ];

  return (
    <div className="relative overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-400">Transform Your Future</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Empowering Coders,
              </span>
              <br />
              <span className="text-white">
                Enabling Innovation
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Discover the limitless possibilities of coding with JBTech, a community-driven platform 
              designed to upskill coders of all experience levels. Learn from the best and take your 
              career to new heights.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center space-x-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Join Community</span>
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "5K+", label: "Students" },
                { value: "50+", label: "Courses" },
                { value: "95%", label: "Success Rate" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpowermentSection;
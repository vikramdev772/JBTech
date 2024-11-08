import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Send, 
  MessageSquare, 
  User, 
  FileText,
  Linkedin,
  Youtube,
  MessageCircle,
  Globe,
  MapPin,
  Clock
} from 'lucide-react';

const InputField = ({ icon: Icon, label, type = "text", ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        className="block w-full pl-10 px-4 py-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
        {...props}
      />
    </div>
  </div>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </motion.a>
);

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <MessageCircle className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 text-sm">Get in Touch</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Let's Start a
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {' '}Conversation
            </span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative backdrop-blur-sm bg-black/30 border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField
                    icon={User}
                    label="Name"
                    placeholder="Enter your name"
                    required
                  />
                  <InputField
                    icon={Mail}
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField
                    icon={Phone}
                    label="Phone"
                    placeholder="Enter your phone"
                    required
                  />
                  <InputField
                    icon={FileText}
                    label="Subject"
                    placeholder="Enter subject"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      rows="4"
                      className="block w-full pl-10 px-4 py-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      placeholder="Enter your message"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info Card */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-white">mahammedvali2966@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white">Hyderabad, India</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Clock className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">Working Hours</p>
                    <p className="text-white">Mon - Fri, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Connect With Us</h3>
              <div className="flex space-x-4">
                <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
                <SocialLink href="#" icon={Youtube} label="YouTube" />
                <SocialLink href="#" icon={MessageCircle} label="Discord" />
                <SocialLink href="#" icon={Globe} label="Website" />
              </div>
            </div>

            {/* Map or Additional Info */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="aspect-video rounded-lg bg-white/5 flex items-center justify-center">
                <Globe className="h-12 w-12 text-gray-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
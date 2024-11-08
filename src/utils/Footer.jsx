import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronRight,
  Send,
  Heart,
} from "lucide-react";

const SocialButton = ({ icon: Icon, href, label }) => (
  <motion.a
    href={href}
    aria-label={label}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="p-2 rounded-full bg-gray-50/10 border border-gray-200 hover:bg-gray-50/20 transition-colors"
  >
    <Icon className="w-5 h-5 text-gray-200" />
  </motion.a>
);

const FooterLink = ({ to, children }) => (
  <motion.li whileHover={{ x: 5 }} className="flex items-center">
    <ChevronRight className="w-4 h-4 mr-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    <Link
      to={to}
      className="group text-gray-400 hover:text-white transition-colors flex items-center"
    >
      {children}
    </Link>
  </motion.li>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full filter blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              >
                JBTech
              </motion.h1>
              <p className="text-gray-400 leading-relaxed">
                Your gateway to mastering coding challenges and technical
                skills. Join us to excel in Web, App development, and beyond.
              </p>
              {/* Newsletter */}
              <div className="relative mt-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-14 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                />
                <motion.button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-400">
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Quick Links</h2>
              <ul className="space-y-3">
                {[
                  { name: "Home", to: "/" },
                  { name: "Courses", to: "/courses" },
                  { name: "Explore", to: "/explore" },
                  { name: "Contact", to: "/contact" },
                  { name: "About", to: "/about" },
                ].map((link) => (
                  <FooterLink key={link.name} to={link.to}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Contact Us</h2>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>mahammedvali2966@gmail.com</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>9676406367</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>Hyderabad, India</span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-200">Follow Us</h2>
              <div className="flex space-x-4">
                <SocialButton icon={Facebook} href="#" label="Facebook" />
                <SocialButton icon={Twitter} href="#" label="Twitter" />
                <SocialButton icon={Linkedin} href="#" label="LinkedIn" />
                <SocialButton icon={Globe} href="#" label="Website" />
              </div>

              <div className="pt-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-white font-medium mb-2">Working Hours</h3>
                  <p className="text-gray-400 text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; {new Date().getFullYear()} JBTech. All rights reserved.
              </p>
              <div className="flex items-center text-gray-400 text-sm">
                Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by
                JBTech Team
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

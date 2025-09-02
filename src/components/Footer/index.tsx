"use client";
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { logo } from "../../../public/assets";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our News", href: "/news" },
    { label: "Our Campaign", href: "/campaign" },
    { label: "FAQ", href: "/faq" },
    { label: "Get A Quote", href: "/quote" },
  ];

  const services = [
    { label: "Our Causes", href: "/causes" },
    { label: "Education Support", href: "/education" },
    { label: "Our Campaign", href: "/campaign" },
    { label: "Food Support", href: "/food" },
    { label: "Health Support", href: "/health" },
  ];

  const socialIcons = [
    { icon: "fa6-brands:facebook-f", label: "Facebook", link: "#" },
    { icon: "simple-icons:vimeo", label: "Vimeo", link: "#" },
    { icon: "fa6-brands:twitter", label: "Twitter", link: "#" },
    { icon: "fa6-brands:linkedin-in", label: "LinkedIn", link: "#" },
  ];

  return (
    <footer className="w-full bg-[#1A3635] text-white">
      {/* Newsletter Section */}
     <div className="max-w-7xl mx-auto px-6 py-12 border-b border-gray-600">
  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-6">
    
    {/* Left Side */}
    <div className="flex items-start space-x-4 w-full lg:w-auto">
      <div className="relative flex-shrink-0">
        <Icon 
          icon="mdi:heart-outline" 
          className="w-12 h-12 text-yellow-400 absolute -top-2 -left-2" 
        />
      </div>
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-2">Subscribe To Our Newsletter</h3>
        <p className="text-gray-300 text-sm sm:text-lg">Regular Inspections And Feedback Mechanisms</p>
      </div>
    </div>

    {/* Right Side - Newsletter Form */}
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col sm:flex-row items-stretch sm:items-center w-full lg:w-auto space-y-3 sm:space-y-0 sm:space-x-3"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:min-w-[300px]"
        required
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 sm:py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center sm:justify-center space-x-2 w-full sm:w-auto"
      >
        <Icon icon="mdi:send" className="w-5 h-5" />
        <span className="hidden sm:inline">Subscribe</span>
      </motion.button>
    </form>

  </div>
</div>


      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Charifund */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src={logo.src} alt="Charifund Logo" className="h-10" />
              <span className="text-2xl font-bold">Charifund</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Our Secure Online Donation Platform Allows You To Make Contributions Quickly And Safely. Choose From Various.
            </p>
            <div className="flex items-center space-x-4">
              {socialIcons.map(({ icon, label, link }) => (
                <motion.a
                  key={label}
                  href={link}
                  aria-label={label}
                  whileHover={{ scale: 1.1, color: "#F3BB11" }}
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-200"
                >
                  <Icon icon={icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold mb-3">Quick Links</h4>
              <div className="w-12 h-1 bg-yellow-400 rounded"></div>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: "#F3BB11" }}
                    className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                    <span>{link.label}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold mb-3">Our Services</h4>
              <div className="w-12 h-1 bg-yellow-400 rounded"></div>
            </div>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <motion.a
                    href={service.href}
                    whileHover={{ x: 5, color: "#F3BB11" }}
                    className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                    <span>{service.label}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="space-y-6 relative">
            <div>
              <h4 className="text-xl font-bold mb-3">Get In Touch</h4>
              <div className="w-12 h-1 bg-yellow-400 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon icon="mdi:map-marker" className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  455 west orchard street kings mountain, nc 280867
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="mdi:phone" className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">+088 (246) 642-27-10</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="mdi:email" className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">example@email.com</span>
              </div>
            </div>
            
            {/* Decorative Heart */}
            <div className="absolute -bottom-4 -right-4 opacity-10">
              <Icon icon="mdi:heart-outline" className="w-32 h-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute -top-6 right-6 w-12 h-12 bg-[#12322D] rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-200 shadow-lg"
        >
          <Icon icon="mdi:chevron-up" className="w-6 h-6" />
        </motion.button>
      </div>

    
    </footer>
  );
};

export default Footer;



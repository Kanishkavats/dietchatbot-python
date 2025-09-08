"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const BecomeVolunteer: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      

      {/* Three Panel Layout */}
      <div className="flex h-full relative">
        {/* Left Panel - Volunteer Section */}
        <div className="flex-1 relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/becomevolunter/becomevolunter.png')" }}
          >
            <div className="absolute inset-0 bg-black/55"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
            {/* Heart Icon */}
            <div className="mb-4">
              <Image 
                src="/assets/becomevolunter/icon.png" 
                alt="Hand Heart Icon" 
                width={60} 
                height={60} 
                className="w-12 h-12"
              />
            </div>
            
            {/* Text Content */}
            <p className="text-white text-sm mb-2">We Give Child A Gift Of A Education</p>
            <h3 className="text-white text-3xl font-bold mb-8" style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '700'}}>Become A Volunteer?</h3>
            
            {/* Contact Button */}
            <button className="bg-teal-700 hover:bg-yellow-400 hover:text-black text-white px-8 py-5 rounded-full font-medium transition-colors">
              Contact Now
            </button>
          </div>
          
          {/* Jagged Border Right */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow-400" style={{
            clipPath: 'polygon(0 0, 100% 10%, 0 20%, 100% 30%, 0 40%, 100% 50%, 0 60%, 100% 70%, 0 80%, 100% 90%, 0 100%)'
          }}></div>
        </div>

        {/* Middle Panel - Video Section */}
        <div className="flex-1 relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/becomevolunter/videobg.png')" }}
          ></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            {/* Navigation Dots */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-green-300 rounded-full mb-2"></div>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <div className="w-3 h-3 bg-green-300 rounded-full mb-2"></div>
            </div>
            
            {/* Play Button */}
            <div className="relative">
              <motion.div 
                className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center relative cursor-pointer"
                style={{
                  border: '2px dashed #000000',
                  boxShadow: '0 0 0 0 rgba(11, 10, 7, 0.7)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(6, 6, 4, 0.7)',
                    '0 0 0 20px rgba(255, 193, 7, 0)',
                    '0 0 0 0 rgba(255, 193, 7, 0)'
                  ]
                }}
                transition={{
                  duration: 3,
                  ease: 'linear',
                  delay: 2,
                  repeat: Infinity
                }}
                onClick={openVideoModal}
              >
               
                <div 
                  className="w-0 h-0 border-l-[16px] border-l-black-800 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"
                ></div>
              </motion.div>
            </div>
          </div>
          
          {/* Jagged Border Right */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow-400" style={{
            clipPath: 'polygon(0 0, 100% 10%, 0 20%, 100% 30%, 0 40%, 100% 50%, 0 60%, 100% 70%, 0 80%, 100% 90%, 0 100%)'
          }}></div>
        </div>

        {/* Right Panel - Donation Section */}
        <div className="flex-1 relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/banner-bg.png')" }}
          >
            <div className="absolute inset-0 bg-teal-600/60"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
            {/* Heart Icon */}
            <div className="mb-4">
              <Image 
                src="/assets/becomevolunter/icon.png" 
                alt="Hand Heart Icon" 
                width={60} 
                height={60} 
                className="w-12 h-12"
              />
            </div>
            
            {/* Text Content */}
            <p className="text-white text-sm mb-2">We Give Child A Gift Of A Education</p>
            <h3 className="text-white text-3xl font-bold mb-8"style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '700'}}>Make Donation To Us?</h3>
            
            {/* Donate Button */}
            <button className="bg-yellow-400 hover:bg-teal-700 hover:text-white text-black px-8 py-5 rounded-full font-medium transition-colors">
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-4xl mx-4">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-gray-300 transition-colors"
            >
              ×
            </button>
            
            {/* Video Container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/XxVg_s8xAms?si=0UwTlJoWAMUgT34S&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      
    </section>
  );
};

export default BecomeVolunteer;

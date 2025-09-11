"use client";

import React, { useState, useRef } from 'react';
import { motion , useInView} from 'framer-motion';
import Image from 'next/image';

const BecomeVolunteer: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const leftPanelInView = useInView(leftPanelRef, { once: true });
  const rightPanelInView = useInView(rightPanelRef, { once: true });

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
          <div ref={leftPanelRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
            {/* Heart Icon */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              animate={leftPanelInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Image 
                src="/assets/becomevolunter/icon.png" 
                alt="Hand Heart Icon" 
                width={60} 
                height={60} 
                className="w-12 h-12"
              />
            </motion.div>
            
            {/* Text Content */}
            <motion.p 
              className="text-white text-sm mb-2"
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              animate={leftPanelInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              We Give Child A Gift Of A Education
            </motion.p>
            <motion.h3 
              className="text-white text-3xl font-bold mb-8" 
              style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '700'}}
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              animate={leftPanelInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            >
              Become A Volunteer?
            </motion.h3>
            
            {/* Contact Button */}
            <motion.button 
              className="bg-green hover:bg-yellow-50 hover:text-black text-white px-8 py-5 rounded-full font-medium transition-colors"
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              animate={leftPanelInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            >
              Contact Now
            </motion.button>
          </div>
          
          {/* Jagged Border Right */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow" style={{
            clipPath: 'polygon(0 0, 100% 5%, 0 12%, 100% 18%, 0 25%, 100% 35%, 0 42%, 100% 48%, 0 55%, 100% 62%, 0 68%, 100% 75%, 0 82%, 100% 88%, 0 95%, 100% 100%)'
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

            
            {/* Play Button */}
            <div className="relative">
              <motion.div 
                className="w-20 h-20 bg-yellow rounded-full flex items-center justify-center relative cursor-pointer"
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
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow" style={{
            clipPath: 'polygon(0 0, 100% 5%, 0 12%, 100% 18%, 0 25%, 100% 35%, 0 42%, 100% 48%, 0 55%, 100% 62%, 0 68%, 100% 75%, 0 82%, 100% 88%, 0 95%, 100% 100%)'
          }}></div>
        </div>

        {/* Right Panel - Donation Section */}
        <div className="flex-1 relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/banner-bg.png')" }}
          >
            <div className="absolute inset-0 bg-teal-600/55"></div>
          </div>
          
          {/* Content */}
          <div ref={rightPanelRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
            {/* Heart Icon */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              animate={rightPanelInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Image 
                src="/assets/becomevolunter/icon.png" 
                alt="Hand Heart Icon" 
                width={60} 
                height={60} 
                className="w-12 h-12"
              />
            </motion.div>
            
            {/* Text Content */}
            <motion.p 
              className="text-white text-sm mb-2"
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              animate={rightPanelInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              We Give Child A Gift Of A Education
            </motion.p>
            <motion.h3 
              className="text-white text-3xl font-bold mb-8"
              style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '700'}}
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              animate={rightPanelInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            >
              Make Donation To Us?
            </motion.h3>
            
            {/* Donate Button */}
            <motion.button 
              className="bg-yellow-50 hover:bg-green hover:text-white text-black px-8 py-5 rounded-full font-medium transition-colors"
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              animate={rightPanelInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            >
              Donate Now
            </motion.button>
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

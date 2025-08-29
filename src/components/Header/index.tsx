'use client';

import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import InfoBar from './InfoBar';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-background transition-all duration-300">
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>

      <div className="px-2 pt-17 md:px-15 md:pt-13">
        <InfoBar />

        {/* First Navbar - visible when not scrolled */}
        {!scrolled && (
          <div className="transition-opacity duration-300">
            <Navbar />
          </div>
        )}

        {/* Second Navbar - animated with framer-motion when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="scrolled-navbar"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="fixed top-13 left-0 right-0 bg-palate-white shadow-md z-50"
            >
              <Navbar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;

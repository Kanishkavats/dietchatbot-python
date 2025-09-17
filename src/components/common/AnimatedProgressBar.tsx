"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedProgressBarProps {
  progress: number;
  isInView: boolean;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({ progress, isInView }) => {
  const [displayProgress, setDisplayProgress] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, progress]);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Donation</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {displayProgress}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div 
          className="bg-yellow-400 h-2 rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${progress}%` : 0 }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.2
          }}
          style={{
            background: 'linear-gradient(90deg, #FBBF24 0%, #F59E0B 50%, #FBBF24 100%)',
            backgroundSize: '200% 100%'
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{
              x: isInView ? ['0%', '100%'] : '0%',
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;

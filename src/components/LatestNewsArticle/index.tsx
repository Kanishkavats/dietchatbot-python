'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaComment,
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa';
import { newsData, NewsItem } from '../../staticResource';

const LatestNewsArticle: React.FC = () => {

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  interface NewsCardProps extends NewsItem {
    index: number;
  }

  const NewsCard: React.FC<NewsCardProps> = ({ img, category, categoryIcon, title, author, comments, index }) => (
    <motion.div
      className="bg-white hover:bg-green rounded-2xl shadow-lg overflow-hidden group relative p-5 flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.2 }}
      {...(index === 0 && {
        initial: { opacity: 0, transform: "translateZ(0)" },
        whileInView: { opacity: 1, transform: "translateZ(0)" },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 1 }
      })}
      {...(index === 1 && {
        initial: { opacity: 0, transform: "translateZ(0)" },
        whileInView: { opacity: 1, transform: "translateZ(0)" },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 1, delay: 0.3 }
      })}
      {...(index === 2 && {
        initial: { opacity: 0, transform: "translateZ(0)" },
        whileInView: { opacity: 1, transform: "translateZ(0)" },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 1, delay: 0.6 }
      })}
    >
      <div className="relative mb-4 rounded-xl overflow-hidden w-full h-72">
        <motion.img
          src={img}
          alt="News"
          className="absolute top-0 left-0 w-full h-full object-cover"
          whileHover={{ scale: 1.1, rotate: -3 }}
          transition={{ duration: 0.4 }}
        />
        <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <span className="text-xs">{categoryIcon}</span>
          {category}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-6 text-sm mb-3 text-gray-600 group-hover:text-white transition-colors">
          <span className="flex items-center gap-2">
            <FaUser size={18} className="text-yellow-500" />
            {author}
          </span>
          <span className="flex items-center gap-2">
            <FaComment size={18} className="text-yellow-500" />
            Comments ({comments})
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug mb-3 text-gray-800 group-hover:text-white transition-colors">{title}</h3>
      </div>

      <div className="flex items-center gap-2 relative">
        <a
          href="#"
          className="font-[Nunito,sans-serif] text-[14px] text-[#064E3B] font-bold hover:text-yellow-500 transition-colors flex items-center gap-2"
        >
          Read More
          <FaArrowRight className="text-[#064E3B]" />
        </a>

        <motion.div
          className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src="/heart.png" alt="heart-bg" className="w-16 h-16 opacity-90" />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div 
      className='w-full py-20 px-4 mt-20 relative'
      style={{
        backgroundImage: 'url("/assets/section3/bgsection3.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/4"></div>
      
      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header Section */}
        <div className='text-center mb-16 relative'>
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, transform: "translateZ(0)" }}
            whileInView={{ opacity: 1, transform: "translateZ(0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <i className="text-xl text-[var(--green)] hand-icon"></i>
            <span className="text-[#046b59] text-2xl font-caveat font-semibold">Start Donating Poor People</span>
          </motion.div>
          
          <motion.h2 
            className='text-4xl lg:text-6xl font-nunito font-extrabold text-[#122f2a] leading-tight mb-4'
            initial={{ opacity: 0, transform: "translateZ(0)" }}
            whileInView={{ opacity: 1, transform: "translateZ(0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Our Latest <span className="text-[#ffc107]">News</span> & Articles <br/>You Like
          </motion.h2>

          {/* Animated Heart */}
          <motion.div
            className="absolute top-0 right-0 lg:left-8"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/assets/yellowspade.png"
              alt="heart"
              width={120}
              height={120}
              className="w-20 h-20 lg:w-32 lg:h-32"
            />
          </motion.div>
        </div>

        {/* News Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {newsData.map((card, index) => (
            <NewsCard key={index} {...card} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="bg-[#ffc107] text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-[var(--green)] hover:text-white transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            View All
            <FaArrowUp className="text-black hover:text-white transition-colors" />
          </button>
        </motion.div>

        {/* Decorative dot */}
        <motion.div 
          className="absolute top-1/2 right-8 w-3 h-3 bg-[#3AB19B] rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default LatestNewsArticle;

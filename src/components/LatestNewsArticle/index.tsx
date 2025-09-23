'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaComment,
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa';
import Button from '../common/Buttons/Button';
import { newsData, NewsItem } from '../../staticResource';
import NewsGrid from '../Latestnews/NewsGrid';
import { useFetchAllBlogs } from '@/src/hooks/useBlog';
const PageLimit=3;
const LatestNewsArticle: React.FC = () => {

 const [currentPage,setCurrentPage]=useState(1);
    const { data, isLoading, isError } = useFetchAllBlogs(currentPage, PageLimit);
    if (isLoading) {
      return <p className="text-center">Loading blogs...</p>;
    }
  
    if (isError) {
      return <p className="text-center text-red">Failed to fetch blogs.</p>;
    }

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
            className="absolute top-14 right-0 lg:left-8"
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
              className="w-20 h-20 lg:w-50 lg:h-50"
            />
          </motion.div>
        </div>

        {/* News Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' >
          <NewsGrid cards={data?.blogs}/>
        </div>

        {/* View All Button */}
        <motion.div 
          className="flex justify-center mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/newslist">
            <Button 
              text="View All"
              bgColor="bg-[#ffc107]"
              textColor="text-black"
              hoverTextColor="group-hover:text-white"
              hoverBg="before:bg-[var(--green)]"
              icon="mdi:arrow-up"
              paddingx="px-8"
              paddingy="py-4"
            />
          </Link>
        </motion.div>

        
      </div>
    </div>
  );
};

export default LatestNewsArticle;

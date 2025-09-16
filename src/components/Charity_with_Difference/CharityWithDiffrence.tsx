'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CharityCard from './CharityCard';
import { charityCards } from '../../staticResource';
import { hand } from '@/public/assets';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function CharityWithDifference() {
  // Animation refs
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="min-h-screen bg-white py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16 relative z-10">
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, transform: 'translateZ(0)' }}
            animate={isHeaderInView ? { opacity: 1, transform: 'translateZ(0)' } : { opacity: 0, transform: 'translateZ(0)' }}
            transition={{ duration: 1 }}
          >
            <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
            <span className="text-[var(--green)] font-caveat text-2xl font-bold">Start Donating Poor People</span>
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold text-gray-800 mb-6" 
            style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
            initial={{ opacity: 0, transform: 'translateZ(0)' }}
            animate={isHeaderInView ? { opacity: 1, transform: 'translateZ(0)' } : { opacity: 0, transform: 'translateZ(0)' }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Charity With Difference
          </motion.h1>
          <motion.p 
            className="text-[var(--gray-green)] text-sm max-w-xl font-nunito font-semibold mx-auto leading-relaxed"
            initial={{ opacity: 0, transform: 'translateZ(0)' }}
            animate={isHeaderInView ? { opacity: 1, transform: 'translateZ(0)' } : { opacity: 0, transform: 'translateZ(0)' }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Join Our Monthly Giving Program To Provide Consistent Support To Our Initiatives. 
            Regular Contributions, No Matter The Size, Help Us Plan And Sustain Long-Term Projects.
          </motion.p>
        </div>

        {/* Decorative Hand */}
        <div className="absolute top-2 left-1 opacity-60 z-0 animate-float">
          <div className="relative">
            <Image 
              src={hand} 
              alt="Hand with heart" 
              width={160} 
              height={160}
              className="object-contain"
            />
            
          </div>
        </div>



        {/* Swiper Section */}
        <div 
          className="relative z-10"
          onMouseEnter={() => {
            if (swiperRef.current && swiperRef.current.autoplay) {
              swiperRef.current.autoplay.stop();
            }
          }}
          onMouseLeave={() => {
            if (swiperRef.current && swiperRef.current.autoplay) {
              swiperRef.current.autoplay.start();
            }
          }}
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="font-nunito font-semibold"
          >
            {charityCards.map((card) => (
              <SwiperSlide key={card.id}>
                <CharityCard
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  color={card.color}
                  bgColor={card.bgColor}
                  isTransitioning={false}
                  animationDelay={0}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button 
              className="swiper-button-prev-custom bg-dark-green text-white rounded-full w-15 h-15 flex items-center justify-center hover:bg-yellow-500  transition-all duration-300 shadow-lg"
              onMouseEnter={() => swiperRef.current?.autoplay?.start()}
              onMouseLeave={() => swiperRef.current?.autoplay?.stop()}
            >
              
               <FaArrowLeft />
            </button>
            <button 
              className="swiper-button-next-custom bg-yellow-500 text-white rounded-full w-15 h-15 flex items-center justify-center hover:bg-dark-green transition-all duration-300 shadow-lg"
              onMouseEnter={() => swiperRef.current?.autoplay?.start()}
              onMouseLeave={() => swiperRef.current?.autoplay?.stop()}
            >
            
              <FaArrowRight />
              
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
}

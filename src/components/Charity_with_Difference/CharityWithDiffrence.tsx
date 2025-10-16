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
import FadeUpCard from '@/src/animations/FadeButtomUp';
import SlideinFromLeft from '@/src/animations/SlideInFromLeft';
import { useTranslation } from 'react-i18next';

export default function CharityWithDifference() {
  // Animation refs
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const swiperRef = useRef<SwiperType | null>(null);
  const { t } = useTranslation();

  return (
    <div className="bg-white overflow-hidden py-4  lg:py-4 px-4 relative">
      <div className="max-w-7xl mx-auto mt-15">
        {/* Header Section */}
        <FadeUpCard delay={0.3}>
        <div ref={headerRef} className="text-center mb-4 lg:mb-6 relative z-10">
          <motion.div 
            className="flex items-center justify-center mb-4 space-x-3"
            initial={{ opacity: 0, transform: 'translateZ(0)' }}
            animate={isHeaderInView ? { opacity: 1, transform: 'translateZ(0)' } : { opacity: 0, transform: 'translateZ(0)' }}
            transition={{ duration: 1 }}
          >
            <i className="text-xl md:text-2xl text-green hand-icon"></i>
            <span className="text-green font-caveat text-lg md:text-[22px] xl:text-2xl font-bold">{t("Start Donating Poor People")}</span>
          </motion.div>
          <motion.h2 
            className="text-[28px] leading-tight font-nunito md:text-4xl xl:text-[50px] font-bold text-dark-green mb-6 xs:mb-4" 
            style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
            initial={{ opacity: 0, transform: 'translateZ(0)' }}
            animate={isHeaderInView ? { opacity: 1, transform: 'translateZ(0)' } : { opacity: 0, transform: 'translateZ(0)' }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {t("Charity With Difference")}
          </motion.h2>
          <motion.p 
            className="text-gray-green text-[16px] font-semibold max-w-[780px] font-nunito lg:max-w-2xl xl:max-w-3xl md:text-[16px] md:tracking-tight font-nunito xl:tracking-wide leading-7 mx-auto"
            style={{ fontWeight: '400', marginTop: '20px' }}
            initial={{ opacity: 0, transform: 'translateZ(0)' }}
            animate={isHeaderInView ? { opacity: 1, transform: 'translateZ(0)' } : { opacity: 0, transform: 'translateZ(0)' }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {t("Join Our Monthly Giving Program To Provide Consistent Support To Our Initiatives. Regular Contributions, No Matter The Size, Help Us Plan And Sustain Long-Term Projects.")}
          </motion.p>
        </div>
        </FadeUpCard>
        {/* Decorative Hand */}
        <SlideinFromLeft delay={0.5}>
        <motion.div 
          className="absolute w-8 h-8 xs:w-11 xs:h-11 md:w-20 md:h-20 lg:w-30 lg:h-30 xl:w-40 xl:h-40 top-4 left-1 opacity-60 z-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.6,
            y: [0, -90, 50]
          }}
          transition={{
            opacity: { duration: 0.3, delay: 0.3,  },
            y: {
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          <div className="relative">
            <Image 
              src={hand} 
              alt="Hand with heart" 
              width={160} 
              height={160}
              className="object-contain w-full h-full"
            />
            
          </div>
        </motion.div>

          </SlideinFromLeft>

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
          <div className='md:px-14 lg:px-15 xl:px-8 mx-auto'>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
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
               0: {
    slidesPerView: 0,
    spaceBetween: 4,
    centeredSlides: false,
  },
              300: {
                slidesPerView: 1,
                spaceBetween: 10,
                centeredSlides: true,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 15,
                centeredSlides: true,
              },
              700: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 25,
                centeredSlides: false,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
              },
            }}
            className="font-nunito font-semibold"
            speed={990}
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
          </div>
          {/* Custom Navigation Buttons */}
          <div className="flex justify-center items-center mt-6 lg:mt-10 space-x-4">
            <button 
              className="swiper-button-prev-custom group bg-dark-green rounded-full w-14 h-14  flex items-center justify-center hover:bg-yellow transition-all duration-300"
              onMouseEnter={() => swiperRef.current?.autoplay?.start()}
              onMouseLeave={() => swiperRef.current?.autoplay?.stop()}
            >
              
               <FaArrowLeft className="text-white cursor-pointer group-hover:text-black transition-colors duration-300" />
            </button>
            <button 
              className="swiper-button-next-custom group bg-yellow rounded-full w-14 h-14  flex items-center justify-center hover:bg-dark-green transition-all duration-300"
              onMouseEnter={() => swiperRef.current?.autoplay?.start()}
              onMouseLeave={() => swiperRef.current?.autoplay?.stop()}
            >
            
              <FaArrowRight className="text-black cursor-pointer group-hover:text-white transition-colors duration-300" />
              
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
}

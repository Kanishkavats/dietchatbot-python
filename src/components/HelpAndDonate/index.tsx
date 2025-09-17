"use client";

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import Button from "../common/Buttons/Button";
import DonationCard from "../common/card/DonationCard";
import { allDonationCards } from "../../staticResource";




const HelpAndDonate: React.FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [leftButtonColor, setLeftButtonColor] = useState<'yellow' | 'green'>('green');
  const [rightButtonColor, setRightButtonColor] = useState<'yellow' | 'green'>('yellow');
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const spadeRef = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isSpadeInView = useInView(spadeRef, { once: true, amount: 0.3 });
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleCardClick = (category: string) => {
    if (category === 'Food') {
      router.push('/donation?type=food');
    } else if (category === 'Health') {
      router.push('/donation?type=health');
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
    // Set both buttons to the hovered color of left button
    const newColor = hoveredLeft ? 'yellow' : 'green';
    setLeftButtonColor(newColor);
    setRightButtonColor(newColor);
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
    // Set both buttons to the hovered color of right button
    const newColor = hoveredRight ? 'green' : 'yellow';
    setLeftButtonColor(newColor);
    setRightButtonColor(newColor);
  };

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 lg:py-20 min-h-[400px] md:min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage:  "url('/assets/section3/bgsection3.png')" }}
      >
        <div className="absolute inset-0 bg-black/4"></div>
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 max-w-7xl border-3">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 md:mb-12 lg:mb-16">
          {/* Left Side - Main Content */}
          <div className="flex-1 max-w-2xl mb-6 lg:mb-0">
            {/* Top Left Text */}
            <div className="flex items-center mb-4 md:mb-6">
              <i className="text-lg md:text-xl mr-2 text-[var(--green)] hand-icon"></i>
              <span className="text-[var(--green)] font-caveat text-lg md:text-xl lg:text-2xl font-bold">Start Donating Poor People</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8" style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '700'}}>
              <div className="w-full lg:w-[761px]">
                <span className="text-gray-800">Help & </span>
                <span className="text-yellow-400">Donate </span>
                <span className="text-gray-800">Them when</span>
              </div>
              <div className="block">
                <span className="text-gray-800">They are In Need</span>
              </div>
            </h2>
          </div>

          {/* Right Side - Navigation Arrows */}
          <div className="flex items-center justify-center lg:justify-end gap-3 md:gap-4 lg:ml-12 lg:mt-12">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoveredLeft(true)}
              onMouseLeave={() => setHoveredLeft(false)}
              className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: hoveredLeft ? '#FBBF24' : (leftButtonColor === 'yellow' ? '#FBBF24' : '#07110eff'),
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setHoveredRight(true)}
              onMouseLeave={() => setHoveredRight(false)}
              className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: hoveredRight ? '#07110eff' : (rightButtonColor === 'yellow' ? '#FBBF24' : '#07110eff'),
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
  

       <motion.div 
         ref={spadeRef}
         className="absolute -left-8 md:-left-12 lg:-left-15 top-32 md:top-40 lg:top-180 transform -translate-y-1/2 opacity-40 hover:opacity-50 transition-opacity duration-300 hidden sm:block"
         initial={{ opacity: 0, transform: "translateZ(0)" }}
         animate={isSpadeInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
         transition={{ duration: 1 }}
       >
               <Image
                src="/assets/section2/spade.png"
                 alt="Hand outline"
                 width={60}
                 height={60}
                 className="animate-[float_3s_ease-in-out_infinite] md:w-16 md:h-16 lg:w-20 lg:h-20"
                      />
        </motion.div>
                 
        {/* Carousel Section */}
        <div 
          className="relative"
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
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={15}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 15 },
              640: { slidesPerView: 2, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 22 },
              1280: { slidesPerView: 4, spaceBetween: 24 }
            }}
            className="h-auto"
            navigation={{
              prevEl: null,
              nextEl: null
            }}
            style={{
              '--swiper-navigation-size': '0px'
            } as React.CSSProperties}
          >
            {allDonationCards.map((card, index) => (
              <SwiperSlide key={`${card.id}-${index}`} className="h-auto">
                <DonationCard
                  card={card}
                  isInView={isInView}
                  hoveredCard={hoveredCard}
                  onMouseEnter={setHoveredCard}
                  onMouseLeave={() => setHoveredCard(null)}
                  onCardClick={handleCardClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel Indicators - 8 dots */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-1.5 md:space-x-2">
            {Array.from({ length: 8 }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.slideTo(index);
                  }
                }}
                className="w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 flex items-center justify-center"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  ...(activeIndex === index ? {
                    border: '2px solid #046B59',
                    backgroundColor: 'transparent'
                  } : {
                    border: 'none',
                    backgroundColor: 'transparent'
                  })
                }}
              >
                <div 
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-gradient-to-br from-green to-dark-green'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  style={{
                    ...(activeIndex === index && {
                      background: 'linear-gradient(135deg, #046B59 0%, #122F2A 100%)'
                    })
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpAndDonate;

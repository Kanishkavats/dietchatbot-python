"use client";

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import Image from 'next/image';

const donationCards = [
  {
    id: 1,
    image: "/assets/section3/helpforeducation.png",
    category: "Food",
    title: "Help For Education",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 90,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 2,
    image: "/assets/section3/helpforfood.png",
    category: "Health",
    title: "Help For Food",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 75,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 3,
    image: "/assets/section3/givehealthsupport.png",
    category: "Food",
    title: "Give Health Support",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 65,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 4,
    image: "/assets/section3/childenweworkfor.png",
    category: "Health",
    title: "Children We Work With",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 85,
    raised: "$8500",
    goal: "$1,0000"
  }
];

const HelpAndDonate: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="relative py-20 min-h-[500px]  overflow-hidden ">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage:  "url('/assets/section3/bgsection3.png')" }}
      >
        <div className="absolute inset-0 bg-black/4"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-16">
          {/* Left Side - Main Content */}
          <div className="flex-1 max-w-2xl">
            {/* Top Left Text */}
            <div className="flex items-center mb-6">
              <i className="text-xl mr-2  text-[var(--green)]  hand-icon"></i>
              <span className=" text-[var(--green)] font-caveat text-2xl font-bold">Start Donating Poor People</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8" style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '700'}}>
              <div className="w-[761px]">
                <span className=" text-gray-800">Help & </span>
                <span className="text-yellow-400">Donate </span>
                <span className="text-gray-800">Them when</span>
              </div>
              <div className="block">
                <span className="text-gray-800">They are In Need</span>
              </div>
            </h2>
          </div>

                    {/* Right Side - Navigation Arrows */}
          <div className="flex items-center gap-4 ml-8 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 bg-black rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
              style={{
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
              style={{
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 }
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
            {donationCards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto">
                <div 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl "
                  style={{
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800'
                  }}
                >
                  {/* Shimmer effect overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      left: '-100%',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                  
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    {/* Category Tag */}
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-black text-sm font-medium"
                      style={{
                        background: 'linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)',
                        boxShadow: '0 2px 8px rgba(255, 193, 7, 0.3)'
                      }}
                    >
                      {card.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-dark-green mb-3">{card.title}</h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Donation</span>
                        <span>{card.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-1000 ease-in-out"
                          style={{ width: `${card.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Amounts */}
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>Raised: {card.raised}</span>
                      <span>Goal: {card.goal}</span>
                    </div>
                    
                    {/* Donate Button */}
                    <button className="w-full py-3 px-4 border-2 border-dark-green text-dark-green font-semibold rounded-lg hover:bg-dark-green hover:text-white transition-all duration-300">
                      Donate Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {donationCards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.slideTo(index);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                  activeIndex === index 
                    ? 'bg-gradient-to-br from-green-600 to-dark-green shadow-lg'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  ...(activeIndex === index && {
                    background: 'linear-gradient(135deg, #046B59 0%, #122F2A 100%)',
                    boxShadow: '0 2px 8px rgba(4, 107, 89, 0.3)'
                  })
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpAndDonate;

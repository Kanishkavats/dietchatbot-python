"use client";

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import Image from 'next/image';
import { useRouter } from 'next/navigation';


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
    title: "Children We Work ",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 85,
    raised: "$8500",
    goal: "$1,0000"
  }
];

// Create 8 cards by repeating the original 4
const allDonationCards = [...donationCards, ...donationCards];

const HelpAndDonate: React.FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [leftButtonColor, setLeftButtonColor] = useState<'yellow' | 'green'>('green');
  const [rightButtonColor, setRightButtonColor] = useState<'yellow' | 'green'>('yellow');
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

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
          <div className="flex items-center gap-4 ml-12 mt-12">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoveredLeft(true)}
              onMouseLeave={() => setHoveredLeft(false)}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: hoveredLeft ? '#FBBF24' : (leftButtonColor === 'yellow' ? '#FBBF24' : '#07110eff'),
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setHoveredRight(true)}
              onMouseLeave={() => setHoveredRight(false)}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: hoveredRight ? '#07110eff' : (rightButtonColor === 'yellow' ? '#FBBF24' : '#07110eff'),
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
  

       <div className="absolute -left-15 top-180 transform -translate-y-1/2 opacity-40 hover:opacity-50 transition-opacity duration-300">
               <Image
                src="/assets/section2/spade.png"
                 alt="Hand outline"
                 width={80}
                 height={80}
                className="animate-[float_3s_ease-in-out_infinite]"
                      />
        </div>
                 
        {/* Carousel Section */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={26}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
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
            {allDonationCards.map((card, index) => (
              <SwiperSlide key={`${card.id}-${index}`} className="h-auto">
                <div 
                  className="bg-white rounded-2xl shadow-lg border-15 border-white overflow-hidden relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                  style={{
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800'
                  }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(card.category)}
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
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    {/* Category Tag */}
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-black text-sm font-medium transition-all duration-300"
                      style={{
                        background: hoveredCard === card.id 
                          ? 'linear-gradient(135deg, #151414d6 0%, #000000 100%)'
                          : 'linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)',
                        color: hoveredCard === card.id ? 'white' : 'black',
                        boxShadow: hoveredCard === card.id 
                          ? '0 2px 8px rgba(34, 197, 94, 0.4)'
                          : '0 2px 8px rgba(255, 193, 7, 0.3)',
                        transform: hoveredCard === card.id ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {card.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 
                      className="text-xl font-bold mb-3 transition-colors duration-300 cursor-pointer"
                      style={{
                        color: hoveredCard === card.id ? '#6b5103' : '#122F2A', // Yellow mustard on hover, dark green default
                        transition: 'color 0.3s ease'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push('/child-education');
                      }}
                    >
                      {card.title}
                    </h3>
                    
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
                    <button 
                      className=" py-2 px-2 border-2 font-semibold rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: hoveredCard === card.id ? '#000000' : 'transparent',
                        borderColor: hoveredCard === card.id ? '#000000' : '#1a2d29ff',
                        color: hoveredCard === card.id ? 'white' : '#122F2A',
                        transform: hoveredCard === card.id ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: hoveredCard === card.id 
                          ? '0 4px 12px rgba(34, 197, 94, 0.3)'
                          : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel Indicators - 8 dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: 8 }, (_, index) => (
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

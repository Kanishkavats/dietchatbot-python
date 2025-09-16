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

// Animated Progress Bar Component
const AnimatedProgressBar: React.FC<{ progress: number; isInView: boolean }> = ({ progress, isInView }) => {
  const [displayProgress, setDisplayProgress] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      // Animate the percentage counter from 0 to target value
      const duration = 1500; // Same duration as progress bar
      const startTime = Date.now();
      const startValue = 0;
      const endValue = progress;

      const animateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        
        // Use easeOut easing to match the progress bar animation
        const easeOut = 1 - Math.pow(1 - progressRatio, 3);
        const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);
        
        setDisplayProgress(currentValue);

        if (progressRatio < 1) {
          requestAnimationFrame(animateCounter);
        }
      };

      // Start animation after a small delay to match progress bar
      const timer = setTimeout(() => {
        requestAnimationFrame(animateCounter);
      }, 200);
      
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(0);
    }
  }, [isInView, progress]);

  return (
    <div className="bg-gray-100 rounded-lg p-2 md:p-2 mb-2 md:mb-3">
      <div className="flex justify-between text-xs md:text-sm text-gray-500 mb-2">
        <span>Donation</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {displayProgress}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
        <motion.div 
          className="bg-yellow-400 h-1.5 md:h-2 rounded-full relative overflow-hidden"
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
              delay: 0.5
            }}
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              transform: 'translateX(-100%)'
            }}
          />
        </motion.div>
      </div>
      
      {/* Amounts */}
      <div className="flex justify-between text-xs md:text-sm text-gray-500 mb-2 md:mb-3 mt-2 md:mt-3">
        <span>Raised: {progress === 90 ? "$8500" : progress === 75 ? "$7500" : progress === 65 ? "$6500" : "$8500"}</span>
        <span>Goal: <span className="text-brown">{progress === 90 ? "$1,0000" : progress === 75 ? "$1,0000" : progress === 65 ? "$1,0000" : "$1,0000"}</span></span>
      </div>
    </div>
  );
};

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

      <div className="relative z-10 container mx-auto px-3 sm:px-4 max-w-7xl">
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
                  <div className="relative h-40 sm:h-44 md:h-48 rounded-lg overflow-hidden">
                    <motion.div
                      animate={hoveredCard === card.id ? { scale: 1.1, rotate: -3 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                       
                      />
                    </motion.div>
                    {/* Category Tag */}
                    <div 
                      className="absolute top-3 left-3 md:top-4 md:left-4 px-5 py-3 md:px-5 md:py-2 rounded-full text-black text-xs md:text-sm font-medium transition-all duration-300"
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
                  <div className="p-3 md:p-4">
                    {/* Title */}
                    <h3 
                      className="text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors duration-300 cursor-pointer"
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
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-2 md:mb-3">{card.description}</p>
                    
                    {/* Progress Bar */}
                    <AnimatedProgressBar progress={card.progress} isInView={isInView} />
                    
                    {/* Donate Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push('/donate-us');
                      }}
                      className="w-1/2 py-2 px-2 border-2 font-semibold rounded-full transition-all duration-300 text-sm md:text-base"
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

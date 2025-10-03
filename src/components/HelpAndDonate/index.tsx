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
import { useFetchAllCampaigns } from "../../hooks/useCampaigns";

interface CampaignCard {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  progress: number;
  raised: string;
  goal: string;
}




const HelpAndDonate: React.FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [leftButtonColor, setLeftButtonColor] = useState<'yellow' | 'green'>('green');
  const [rightButtonColor, setRightButtonColor] = useState<'yellow' | 'green'>('yellow');
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const spadeRef = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isSpadeInView = useInView(spadeRef, { once: true, amount: 0.3 });
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Fetch campaigns from API
  const { data: campaignsData, isLoading, error } = useFetchAllCampaigns(1, 8);

  // Map API data to match the component structure
  const mapCampaignData = (campaign: any) => {
    const progress = campaign.goalAmount > 0 ? Math.round((campaign.raisedAmount / campaign.goalAmount) * 100) : 0;
    return {
      id: campaign.id?.toString() || Math.random().toString(),
      image: campaign.images && campaign.images.length > 0 ? campaign.images[0] : "/assets/section3/helpforeducation.png",
      category: campaign.category || "General",
      title: campaign.title || "Campaign Title",
      description: campaign.description || "No description available",
      progress: Math.min(progress, 100), // Cap at 100%
      raised: `$${campaign.raisedAmount || 0}`,
      goal: `$${campaign.goalAmount || 0}`
    };
  };

  // Use API data if available, otherwise fallback to static data
  const campaignsToDisplay = campaignsData?.campaigns 
    ? campaignsData.campaigns.map(mapCampaignData)
    : allDonationCards;

  const handleCardClick = (id?: string) => {
    // Navigate to donation page with campaign ID if available
    if (id) {
      // router.push(`/donation?id=${id}`);
       router.push(`/campaign/${id}`);
    } else {
      router.push('/donation');
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
    // Set both buttons to the hovered color of left button
    setLeftButtonColor("green");
    setRightButtonColor("green");
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }

    setLeftButtonColor("yellow");
    setRightButtonColor("yellow");
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

      <div className="relative z-10 container mx-auto px-3 sm:px-6 lg:px-0 xl:px-0 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 md:mb-12 lg:mb-6">
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

            <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-12 ml-auto md:ml-12">
              <button
                onClick={handlePrev}
                className="w-12 h-12 md:w-15 md:h-15 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FBBF24] transition-all duration-300"
                style={{
                  backgroundColor:
                  leftButtonColor === "yellow"
                    ? "#FBBF24"
                    : "#07110eff",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
                onMouseEnter={() => setLeftButtonColor("yellow")}
                onMouseLeave={() => setLeftButtonColor("green")}
              >
                <svg
                  className={`h-8 w-6 md:h-12 md:w-8 transition-colors duration-300 ${leftButtonColor === "yellow"  ? "text-gray-900" : "text-white"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.82843 11L13.1924 5.63604L11.7782 4.22183L4 12L11.7782 19.7782L13.1924 18.364L7.82843 13H20V11H7.82843Z" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#07110eff] transition-all duration-300"
                style={{
                  backgroundColor: rightButtonColor === "yellow"
                    ? "#FBBF24"
                    : "#07110eff",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
                onMouseEnter={() => setRightButtonColor("green")}
                onMouseLeave={() => setRightButtonColor("yellow")}
              >
                <svg
                  className={`h-8 w-6 md:h-12 md:w-8 transition-colors duration-300 ${rightButtonColor === "green" ? "text-white" : "text-foreground"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.172 11L10.808 5.63604L12.222 4.22183L20 12L12.222 19.7782L10.808 18.364L16.172 13H4V11H16.172Z" />
                </svg>
              </button>
            </div>

        </div>
  

       <motion.div 
         ref={spadeRef}
         className="absolute -left-8 md:-left-12 lg:-left-20 top-32 md:top-40 lg:top-180 transform -translate-y-1/2 opacity-40 hover:opacity-50 transition-opacity duration-300 hidden sm:block"
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
          className="relative lg:px-15 xl:px-0 "
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
            centeredSlides={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              320: { 
                slidesPerView: 1, 
                spaceBetween: 15,
                centeredSlides: true
              },
              480: { 
                slidesPerView: 1, 
                spaceBetween: 15,
                centeredSlides: true
              },
              640: { 
                slidesPerView: 1.5, 
                spaceBetween: 18,
                centeredSlides: true
              },
              768: { 
                slidesPerView: 2, 
                spaceBetween: 20,
                centeredSlides: false
              },
              1024: { 
                slidesPerView: 3, 
                spaceBetween: 22,
                centeredSlides: false
              },
              1280: { 
                slidesPerView: 4, 
                spaceBetween: 24,
                centeredSlides: false
              }
            }}
            speed={990}
            className="h-full"
            navigation={{
              prevEl: null,
              nextEl: null
            }}
            style={{
              '--swiper-navigation-size': '0px'
            } as React.CSSProperties}
          >
            {campaignsToDisplay.map((card: CampaignCard, index: number) => (
              <SwiperSlide key={`${card.id}-${index}`} className="h-full flex justify-center">
                <div className="h-full flex justify-center w-full">
                <DonationCard
                  card={card}
                  isInView={isInView}
                  hoveredCard={hoveredCard}
                  onMouseEnter={setHoveredCard}
                  onMouseLeave={() => setHoveredCard(null)}
                  onCardClick={handleCardClick}
                
                />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel Indicators - dynamic dots */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-1.5 md:space-x-2">
            {Array.from({ length: Math.min(campaignsToDisplay.length, 8) }, (_, index) => (
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

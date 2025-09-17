"use client";

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { bannerBg } from '@/public/assets'
import PageBanner from '../common/PageBanner'
import Button from '../common/Buttons/Button';
import SendMsg from '../About/SendMsg';
import ChildrenNeed from '../About/ChildrenNeed'
import { motion, useInView } from "framer-motion";
import DonationCard from '../common/card/DonationCard';
import { useFetchAllCampaigns } from '@/src/hooks/useCampaigns';

const donationCards = [
  {
    id: 1,
    image: "/assets/section3/childenweworkfor.png",
    category: "Health",
    title: "Children We Work ",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 85,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 2,
    image: "/assets/section3/helpforeducation.png",
    category: "Food",
    title: "Help For Education",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 70,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 3,
    image: "/assets/section3/helpforfood.png",
    category: "Health",
    title: "Help For Food",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 65,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 4,
    image: "/assets/section3/givehealthsupport.png",
    category: "Food",
    title: "Give Health Support",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 90,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 5,
    image: "/assets/section3/childenweworkfor.png",
    category: "Health",
    title: "Children We Work ",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 75,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 6,
    image: "/assets/section3/helpforeducation.png",
    category: "Food",
    title: "Help For Education",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 65,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 7,
    image: "/assets/section3/helpforfood.png",
    category: "Health",
    title: "Help For Food",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 90,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 8,
    image: "/assets/section3/givehealthsupport.png",
    category: "Food",
    title: "Give Health Support",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 55,
    raised: "$8500",
    goal: "$1,0000"
  }
];


const DonationPage: React.FC = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [leftButtonColor, setLeftButtonColor] = useState<'yellow' | 'green'>('green');
  const [rightButtonColor, setRightButtonColor] = useState<'yellow' | 'green'>('yellow');
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isCarouselInView = useInView(carouselSectionRef, { once: true, margin: "-100px" });



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
    <>
      
      <PageBanner
        bgImage={bannerBg}
        tagline="Start Donating Poor People"
        title="our causes "
        smallIcon="mdi:hand-heart"
        decoIcon="mdi:ribbon"
        decoPosition="absolute bottom-10 left-10"
      />

      {/* Donation Causes Section */}
      <section ref={sectionRef} className="relative py-20 min-h-[500px] overflow-hidden">


        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            {/* Top Left Text */}
            <div className="flex items-center justify-center mb-6">
              <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
              <span className="text-[var(--green)] font-caveat text-2xl font-bold">Start Donating Poor People</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8" style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '700'}}>
              <span className="text-gray-800">Be The Reason Of Someone </span>
              <br/>
               <span className="text-yellow-400">Smiles </span>
               <span className="text-gray-800">Causes</span>
             </h2>
           </div>

           {/* Static Grid Section */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {donationCards.map((card) => (
               <DonationCard
                 key={card.id}
                 card={card}
                 isInView={isInView}
                 hoveredCard={hoveredCard}
                 onMouseEnter={setHoveredCard}
                 onMouseLeave={() => setHoveredCard(null)}
                 onCardClick={handleCardClick}
               />
             ))}
           </div>

           {/* Pagination Section */}
          <div className="flex justify-center items-center mt-12">
            <div className="flex items-center space-x-3">
              {/* Previous Page Button */}
              <button className="w-12 h-12 rounded-full bg-green flex items-center justify-center text-white hover:bg-[#0f2520] transition-colors duration-300">
                <span className="text-lg font-bold">«</span>
              </button>

              {/* Page Numbers */}
              <button 
                className="w-12 h-12 rounded-full bg-gray  border-gray flex items-center justify-center text-black font-bold hover:bg-yellow transition-colors duration-300"
                onClick={() => router.push('/latestnews')}
              >
                1
              </button>

              <button className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold hover:bg-yellow transition-colors duration-300">
                2
              </button>

              <button 
                className="w-12 h-12 rounded-full bg-gray flex items-center justify-center text-black font-bold hover:bg-yellow transition-colors duration-300"
                onClick={() => router.push('/latestnews')}
              >
                3
              </button>

               {/* Next Page Button */}
               <button className="w-12 h-12 rounded-full bg-green flex items-center justify-center text-white hover:bg-[#0f2520] transition-colors duration-300">
                <span className="text-lg font-bold">»</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Children Need Your Help Section */}
       <ChildrenNeed />



      {/* Help & Donate Carousel Section */}
      <section ref={carouselSectionRef} className="relative py-20 min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/section3/bgsection3.png')" }}
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
                <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
                <span className="text-[var(--green)] font-caveat text-2xl font-bold">Start Donating Poor People</span>
              </div>

               {/* Main Heading */}
              <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8" style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '700'}}>
                <div className="w-[761px] ">
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
              modules={[Navigation, ]}
              slidesPerView={1}
              spaceBetween={26}
              loop={true}

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
              {donationCards.map((card, index) => (
                <SwiperSlide key={`${card.id}-${index}`} className="h-auto">
                  <DonationCard
                    card={card}
                    isInView={isCarouselInView}
                    hoveredCard={hoveredCard}
                    onMouseEnter={setHoveredCard}
                    onMouseLeave={() => setHoveredCard(null)}
                    onCardClick={handleCardClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </div>
      </section>

      {/* Send Message For Donation Section */}
      <SendMsg />
    </>
  );
};

export default DonationPage;











// import React, { useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Banner from "../PageBanner/Banner";
// import Button from "../common/Buttons/Button";
// import SendMsg from "../About/SendMsg";
// import ChildrenNeed from "../About/ChildrenNeed";
// import { motion, useInView } from "framer-motion";

// const donationCards = [
//   {
//     id: 1,
//     image: "/assets/section3/childenweworkfor.png",
//     category: "Health",
//     title: "Children We Work ",
//     description:
//       "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
//     progress: 85,
//     raised: "$8500",
//     goal: "$1,0000",
//   },
//   {
//     id: 2,
//     image: "/assets/section3/helpforeducation.png",
//     category: "Food",
//     title: "Help For Education",
//     description:
//       "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
//     progress: 70,
//     raised: "$8500",
//     goal: "$1,0000",
//   },
//   {
//     id: 3,
//     image: "/assets/section3/helpforfood.png",
//     category: "Health",
//     title: "Help For Food",
//     description:
//       "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
//     progress: 65,
//     raised: "$8500",
//     goal: "$1,0000",
//   },
//   {
//     id: 4,
//     image: "/assets/section3/givehealthsupport.png",
//     category: "Food",
//     title: "Give Health Support",
//     description:
//       "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
//     progress: 90,
//     raised: "$8500",
//     goal: "$1,0000",
//   },
// ];

// const DonationPage: React.FC = () => {
//   const router = useRouter();
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperRef = useRef<SwiperType | null>(null);

//   const handleCardClick = (category: string) => {
//     if (category === "Food") {
//       router.push("/donation?type=food");
//     } else if (category === "Health") {
//       router.push("/donation?type=health");
//     }
//   };

//   return (
//     <>
//       <Banner Heading="Start Donating Poor People" BannerMoto="Our Causes" />

//       {/* Donation Causes Section */}
//       <section className="relative py-20 min-h-[500px] overflow-hidden">
//         <div className="relative z-10 container mx-auto px-4 max-w-7xl">
//           {/* Header Section */}
//           <div className="text-center mb-16">
//             <div className="flex items-center justify-center mb-6">
//               <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
//               <span className="text-[var(--green)] font-caveat text-2xl font-bold">
//                 Start Donating Poor People
//               </span>
//             </div>
//             <h2
//               className="text-5xl md:text-6xl font-bold leading-tight mb-8"
//               style={{
//                 fontFamily: "var(--font-nunito), Nunito, sans-serif",
//                 fontWeight: "700",
//               }}
//             >
//               <span className="text-gray-800">Be The Reason Of Someone </span>
//               <br />
//               <span className="text-yellow-400">Smiles </span>
//               <span className="text-gray-800">Causes</span>
//             </h2>
//           </div>

//           {/* Carousel Section */}
//           <div className="relative">
//             <Swiper
//               modules={[Navigation]}
//               slidesPerView={1}
//               spaceBetween={26}
//               loop={true}
//               onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//               onSwiper={(swiper) => (swiperRef.current = swiper)}
//               breakpoints={{
//                 640: { slidesPerView: 2, spaceBetween: 30 },
//                 1024: { slidesPerView: 3, spaceBetween: 30 },
//                 1280: { slidesPerView: 4, spaceBetween: 30 },
//               }}
//               className="h-auto"
//               navigation={{
//                 prevEl: null,
//                 nextEl: null,
//               }}
//             >
//               {donationCards.map((card) => (
//                 <SwiperSlide key={card.id} className="h-auto">
//                   <div
//                     className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
//                     style={{
//                       fontFamily: "var(--font-nunito), Nunito, sans-serif",
//                       fontWeight: "800",
//                     }}
//                     onMouseEnter={() => setHoveredCard(card.id)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                     onClick={() => handleCardClick(card.category)}
//                   >
//                     {/* Card Image with Animation */}
//                     <div className="relative mb-4 rounded-xl overflow-hidden w-full h-48">
//                       <motion.img
//                         src={card.image}
//                         alt="News"
//                         className="absolute top-0 left-0 w-full h-full object-cover"
//                         whileHover={{
//                           scale: 1.1, // zoom
//                           x: -20, // move left
//                         }}
//                         transition={{
//                           duration: 0.5,
//                           ease: "easeInOut",
//                         }}
//                       />
//                       <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-xs font-semibold px-3 py-1 rounded-full">
//                         {card.category}
//                       </span>
//                     </div>

//                     {/* Card Content */}
//                     <div className="p-6">
//                       <h3
//                         className="text-xl font-bold mb-3 cursor-pointer"
//                         style={{
//                           color:
//                             hoveredCard === card.id ? "#6b5103" : "#122F2A",
//                         }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           router.push("/child-education");
//                         }}
//                       >
//                         {card.title}
//                       </h3>
//                       <p className="text-gray-600 text-sm leading-relaxed mb-4">
//                         {card.description}
//                       </p>
//                       <div className="mb-4">
//                         <div className="flex justify-between text-sm text-gray-500 mb-2">
//                           <span>Donation</span>
//                           <span>{card.progress}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-yellow-400 h-2 rounded-full transition-all duration-1000 ease-in-out"
//                             style={{ width: `${card.progress}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                       <div className="flex justify-between text-sm text-gray-500 mb-4">
//                         <span>Raised: {card.raised}</span>
//                         <span>Goal: {card.goal}</span>
//                       </div>
//                       <button
//                         className="py-2 px-2 border-2 font-semibold rounded-full transition-all duration-300"
//                         style={{
//                           backgroundColor:
//                             hoveredCard === card.id ? "#000000" : "transparent",
//                           borderColor:
//                             hoveredCard === card.id ? "#000000" : "#122F2A",
//                           color:
//                             hoveredCard === card.id ? "white" : "#122F2A",
//                           transform:
//                             hoveredCard === card.id ? "scale(1.02)" : "scale(1)",
//                         }}
//                       >
//                         Donate Now
//                       </button>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </section>

//       {/* Children Need Your Help Section */}
//       <ChildrenNeed />

//       {/* Send Message For Donation Section */}
//       <SendMsg />
//     </>
//   );
// };

// export default DonationPage;






// import React, { useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import { useRouter } from "next/navigation";
// import Banner from "../PageBanner/Banner";
// import Button from "../common/Buttons/Button";
// import SendMsg from "../About/SendMsg";
// import ChildrenNeed from "../About/ChildrenNeed";
// import { motion, useInView } from "framer-motion";

// const donationCards = [
//   {
//     id: 1,
//     image: "/assets/section3/childenweworkfor.png",
//     category: "Health",
//     title: "Children We Work ",
//     description:
//       "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
//     progress: 85,
//     raised: "$8500",
//     goal: "$1,0000",
//   },
//   {
//     id: 2,
//     image: "/assets/section3/helpforeducation.png",
//     category: "Food",
//     title: "Help For Education",
//     description:
//       "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
//     progress: 70,
//     raised: "$8500",
//     goal: "$1,0000",
//   },
//   {
//     id: 3,
//     image: "/assets/section3/helpforfood.png",
//     category: "Health",
//     title: "Help For Food",
//     description:
//       "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
//     progress: 65,
//     raised: "$8500",
//     goal: "$1,0000",
//   },
//   {
//     id: 4,
//     image: "/assets/section3/givehealthsupport.png",
//     category: "Food",
//     title: "Give Health Support",
//     description:
//       "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
//     progress: 90,
//     raised: "$8500",
//     goal: "$1,0000",
//   },
// ];

// const DonationPage: React.FC = () => {
//   const router = useRouter();
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperRef = useRef<SwiperType | null>(null);

//   const handleCardClick = (category: string) => {
//     if (category === "Food") {
//       router.push("/donation?type=food");
//     } else if (category === "Health") {
//       router.push("/donation?type=health");
//     }
//   };

//   return (
//     <>
//       {/* Banner Section */}
//       <Banner Heading="Start Donating Poor People" BannerMoto="Our Causes" />

//       {/* Donation Causes Section */}
//       <section className="relative py-20 min-h-[500px] overflow-hidden">
//         <div className="relative z-10 container mx-auto px-4 max-w-7xl">
//           {/* Header Section */}
//           <div className="text-center mb-16">
//             <div className="flex items-center justify-center mb-6">
//               <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
//               <span className="text-[var(--green)] font-caveat text-2xl font-bold">
//                 Start Donating Poor People
//               </span>
//             </div>
//             <h2
//               className="text-5xl md:text-6xl font-bold leading-tight mb-8"
//               style={{
//                 fontFamily: "var(--font-nunito), Nunito, sans-serif",
//                 fontWeight: "700",
//               }}
//             >
//               <span className="text-gray-800">Be The Reason Of Someone </span>
//               <br />
//               <span className="text-yellow-400">Smiles </span>
//               <span className="text-gray-800">Causes</span>
//             </h2>
//           </div>

//           {/* Carousel Section */}
//           <div className="relative">
//             <Swiper
//               modules={[Navigation]}
//               slidesPerView={1}
//               spaceBetween={26}
//               loop={true}
//               onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//               onSwiper={(swiper) => (swiperRef.current = swiper)}
//               breakpoints={{
//                 640: { slidesPerView: 2, spaceBetween: 30 },
//                 1024: { slidesPerView: 3, spaceBetween: 30 },
//                 1280: { slidesPerView: 4, spaceBetween: 30 },
//               }}
//               className="h-auto"
//               navigation={{
//                 prevEl: null,
//                 nextEl: null,
//               }}
//             >
//               {donationCards.map((card) => (
//                 <SwiperSlide key={card.id} className="h-auto">
//                   <div
//                     className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
//                     style={{
//                       fontFamily: "var(--font-nunito), Nunito, sans-serif",
//                       fontWeight: "800",
//                     }}
//                     onMouseEnter={() => setHoveredCard(card.id)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                     onClick={() => handleCardClick(card.category)}
//                   >
//                     {/* Card Image with Animation */}
//                     <div className="relative mb-4 rounded-xl overflow-hidden w-full h-48">
//                       <motion.img
//                         src={card.image}
//                         alt="News"
//                         className="absolute top-0 left-0 w-full h-full object-cover"
//                         whileHover={{
//                           scale: 1.1, // zoom
//                           x: -20, // move left
//                         }}
//                         transition={{
//                           duration: 0.5,
//                           ease: "easeInOut",
//                         }}
//                       />
//                       <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-xs font-semibold px-3 py-1 rounded-full">
//                         {card.category}
//                       </span>
//                     </div>

//                     {/* Card Content */}
//                     <div className="p-6">
//                       <h3
//                         className="text-xl font-bold mb-3 cursor-pointer"
//                         style={{
//                           color:
//                             hoveredCard === card.id ? "#6b5103" : "#122F2A",
//                         }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           router.push("/child-education");
//                         }}
//                       >
//                         {card.title}
//                       </h3>
//                       <p className="text-gray-600 text-sm leading-relaxed mb-4">
//                         {card.description}
//                       </p>
//                       <div className="mb-4">
//                         <div className="flex justify-between text-sm text-gray-500 mb-2">
//                           <span>Donation</span>
//                           <span>{card.progress}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-yellow-400 h-2 rounded-full transition-all duration-1000 ease-in-out"
//                             style={{ width: `${card.progress}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                       <div className="flex justify-between text-sm text-gray-500 mb-4">
//                         <span>Raised: {card.raised}</span>
//                         <span>Goal: {card.goal}</span>
//                       </div>
//                       <button
//                         className="py-2 px-2 border-2 font-semibold rounded-full transition-all duration-300"
//                         style={{
//                           backgroundColor:
//                             hoveredCard === card.id ? "#000000" : "transparent",
//                           borderColor:
//                             hoveredCard === card.id ? "#000000" : "#122F2A",
//                           color:
//                             hoveredCard === card.id ? "white" : "#122F2A",
//                           transform:
//                             hoveredCard === card.id ? "scale(1.02)" : "scale(1)",
//                         }}
//                       >
//                         Donate Now
//                       </button>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </section>

//       {/* Children Need Your Help Section */}
//       <ChildrenNeed />

//       {/* Send Message For Donation Section */}
//       <SendMsg />
//     </>
//   );
// };

// export default DonationPage;

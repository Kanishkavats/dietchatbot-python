'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CharityCard from './CharityCard';

interface CharityCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  color: string;
  bgColor: string;
}

const charityCards: CharityCard[] = [
  {
    id: 1,
    title: "Healthy Food",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e82a",
    image: "/blue_bg.jpeg",
    color: "border-green-600",
    bgColor: "bg-gray-100"
  },
  {
    id: 2,
    title: "Medical Care",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e82b",
    image: "/green_bg.jpeg",
    color: "border-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    id: 3,
    title: "Child Education",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e829",
    image: "/yellow_bg.jpeg",
    color: "border-yellow-500",
    bgColor: "bg-yellow-50"
  },

  {
    id: 4,
    title: "Healthy Food",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e82a",
    image: "/blue_bg.jpeg",
    color: "border-green-600",
    bgColor: "bg-gray-100"
  },
  {
    id: 5,
    title: "Medical Care",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e82b",
    image: "/green_bg.jpeg",
    color: "border-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    id: 6,
    title: "Child Education",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e829",
    image: "/yellow_bg.jpeg",
    color: "border-yellow-500",
    bgColor: "bg-yellow-50"
  },

];

export default function CharityWithDifference() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const nextSlide = () => {
    if (isTransitioning) return;
    setDirection('right');
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === charityCards.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setDirection('left');
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? charityCards.length - 3 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setDirection(index > currentIndex ? 'right' : 'left');
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const visibleCards = charityCards.slice(currentIndex, currentIndex + 3);

  return (
    <div className="min-h-screen bg-white py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <div className="flex items-center justify-center mb-4 animate-fade-in">
            <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
            <span className="text-[var(--green)] font-caveat text-2xl font-bold">Start Donating Poor People</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-slide-up" style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '700' }}>Charity With Difference</h1>
          <p className="text-[var(--gray-green)] text-sm max-w-xl mx-auto leading-relaxed animate-slide-up-delay">
            Join Our Monthly Giving Program To Provide Consistent Support To Our Initiatives. 
            Regular Contributions, No Matter The Size, Help Us Plan And Sustain Long-Term Projects.
          </p>
        </div>

        {/* Decorative Hand */}
        <div className="absolute top-20 left-10 opacity-30 z-0 animate-float">
          <div className="relative">
            <Image 
              src="/assets/charity_with_difference/hand.png" 
              alt="Hand with heart" 
              width={120} 
              height={120}
              className="object-contain"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <i className="text-yellow-500 text-2xl animate-bounce">💛</i>
            </div>
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute top-32 right-10 w-4 h-4 bg-teal-500 rounded-full opacity-60 animate-pulse"></div>

                 {/* Carousel Section */}
         <div className="relative z-10">
           {/* Cards Container */}
           <div className="flex justify-center items-center gap-8 px-16 overflow-hidden">
            <div 
              className={`flex gap-8 transition-all duration-500 ease-in-out ${
                isTransitioning 
                  ? direction === 'right' 
                    ? 'transform translate-x-4 opacity-50' 
                    : 'transform -translate-x-4 opacity-50'
                  : 'transform translate-x-0 opacity-100'
              }`}
            >
              {visibleCards.map((card, index) => (
                <CharityCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  color={card.color}
                  bgColor={card.bgColor}
                  isTransitioning={isTransitioning}
                  animationDelay={index * 100}
                />
              ))}
            </div>
          </div>

                     {/* Carousel Indicators */}
           <div className="flex justify-center mt-8 space-x-2">
             {Array.from({ length: Math.ceil(charityCards.length / 3) }, (_, i) => (
               <button
                 key={i}
                 onClick={() => goToSlide(i * 3)}
                 disabled={isTransitioning}
                 className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                   currentIndex === i * 3 ? 'bg-green-600 scale-125' : 'bg-gray-300'
                 } ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
               />
             ))}
           </div>

           {/* Navigation Buttons - Bottom */}
           <div className="flex justify-center items-center mt-6 space-x-4">
             <button
               onClick={prevSlide}
               disabled={isTransitioning}
               className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-green-700 transition-all duration-300 shadow-lg nav-button disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <i className="text-xl">←</i>
             </button>

             <button
               onClick={nextSlide}
               disabled={isTransitioning}
               className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-yellow-600 transition-all duration-300 shadow-lg nav-button disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <i className="text-xl">→</i>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

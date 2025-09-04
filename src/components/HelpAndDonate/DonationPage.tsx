"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ChildEducationBanner from '../ChildEducationBanner';

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

  const handleCardClick = (category: string) => {
    if (category === 'Food') {
      router.push('/donation?type=food');
    } else if (category === 'Health') {
      router.push('/donation?type=health');
    }
  };

  return (
    <>
      <ChildEducationBanner />
      
      {/* Donation Causes Section */}
      <section className="relative py-20 min-h-[500px] overflow-hidden">
        

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
              <div 
                key={card.id}
                className="bg-white rounded-2xl shadow-lg border-15 border-white overflow-hidden relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                style={{
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  fontFamily: 'var(--font-nunito), Nunito, sans-serif', 
                  fontWeight: '800'
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
                
                
                       <div className="absolute -left-15 top-180 transform -translate-y-1/2 opacity-40 hover:opacity-50 transition-opacity duration-300">
                               <Image
                                src="/assets/section2/spade.png"
                                 alt="Hand outline"
                                 width={80}
                                 height={80}
                                className="animate-[float_3s_ease-in-out_infinite]"
                                      />
                        </div>

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
                      borderColor: hoveredCard === card.id ? '#000000' : '#122F2A',
                      color: hoveredCard === card.id ? 'white' : '#122F2A',
                      transform: hoveredCard === card.id ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: hoveredCard === card.id 
                        ? '0 4px 12px rgba(34, 197, 89, 0.3)'
                        : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Section */}
          <div className="flex justify-center items-center mt-12">
            <div className="flex items-center space-x-3">
              {/* Previous Page Button */}
              <button className="w-12 h-12 rounded-full bg-[#122F2A] flex items-center justify-center text-white hover:bg-[#0f2520] transition-colors duration-300">
                <span className="text-lg font-bold">«</span>
              </button>
              
              {/* Page Numbers */}
              <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-400 transition-colors duration-300">
                1
              </button>
              
              <button className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold hover:bg-yellow-500 transition-colors duration-300">
                2
              </button>
              
              <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-400 transition-colors duration-300">
                3
              </button>
              
              {/* Next Page Button */}
              <button className="w-12 h-12 rounded-full bg-[#122F2A] flex items-center justify-center text-white hover:bg-[#0f2520] transition-colors duration-300">
                <span className="text-lg font-bold">»</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DonationPage;

"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AnimatedProgressBar from '../AnimatedProgressBar';

interface DonationCardProps {
  card: {
    id: number;
    image: string;
    category: string;
    title: string;
    description: string;
    progress: number;
    raised: string;
    goal: string;
  };
  isInView: boolean;
  hoveredCard: number | null;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  onCardClick: (category: string) => void;
}

const DonationCard: React.FC<DonationCardProps> = ({
  card,
  isInView,
  hoveredCard,
  onMouseEnter,
  onMouseLeave,
  onCardClick
}) => {
  const router = useRouter();

  return (
    <div 
      key={card.id}
      className="bg-white rounded-2xl shadow-lg border-15 border-white overflow-hidden relative transition-all duration-300  cursor-pointer"
      style={{
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-nunito), Nunito, sans-serif', 
        fontWeight: '800'
      }}
      onMouseEnter={() => onMouseEnter(card.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => onCardClick(card.category)}
    >
      <div className="relative mb-4 rounded-xl overflow-hidden w-full h-55">
        <motion.img
          src={card.image}
          alt="News"
          className="absolute top-0 left-0 w-full h-full object-cover"
          animate={{
            scale: hoveredCard === card.id ? 1.2 : 1,
            rotate: hoveredCard === card.id ? 10 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
        <span 
          className="absolute top-3 left-3 text-lg font-semibold px-7 py-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: hoveredCard === card.id ? '#064E3B' : '#FBBF24',
            color: hoveredCard === card.id ? '#FFFFFF' : '#000000'
          }}
        >
          {card.category}
        </span>
      </div>
      
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
        <AnimatedProgressBar progress={card.progress} isInView={isInView} />

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
  );
};

export default DonationCard;

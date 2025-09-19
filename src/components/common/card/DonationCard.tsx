"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AnimatedProgressBar from '../AnimatedProgressBar';
import Button from '../Buttons/Button';

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
      className="bg-white rounded-2xl shadow-lg border-15 border-white overflow-hidden relative cursor-pointer"
      style={{
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-nunito), Nunito, sans-serif', 
        fontWeight: '800',
        minWidth: '280px'
      }}
      onMouseEnter={() => onMouseEnter(card.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => onCardClick(card.category)}
    >
      <div className="relative mb-4 rounded-xl overflow-hidden w-full h-55">
        <motion.img
          src={card.image}
          alt="News"
          className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
          animate={{
            scale: hoveredCard === card.id ? 1.2 : 1,
            rotate: hoveredCard === card.id ? 10 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          onClick={(e) => {
            e.stopPropagation();
            router.push('/child-education');
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
        <p className="text-gray-600 font-nunito font-extralight text-sm leading-relaxed mb-4">{card.description}</p>

        {/* Gray background box for progress bar, amounts, and donation button */}
        <div className="bg-gray-100 p-2 rounded-lg">
          {/* Progress Bar */}
          <AnimatedProgressBar progress={card.progress} isInView={isInView} />

          {/* Amounts */}
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Raised: {card.raised}</span>
            <span>Goal: {card.goal}</span>
          </div>

          {/* Donate Button */}
          <div className="transition-all duration-300 flex justify-start">
            <div className="border-2 border-black rounded-full w-fit">
              <div 
                className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                  hoveredCard === card.id ? 'before:scale-x-100' : 'before:scale-x-0'
                } before:content-[''] before:absolute before:inset-0 before:bg-dark-green before:transition-transform before:duration-500 before:origin-center before:z-0`}
              >
                <Button 
                  text="Donate Now"
                  bgColor="bg-transparent"
                  textColor={hoveredCard === card.id ? "text-white" : "text-black"}
                  hoverTextColor="group-hover:text-white"
                  hoverBg="before:bg-dark-green"
                  rounded="rounded-full"
                  paddingx="px-6"
                  paddingy="py-3"
                  icon=""
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/donate-us');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;

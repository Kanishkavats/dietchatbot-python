'use client';

import React from 'react';
import Image from 'next/image';

export default function ChildEducationBanner() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Main background image */}
        <Image
          src="/assets/banner-bg.png"
          alt="Children in need"
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-green-900/60 to-black/70"></div>
        
      </div>


      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Subtitle with heart icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-yellow-600 text-lg">❤</span>
          </div>
          <span className="text-yellow-400 font-caveat text-xl md:text-2xl font-semibold">
            Start Donating Poor People
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-white text-5xl md:text-7xl font-cursive font-bold mb-8 drop-shadow-lg">
          Cause Details
        </h1>

        {/* Golden Heart Graphic */}
        <div className="absolute bottom-12 left-12 w-32 h-32 opacity-80">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d="M50,85 C30,65 10,45 10,25 C10,15 20,5 30,5 C40,5 50,15 50,25 C50,15 60,5 70,5 C80,5 90,15 90,25 C90,45 70,65 50,85 Z" 
              fill="none" 
              stroke="#FFD700" 
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))"
            />
          </svg>
        </div>


        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-8 w-16 h-16 opacity-20">
          <Image
            src="/assets/hand.png"
            alt="Helping hand"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
      </div>

    </div>
  );
}

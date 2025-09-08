'use client';

import React from 'react';
import Image from 'next/image';

export default function Banner({
  Heading = "",
  BannerMoto = ""
}: {
  Heading: string;
  BannerMoto: string;
}) {
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-gray-900/60 to-black/70"></div>
        
      </div>


      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Subtitle with heart icon */}
        <div className="flex items-center gap-3 mb-6">
         
            <i className="text-xl mr-2 text-yellow-400 hand-icon"></i>
        
          <span className="text-yellow-400 font-caveat text-xl md:text-2xl font-semibold">
            {Heading}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-white text-5xl md:text-7xl font-cursive font-bold mb-8 drop-shadow-lg">
          {BannerMoto}
        </h1>

        {/* Golden Heart Graphic */}
        <div className="absolute bottom-12 left-12 w-32 h-32 opacity-80  animate-pulse">
         
          <Image
            src="/assets/sprade-base.png"
            alt="Helping hand"
            width={80}
            height={80}
            className="object-contain"
          />
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

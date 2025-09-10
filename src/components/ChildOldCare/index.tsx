'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { childOldCareImages, childOldCareSliderSettings } from '../../staticResource';

const ScrollBanner: React.FC = () => {

  // Use imported data from staticResource
  const images = childOldCareImages;
  const settings = childOldCareSliderSettings;

  return (
    <div className="relative w-full h-[500px] gap-10 overflow-hidden">
      {/* Custom Slider Container */}
      <div className="slider-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="px-3">
              <div
              style={{
                backgroundImage:` url(${image.src})`,
                backgroundSize: '150% 150%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="w-full h-[600px] relative">
               
              </div>
            </div>
          ))}
        </Slider>
      </div>

        {/* Top curved overlay */}
        <div className="absolute bottom-[-2px] left-0 w-full h-40 gap-2 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 Q50,0 100,20 L100,20 L0,20 Z"
              fill="var(--color-white)"
            />
          </svg>
          
          {/* Text overlay on bottom curve */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
            <h2 className="text-2xl font-bold text-dark-green mb-1">
              Old People & Child Trouble
            </h2>
            <p className='text-xl  font-small text-gray-400'>
              child & oldcare
            </p>
          </div>
        </div>

      {/* Bottom curved overlay with text */}
      <div className="absolute scale-y-[-1] top-0 left-0 w-full h-30 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 Q50,0 100,20 L100,20 L0,20 Z"
            fill="var(--color-white)"
          />
        </svg>
        
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[var(--color-white)] to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[var(--color-white)] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ScrollBanner;
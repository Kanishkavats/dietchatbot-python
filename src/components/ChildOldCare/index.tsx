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
    <div className="relative w-full h-[550px] md:h-[600px] lg:h-[550px] gap-10 mt-15 overflow-hidden">
      {/* Custom CSS for responsive design */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .child-old-care-slider .slick-prev,
          .child-old-care-slider .slick-next {
            opacity: 0 !important;
            pointer-events: auto !important;
            position: absolute !important;
            z-index: 10 !important;
          }
          
          .child-old-care-slider .slick-prev {
            left: 0 !important;
            width: 50px !important;
            height: 100% !important;
          }
          
          .child-old-care-slider .slick-next {
            right: 0 !important;
            width: 50px !important;
            height: 100% !important;
          }
          
          /* Tablet responsive styles - hide arrows when 2 slides are shown */
          @media (max-width: 1024px) {
            .child-old-care-slider .slick-prev,
            .child-old-care-slider .slick-next {
              display: none !important;
            }
          }
          
          /* Mobile specific styles - hide arrows */
          @media (max-width: 768px) {
            .child-old-care-slider .slick-prev,
            .child-old-care-slider .slick-next {
              display: none !important;
            }
          }
        `
      }} />
      
      {/* Custom Slider Container */}
      <div className="slider-container child-old-care-slider">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="px-1 md:px-2 lg:px-2">
              <div
              style={{
                backgroundImage:` url(${image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative rounded-t-[20px] md:rounded-t-[30px] lg:rounded-none">
               
              </div>
            </div>
          ))}
        </Slider>
      </div>

        {/* Bottom curved overlay with text */}
        <div className="absolute bottom-[-2px] left-0 w-full h-24 md:h-40 lg:h-40 gap-2 pointer-events-none">
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
          <div className="absolute bottom-16 md:bottom-4 lg:bottom-0 left-1/2 transform -translate-x-1/2 text-center px-4">
            <h2 className="text-base md:text-xl lg:text-2xl font-nunito font-extrabold text-dark-green mb-0 md:mb-1 leading-tight whitespace-nowrap">
              Old People & Child Trouble
            </h2>
            <p className='text-sm md:text-lg lg:text-xl font-small font-nunito text-gray-400 whitespace-nowrap'>
              Child & Old Care
            </p>
          </div>
        </div>

      {/* Top curved overlay */}
      <div className="absolute scale-y-[-1] top-0 left-0 w-full h-24 md:h-30 lg:h-30 pointer-events-none">
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

    </div>
  );
};

export default ScrollBanner;
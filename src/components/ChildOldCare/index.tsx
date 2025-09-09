'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ScrollBanner: React.FC = () => {

  // Create array of images (using the 3 images from public folder)
  const images = [
    { src: '/assets/childoldcare/4people.png', alt: 'Image 1' },
    { src: '/assets/childoldcare/child.png', alt: 'Image 2' },
    { src: '/assets/childoldcare/brownchild.png', alt: 'Image 3' },
    { src: '/assets/childoldcare/4people.png', alt: 'Image 1' },
    { src: '/assets/childoldcare/child.png', alt: 'Image 2' },
    { src: '/assets/childoldcare/brownchild.png', alt: 'Image 3' }
  ];

  // Slick carousel settings
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    arrows: true,
    dots: false,
    autoplay: false,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px"
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px"
        }
      }
    ]
  };

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
              fill="white"
            />
          </svg>
          
          {/* Text overlay on bottom curve */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
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
            fill="white"
          />
        </svg>
        
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ScrollBanner;
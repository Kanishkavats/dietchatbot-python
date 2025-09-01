'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface CharityCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  isTransitioning: boolean;
  animationDelay?: number;
}

const CharityCard: React.FC<CharityCardProps> = ({
  id,
  title,
  description,
  icon,
  color,
  bgColor,
  isTransitioning,
  animationDelay = 0
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/child-education');
  };
  // Map color classes to CSS variables
  const getColorClass = (colorClass: string) => {
    switch (colorClass) {
      case 'border-green-600':
        return 'var(--green)';
      case 'border-orange-500':
        return 'var(--orange)';
      case 'border-yellow-500':
        return 'var(--yellow)';
      case 'border-blue-500':
        return 'var(--blue)';
      case 'border-purple-500':
        return 'var(--purple)';
      case 'border-red-500':
        return 'var(--red)';
      default:
        return 'var(--green)';
    }
  };

  const getBgColorClass = (bgColorClass: string) => {
    switch (bgColorClass) {
      case 'bg-gray-100':
        return 'var(--gray-100)';
      case 'bg-orange-50':
        return 'var(--orange-50)';
      case 'bg-yellow-50':
        return 'var(--yellow-50)';
      case 'bg-blue-50':
        return 'var(--blue-50)';
      case 'bg-purple-50':
        return 'var(--purple-50)';
      case 'bg-red-50':
        return 'var(--red-50)';
      default:
        return 'var(--gray-100)';
    }
  };

  const borderColor = getColorClass(color);

  // Get icon class based on card ID
  const getIconClass = (cardId: number) => {
    switch (cardId) {
      case 1: return 'icon-healthy-food';
      case 2: return 'icon-medical-care';
      case 3: return 'icon-education';
      case 4: return 'icon-clean-water';
      case 5: return 'icon-shelter';
      case 6: return 'icon-emergency';
      default: return 'icon-healthy-food';
    }
  };

  const iconClass = getIconClass(id);

  return (
    <div
      onClick={handleCardClick}
      className={`relative group rounded-[30px] p-8 transform transition-all duration-500 ease-out min-w-[320px] max-w-[380px] min-h-[400px] flex items-center justify-center cursor-pointer hover:scale-105
        ${id % 3 === 0 ? "bg-image-1" : id % 3 === 1 ? "bg-image-2" : "bg-image-3"} 
        `}>

      {/* Card Content */}
      <div className="relative z-10 text-center ">
        {/* Icon */}
                 <div
           className="w-20 h-20 transition-all duration-300 mx-auto mb-6 rounded-full flex items-center justify-center"
           style={{ backgroundColor: borderColor }}
         >
                     <i className={`text-3xl text-white font-awesome ${iconClass}`} style={{ fontFamily: 'FontAwesome, Arial, sans-serif', transform: 'none' }}></i>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 transition-all duration-300 hover:text-gray-600">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed transition-all duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CharityCard;
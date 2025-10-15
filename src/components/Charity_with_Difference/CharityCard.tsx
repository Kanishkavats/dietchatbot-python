'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  
  // Get translated title and description based on card ID
  const getTranslatedContent = (cardId: number) => {
    switch (cardId) {
      case 1:
      case 4:
        return {
          title: t("Healthy Food"),
          description: t("Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple")
        };
      case 2:
      case 5:
        return {
          title: t("Medical Care"),
          description: t("Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple")
        };
      case 3:
      case 6:
        return {
          title: t("Child Education"),
          description: t("Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple")
        };
      default:
        return {
          title: title,
          description: description
        };
    }
  };

  const translatedContent = getTranslatedContent(id);
  
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
      case 4: return 'icon-healthy-food';
      case 5: return 'icon-medical-care';
      case 6: return 'icon-education';
      default: return 'icon-healthy-food';
    }
  };

  const iconClass = getIconClass(id);

  return (
    <motion.div
      className={`relative group rounded-[30px] p-8 min-w-[270px] max-w-[400px] min-h-[400px] xl:min-h-[450px] flex items-center justify-center
        ${id % 3 === 0 ? "bg-image-1" : id % 3 === 1 ? "bg-image-2" : "bg-image-3"} 
        `}
     
      transition={{ duration: 0.3, ease: "easeOut" }}
    >

      {/* Card Content */}
      <div className="relative z-10 text-center "
      >
        {/* Icon */}
                 <div
           className="w-20 h-20 transition-all duration-300 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-x-[-1]"
           style={{ backgroundColor: borderColor }}
         >
                     <i 
                       className={`text-3xl text-white font-awesome ${iconClass} transition-transform duration-300`} 
                       style={{ 
                         fontFamily: 'FontAwesome, Arial, sans-serif'
                       }}
                     ></i>
        </div>

        {/* Title */}
        <div className='mt-2'>
        <h3 className="text-lg xl:text-2xl font-extrabold text-dark-green mb-4 hover:text-olive-brown transition-all duration-300 ">
          {translatedContent.title}
        </h3>
        </div>

        {/* Description */}
        <p className="text-gray-green text-[15px] leading-7 tracking xs:max-w-[250px] md:max-w-[300px] lg:max-w-[260px]">
          {translatedContent.description}
        </p>
      </div>
    </motion.div>
  );
};

export default CharityCard;

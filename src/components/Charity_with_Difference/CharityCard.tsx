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
      className={`relative group rounded-[30px] flex items-center justify-center
        w-full h-[400px] p-4
        xs:w-full xs:h-[420px] xs:p-5
        sm:w-full sm:h-[450px] sm:p-6
        md:w-full md:h-[480px] md:p-7
        lg:w-full lg:h-[500px] lg:p-8
        xl:w-full xl:h-[520px] xl:p-9
        ${id % 3 === 0 ? "bg-image-1" : id % 3 === 1 ? "bg-image-2" : "bg-image-3"} 
        `}
      style={{
        minWidth: 'min(30vw, 280px)',
        maxWidth: '100%',
        width: '100%',
        height: 'clamp(400px, 50vw, 520px)',
        padding: 'clamp(1rem, 3vw, 2.5rem)'
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >

      {/* Card Content */}
      <div className="relative z-10 text-center "
      >
        {/* Icon */}
        <div
          className="transition-all duration-300 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-x-[-1]"
          style={{ 
            backgroundColor: borderColor,
            width: 'clamp(3.5rem, 8vw, 5rem)',
            height: 'clamp(3.5rem, 8vw, 5rem)',
            marginBottom: 'clamp(1rem, 3vw, 2rem)'
          }}
        >
          <i 
            className={`text-white font-awesome ${iconClass} transition-transform duration-300`} 
            style={{ 
              fontFamily: 'FontAwesome, Arial, sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}
          ></i>
        </div>

        {/* Title */}
        <div className='mt-2'>
          <h3 
            className="font-extrabold text-dark-green hover:text-olive-brown transition-all duration-300"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
              lineHeight: '1.2'
            }}
          >
            {translatedContent.title}
          </h3>
        </div>

        {/* Description */}
        <p 
          className="text-gray-green tracking-wide"
          style={{
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            lineHeight: 'clamp(1.4, 2vw, 1.6)',
            maxWidth: 'clamp(200px, 80%, 320px)',
            margin: '0 auto'
          }}
        >
          {translatedContent.description}
        </p>
      </div>
    </motion.div>
  );
};

export default CharityCard;

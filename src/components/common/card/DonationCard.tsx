



"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedProgressBar from "../AnimatedProgressBar";
import Button from "../Buttons/Button";

interface DonationCardProps {
  card?: {
    id?: string;
    image?: string;
    category?: string;
    title?: string;
    description?: string;
    progress?: number;
    raised?: string | number;
    goal?: string | number;
  };
  isInView: boolean;
  hoveredCard: string | null;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  onCardClick: (id?: string) => void;
}

const DonationCard: React.FC<DonationCardProps> = ({
  card,
  isInView,
  hoveredCard,
  onMouseEnter,
  onMouseLeave,
  onCardClick,
}) => {
  if (!card) {
    return (
      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col h-full">
        <p className="text-gray-500">No campaign data available</p>
      </div>
    );
  }

  // ✅ Parse string or number amounts safely
  const parseAmount = (amount?: string | number) => {
    if (typeof amount === "number") return amount;
    if (typeof amount === "string") {
      return Number(amount.replace(/[^0-9.-]+/g, "")) || 0; // Remove $ or commas
    }
    return 0;
  };

  const raisedAmount = parseAmount(card.raised);
  const goalAmount = parseAmount(card.goal);
  const progress = card.progress || Math.min((raisedAmount / goalAmount) * 100, 100);

  // Truncate description
  const descMaxLength = 100;
  const desc = card.description || "No description available";
  const displayText =
    desc.length > descMaxLength ? desc.slice(0, descMaxLength).concat("...") : desc;

  // Truncate title with "..."
  const titleMaxLength = 20;
  const title = card.title || "No Title";
  const displayTitle =
    title.length > titleMaxLength ? title.slice(0, titleMaxLength).concat("...") : title;

  return (
    <div
      key={card.id}
      className="bg-white rounded-2xl shadow-lg border-15 border-white overflow-hidden relative cursor-pointer flex flex-col h-full min-h-[400px] min-w-[280px]"
      onMouseEnter={() => card.id && onMouseEnter(card.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => onCardClick(card.id)}
    >
      {/* Image with White Border */}
      <div className="relative w-full h-[200px] rounded-t-[20px] rounded-b-[20px] overflow-hidden border-t-[12px] border-x-[12px] border-white">
        {card.image ? (
          <motion.img
            src={card.image}
            alt={card.title || "Campaign Image"}
            className="absolute top-0 left-0 w-full h-full object-cover"
            animate={{ 
              scale: hoveredCard === card.id ? 1.1 : 1,
              rotate: hoveredCard === card.id ? 3 : 0
            }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}

        {/* Category Pill */}
        <span
          className={`absolute top-3 left-3 text-lg font-semibold px-4 py-1 rounded-full font-nunito ${
            hoveredCard === card.id ? "bg-dark-green text-white" : "bg-yellow text-black"
          }`}
        >
          {card.category || "No Category"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-extrabold mb-2 font-nunito transition-colors duration-300 text-gray-900 hover:text-[#6b5103]">{displayTitle}</h3>
        <p className="text-gray-600 text-sm mb-6 font-nunito  flex-grow">{displayText}</p>

        {/* Bottom Section */}
        <div className="bg-gray-100 p-2 rounded-lg mt-auto">
          <AnimatedProgressBar progress={card.progress || 0} isInView={isInView} />
            <div className="flex justify-between text-sm text-gray-500 mt-2 font-nunito">
              <span className="text-dark-green">Raised: {card.raised || "0"}</span>
              <span className="text-dark-green">Goal: <span className="text-[#6b5103] font-bold">{card.goal || "0"}</span></span>
            </div>
          <div className={`transition-all duration-300 mt-4 ${hoveredCard === card.id ? 'group' : ''}`}>
            <button
              className={`w-fit relative cursor-pointer font-semibold font-nunito
                bg-transparent border-2 border-dark-green rounded-full px-6 py-3 
                overflow-hidden group
                before:content-[''] before:absolute before:inset-0 before:bg-dark-green 
                before:transition-transform before:duration-500 
                before:origin-center before:scale-x-0 ${hoveredCard === card.id ? 'before:scale-x-100' : 'hover:before:scale-x-100'} before:z-0`}
              onClick={() => onCardClick(card.id)}
            >
              <div className={`flex items-center justify-center gap-2 relative z-10 font-bold transition-colors duration-300 whitespace-nowrap font-nunito ${
                hoveredCard === card.id ? 'text-white' : 'text-dark-green group-hover:text-white'
              }`}>
                <span className="leading-none">Donate Now</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;

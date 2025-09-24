



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
  const desc = card.description || "No description available";
  const displayText = desc.length > 80 ? desc.slice(0, 80).concat("...") : desc;

  return (
    <div
      key={card.id}
      className="w-[312px] rounded-[16px] bg-white shadow-md overflow-hidden cursor-pointer flex flex-col transition-all hover:shadow-lg gap-6"
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
            animate={{ scale: hoveredCard === card.id ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}

        {/* Category Pill */}
        <span
          className={`absolute top-3 left-3 text-lg px-4 py-1 rounded-full 
            ${hoveredCard === card.id ? "bg-dark-green text-white" : "bg-yellow-400 text-black"}
          `}
        >
          {card.category || "No Category"}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 bg-[#ffffff] flex flex-col flex-grow">
        <h3 className="text-[18px] font-bold text-[#222] mb-2 leading-[28px]">
          {card.title || "No Title"}
        </h3>

        <p className="text-[14px] text-[#667471] leading-[20px] mb-4">
          {displayText}
        </p>

        {/* Donation Progress */}
        <div className="bg-[#9D998B1A] rounded-[12px] p-4 mt-auto">
          <div className="flex justify-between text-[14px] font-semibold text-[#222] mb-2">
            <span>Donation</span>
            <span>{progress.toFixed(0)}%</span>
          </div>

          <AnimatedProgressBar progress={progress} isInView={isInView} />

          <div className="flex justify-between text-[14px] mt-3">
            <span className="text-[#222] font-medium">
              Raised: ${raisedAmount.toLocaleString()}
            </span>
            <span className="text-[#222] font-bold">
              Goal: ${goalAmount.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 flex">
            <button
              onClick={() => onCardClick(card.id)}
              className="py-[13px] px-[30px] text-[15px] font-medium text-black border border-black rounded-full transition-all duration-300 hover:bg-green hover:text-white"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;

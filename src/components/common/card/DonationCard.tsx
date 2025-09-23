

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
    raised?: string;
    goal?: string;
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
  // If card is undefined, render fallback
  if (!card) {
    return (
      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col h-full">
        <p className="text-gray-500">No campaign data available</p>
      </div>
    );
  }

  // Truncate description with "..."
  const maxLength = 120;
  const desc = card.description || "No description available";
  const displayText =
    desc.length > maxLength ? desc.slice(0, maxLength).concat("...") : desc;

  return (
    <div
      key={card.id}
      className="bg-white rounded-2xl shadow-lg border-15 border-white overflow-hidden relative cursor-pointer flex flex-col h-full"
      onMouseEnter={() => card.id && onMouseEnter(card.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => onCardClick(card.id)}
    >
      {/* Image */}
      <div className="relative mb-4 rounded-xl overflow-hidden w-full h-55">
        {card.image ? (
          <motion.img
            src={card.image}
            alt={card.title || "Campaign Image"}
            className="absolute top-0 left-0 w-full h-full object-cover"
            animate={{ scale: hoveredCard === card.id ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <span
          className={`absolute top-3 left-3 text-lg font-semibold px-4 py-1 rounded-full ${
            hoveredCard === card.id ? "bg-green-700 text-white" : "bg-yellow-400 text-black"
          }`}
        >
          {card.category || "No Category"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{card.title || "No Title"}</h3>
        <p className="text-gray-600 text-sm mb-2">{displayText}</p>

        {/* Bottom Section */}
        <div className="bg-gray-100 p-2 rounded-lg mt-auto">
          <AnimatedProgressBar progress={card.progress || 0} isInView={isInView} />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Raised: {card.raised || "0"}</span>
            <span>Goal: {card.goal || "0"}</span>
          </div>
          <Button text="Donate Now" onClick={() => onCardClick(card.id)} />
        </div>
      </div>
    </div>
  );
};

export default DonationCard;

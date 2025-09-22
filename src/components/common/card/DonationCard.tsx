"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedProgressBar from "../AnimatedProgressBar";
import Button from "../Buttons/Button";

interface DonationCardProps {
  card: {
    id: string;
    image: string;
    category: string;
    title: string;
    description: string;
    progress: number;
    raised: string;
    goal: string;
  };
  isInView: boolean;
  hoveredCard: string | null;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  onCardClick: (id: string) => void; // ✅ now uses id
}

const DonationCard: React.FC<DonationCardProps> = ({
  card,
  isInView,
  hoveredCard,
  onMouseEnter,
  onMouseLeave,
  onCardClick,
}) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  // ✅ Truncate description
  const maxLength = 120;
  const isLong = card.description.length > maxLength;
  const displayText = expanded
    ? card.description
    : card.description.slice(0, maxLength) + (isLong ? "..." : "");

  return (
    <div
      key={card.id}
      className="bg-white rounded-2xl shadow-lg border-15 border-white overflow-hidden relative cursor-pointer flex flex-col h-full"
      style={{
        fontFamily: "var(--font-nunito), Nunito, sans-serif",
        fontWeight: "800",
        minWidth: "280px",
      }}
      onMouseEnter={() => onMouseEnter(card.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => onCardClick(card.id)} // ✅ pass id here
    >
      {/* Image */}
      <div className="relative mb-4 rounded-xl overflow-hidden w-full h-55">
        <motion.img
          src={card.image}
          alt={card.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          animate={{
            scale: hoveredCard === card.id ? 1.2 : 1,
            rotate: hoveredCard === card.id ? 10 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
        <span
          className="absolute top-3 left-3 text-lg font-semibold px-7 py-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: hoveredCard === card.id ? "#064E3B" : "#FBBF24",
            color: hoveredCard === card.id ? "#FFFFFF" : "#000000",
          }}
        >
          {card.category}
        </span>
      </div>

      {/* Floating Decoration */}
      <div className="absolute -left-15 top-180 transform -translate-y-1/2 opacity-40 hover:opacity-50 transition-opacity duration-300">
        <Image
          src="/assets/section2/spade.png"
          alt="Hand outline"
          width={80}
          height={80}
          className="animate-[float_3s_ease-in-out_infinite]"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow min-h-[220px]">
        <h3
          className="text-xl font-bold mb-3 transition-colors duration-300 cursor-pointer"
          style={{
            color: hoveredCard === card.id ? "#6b5103" : "#122F2A",
            transition: "color 0.3s ease",
          }}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/campaign/${card.id}`); // ✅ works with id
          }}
        >
          {card.title}
        </h3>

        {/* ✅ Description with toggle */}
        <p className="text-gray-600 font-nunito font-extralight text-sm leading-relaxed mb-2">
          {displayText}
        </p>
        {isLong && (
          <button
            className="text-xs text-yellow-600 font-semibold underline mb-4 self-start"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}

        {/* Bottom Section */}
        <div className="bg-gray-100 p-2 rounded-lg mt-auto">
          {/* Progress Bar */}
          <AnimatedProgressBar progress={card.progress} isInView={isInView} />

          {/* Amounts */}
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Raised: {card.raised}</span>
            <span>Goal: {card.goal}</span>
          </div>

          {/* Donate Button */}
          <div
            className="transition-all duration-300"
            style={{
              transform: hoveredCard === card.id ? "scale(1.02)" : "scale(1)",
              boxShadow:
                hoveredCard === card.id
                  ? "0 4px 12px rgba(34, 197, 89, 0.3)"
                  : "none",
            }}
          >
            <div
              className="border-2 rounded-full w-fit"
              style={{
                borderColor: hoveredCard === card.id ? "#000000" : "#122F2A",
                backgroundColor:
                  hoveredCard === card.id ? "#000000" : "transparent",
              }}
            >
              <Button
                text="Donate Now"
                bgColor="bg-transparent"
                textColor={
                  hoveredCard === card.id ? "text-white" : "text-[#122F2A]"
                }
                hoverTextColor="group-hover:text-white"
                hoverBg={
                  hoveredCard === card.id
                    ? "before:bg-transparent"
                    : "before:bg-black"
                }
                rounded="rounded-full"
                paddingx="px-4"
                paddingy="py-3"
                icon=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;


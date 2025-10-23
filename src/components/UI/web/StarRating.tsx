"use client";

import React from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  className = "text-yellow",
  size = 20,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: max }).map((_, i) => {
        if (i < fullStars) {
          return <IoMdStar key={i} className={`w-[${size}px] h-[${size}px]`} />;
        } else if (i === fullStars && hasHalfStar) {
          return <IoMdStarHalf key={i} className={`w-[${size}px] h-[${size}px]`} />;
        } else {
          return <IoMdStarOutline key={i} className={`w-[${size}px] h-[${size}px]`} />;
        }
      })}
    </div>
  );
};

export default StarRating;

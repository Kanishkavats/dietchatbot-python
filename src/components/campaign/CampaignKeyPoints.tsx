"use client";

import React from "react";

const CampaignKeyPoints = ({ points }: { points: string[] }) => {
  if (!points || points.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-2 my-6 text-sm">
      {points.map((point, idx) => (
        <li key={idx} className="flex items-center gap-2">
          ✅ {point}
        </li>
      ))}
    </ul>
  );
};

export default CampaignKeyPoints;

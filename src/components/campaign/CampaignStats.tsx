"use client";

import React from "react";
import AnimatedProgressBar from "@/src/components/common/AnimatedProgressBar";

const CampaignStats = ({ data }: { data: any }) => (
  <div className="mb-6">
    <p className="font-medium mb-2">Donation Progress</p>
    <AnimatedProgressBar
      progress={(data.raisedAmount / data.goalAmount) * 100}
      isInView={true}
    />
  </div>
);

export default CampaignStats;

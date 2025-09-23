"use client";

import React from "react";
import FadeUpCard from "@/src/animations/FadeButtomUp";
import DonationCard from "@/src/components/common/card/DonationCard";

const CampaignOtherList = ({ sectionRef, campaigns, isInView, onCardClick }: any) => {
  if (!campaigns || campaigns.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-gray-800">More </span>
          <span className="text-yellow-400">Campaigns</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((card: any, index: number) => (
          <FadeUpCard key={card.id || index} delay={index * 0.2}>
            <DonationCard
              backgroundImage={card.image}
              subtitle={card.category}
              title={card.title}
              buttonText="View Details"
              onButtonClick={() => onCardClick(card.id)}
            />
          </FadeUpCard>
        ))}
      </div>
    </section>
  );
};

export default CampaignOtherList;

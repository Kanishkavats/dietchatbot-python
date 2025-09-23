"use client";

import React from "react";
import DonationCard from "@/src/components/common/card/DonationCard";

const RecentCauses = ({ causes }: { causes: any[] }) => {
  if (!causes || causes.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="font-bold text-xl mb-6">Recent Causes</h3>
      {causes.map((cause) => (
        <DonationCard
          key={cause.id}
          backgroundImage={cause.image}
          subtitle={cause.category}
          title={cause.title}
          buttonText="View"
          onButtonClick={() => {}}
        />
      ))}
    </div>
  );
};

export default RecentCauses;

"use client";

import React from "react";

const CampaignInfo = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={data.images?.[0] || "/default-image.jpg"}
          alt={data.title}
          className="w-[350px] h-[400px] object-cover rounded-2xl shadow-md"
        />
      </div>

      <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-gray-600 mb-6">{data.description}</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p><strong>Category:</strong> {data.category}</p>
          <p><strong>Goal:</strong> ${data.goalAmount}</p>
          <p><strong>Raised:</strong> ${data.raisedAmount}</p>
          <p><strong>Location:</strong> {data.location}</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;

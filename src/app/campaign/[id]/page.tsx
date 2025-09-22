


"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useFetchSingleCampaign } from "@/src/hooks/useCampaigns";
import AnimatedProgressBar from "@/src/components/common/AnimatedProgressBar";
import Button from "@/src/components/common/Buttons/Button";

import BlogPost from "@/src/components/charity_with_difference/BlogPost";

const CampaignDetails: React.FC = () => {
  const { id } = useParams();
  console.log(id);

  if (!id) return <p>No campaign ID provided.</p>;

  const { data, isLoading, isError } = useFetchSingleCampaign(id);

  if (isLoading) return <p>Loading campaign details...</p>;
  if (isError) return <p>Failed to load campaign details.</p>;
  if (!data) return <p>No campaign found.</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      {/* BlogPost for this campaign (if related) */}
      <BlogPost blogId={id} />

      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      <img
        src={data.images?.[0] || "/default-image.jpg"}
        alt={data.title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      <p className="text-gray-700 mb-4">{data.description}</p>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p><strong>Category:</strong> {data.category}</p>
        <p><strong>Goal:</strong> ${data.goalAmount}</p>
        <p><strong>Raised:</strong> ${data.raisedAmount}</p>
      </div>

      <AnimatedProgressBar
        progress={(data.raisedAmount / data.goalAmount) * 100}
        isInView={true}
      />

      {data.keyPoints && data.keyPoints.length > 0 && (
        <ul className="list-disc list-inside my-4">
          {data.keyPoints.map((point: string, idx: number) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <Button
          text="Donate Now"
          bgColor="bg-yellow-400"
          textColor="text-black"
          hoverTextColor="text-white"
          hoverBg="before:bg-black"
          rounded="rounded-full"
          paddingx="px-6"
          paddingy="py-3"
          icon=""
        />
      </div>
    </div>
  );
};

export default CampaignDetails;


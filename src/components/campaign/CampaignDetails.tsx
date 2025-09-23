/* eslint-disable react-hooks/rules-of-hooks */


"use client";

import React, { useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useFetchSingleCampaign,
  useFetchAllCampaigns,
} from "@/src/hooks/useCampaigns";
import { useInView } from "framer-motion";

import CampaignInfo from "./CampaignInfo";
import CampaignSidebar from "./CampaignSidebar";

const CampaignDetails: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  if (!id) return <p>No campaign ID provided.</p>;

  const { data, isLoading, isError } = useFetchSingleCampaign(id);

  const [page] = useState(1);
  const { data: allCampaigns } = useFetchAllCampaigns(page, 10);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const campaignsToDisplay = useMemo(() => {
    if (!allCampaigns?.campaigns) return [];
    return allCampaigns.campaigns
      .filter((c: any) => (c._id || c.id) !== id)
      .map((campaign: any) => ({
        id: campaign._id || campaign.id,
        image: campaign.images?.[0] || "/default-image.jpg",
        category: campaign.category,
        title: campaign.title,
        description: campaign.description,
        progress: (campaign.raisedAmount / campaign.goalAmount) * 100,
        raised: `$${campaign.raisedAmount}`,
        goal: `$${campaign.goalAmount}`,
      }));
  }, [allCampaigns, id]);

  const handleCardClick = (cardId: string) => {
    router.push(`/campaign/${cardId}`);
  };

  if (isLoading) return <p>Loading campaign details...</p>;
  if (isError) return <p>Failed to load campaign details.</p>;
  if (!data) return <p>No campaign found.</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Main content */}
        <div className="lg:col-span-2 space-y-6">
          <CampaignInfo data={data} />
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 mt-6 md:mt-0">
          <CampaignSidebar allCampaigns={allCampaigns?.campaigns || []} />
        </div>
      </div>

      
    </div>
  );
};

export default CampaignDetails;




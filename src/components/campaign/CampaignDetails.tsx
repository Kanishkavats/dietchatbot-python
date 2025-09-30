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
import CustomLoader from "../common/Loader/CustomLoader";


const CampaignDetails: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  if (!id) return <p>No campaign ID provided.</p>;

  const { data, isLoading, isError } = useFetchSingleCampaign(id);

  const [page] = useState(1);
  // const { data: allCampaigns } = useFetchAllCampaigns(page, 10);
  const { data: allCampaigns, isLoading: allCampaignsLoading } = useFetchAllCampaigns(page, 10);

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

  // if (isLoading) return <p>Loading campaign details...</p>;
  if (isLoading) return <CustomLoader />;

  if (isError) return <p>Failed to load campaign details.</p>;
  if (!data) return <p>No campaign found.</p>;

  return (
    <div className="bg-[#ffffff] font-sans text-[#667471] w-full">
      <div className="container mx-auto px-0.5 sm:px-1 md:px-8 py-4 md:py-8">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
          {/* Left/Main content */}
          <main className="w-full  p-1 sm:p-1 bg-white">
            <CampaignInfo
              data={data}
              allCampaigns={allCampaigns?.campaigns || []}
              id={id}
            />
          </main>

          {/* Sidebar */}
          <aside className="w-full  space-y-6 lg:space-y-8">
            {/* <CampaignSidebar allCampaigns={allCampaigns?.campaigns || []} /> */}
            {allCampaignsLoading ? (
  <CustomLoader />
) : (
  <CampaignSidebar allCampaigns={allCampaigns?.campaigns || []} />
)}

          </aside>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;

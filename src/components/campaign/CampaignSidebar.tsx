


"use client";

import React, { useState } from "react";
import SearchBox from "./SearchBox";
import RecentCauses from "./RecentCauses";
import TagList from "./TagList";
import DynamicDonationCards from "./DynamicDonationCards"; // import new component

import {  heartLogoIcon, overView } from "@/public/assets";

const CampaignSidebar = ({ allCampaigns = [] }: { allCampaigns?: any[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleTagClick = (tag: string) => setSelectedTag(tag);

  const filteredCampaigns = allCampaigns
    .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((c) => (selectedTag ? c.category === selectedTag : true));

  const tags = [...new Set(allCampaigns.map((c) => c.category))];

  return (
    <div className="flex flex-col gap-6 pl-1 mt-25">
      <SearchBox onSearch={handleSearch} />
      <RecentCauses causes={filteredCampaigns.slice(0, 5)} />
      <TagList tags={tags} onClick={handleTagClick} selectedTag={selectedTag} />

      {/* Dynamic Donation Cards Component */}
      
       <DynamicDonationCards
                icon={heartLogoIcon.src}
                backgroundImage={overView.src}
                subtitle="Small Donations Bigger Impact"
                title="Education Health For Every Child"
                buttonText="Get A Quote"
                onButtonClick={() => console.log("Button Clicked!")}
        />
    </div>
  );
};

export default CampaignSidebar;




"use client";

import CampaignDetails from "@/src/components/campaign/CampaignDetails";

import { bannerBg } from "@/public/assets";
import PageBanner from "@/src/components/common/PageBanner";

const CampaignPage = () => {
   return (
    <><PageBanner bgImage={bannerBg} title="Help Campaign" /><CampaignDetails />
       
       </>
  


   )
  
};

export default CampaignPage;








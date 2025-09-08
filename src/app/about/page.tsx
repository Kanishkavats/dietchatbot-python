import { ChildrenNeed,  ScrollImgSection, SendMsg, ValueableCustomer } from "@/src/components/About";
import {VolunteerTeam} from "@/src/components/About";
import PageBanner from "@/src/components/common/PageBanner";
import FAQSection from "@/src/components/FAQ/FAQSection";
import HelpingEachOther from "@/src/components/HelpingEachOther";
import React from "react";

const Page = () => {
  return (
    <div>
      <PageBanner bgImage="/assets/banner-bg.png" title="About us"/>
      <HelpingEachOther/>
      <ChildrenNeed/>
      <VolunteerTeam/>
      <FAQSection/>
      <ValueableCustomer/>
      <SendMsg/>
      <ScrollImgSection/>
    </div>
  );
};

export default Page

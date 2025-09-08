import { ChildrenNeed,  ScrollImgSection, SendMsg, ValueableCustomer } from "@/src/components/About";
import {VolunteerTeam} from "@/src/components/About";
import FAQ from "@/src/components/FAQ";
import HelpingEachOther from "@/src/components/HelpingEachOther/HelpingEachOther";
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

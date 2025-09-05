import { ChildrenNeed,  ScrollImgSection, SendMsg, ValueableCustomer } from "@/src/components/About";
import {VolunteerTeam} from "@/src/components/About";
import FAQ from "@/src/components/FAQ";
import HelpingEachOther from "@/src/components/HelpingEachOther";
import React from "react";

const Page = () => {
  return (
    <div>
      <HelpingEachOther/>
      <ChildrenNeed/>
      <VolunteerTeam/>
      <ValueableCustomer/>
      <FAQ/>
      <SendMsg/>
      <ScrollImgSection/>
    </div>
  );
};

export default Page

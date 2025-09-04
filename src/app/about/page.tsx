import { ChildrenNeed, ScrollImgSection, SendMsg, ValueableCustomer } from "@/src/components/About";
import {VolunteerTeam} from "@/src/components/About";
import React from "react";

const Page = () => {
  return (
    <div>
      <ChildrenNeed/>
      <VolunteerTeam/>
      <ValueableCustomer/>
      <SendMsg/>
      <ScrollImgSection/>
    </div>
  );
};

export default Page

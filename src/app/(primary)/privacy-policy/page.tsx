"use client";

import React from "react";
import Banner from "@/src/helper/PageBanner";
import { ourteambanner } from "@/public/assets";
import PrivacyPolicyPage from "@/src/components/Primary/PrivacyPolicy";

const PrivacyPolicy = () => {
  return (
    <div>
      <Banner bgImage={ourteambanner} title="Privacy Policy" />
      <PrivacyPolicyPage />
    </div>
  );
};

export default PrivacyPolicy;

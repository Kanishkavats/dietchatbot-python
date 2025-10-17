"use client";

import { useParams } from "next/navigation";
import PageBanner from "@/src/components/common/PageBanner";
import VolunteerProfile from "@/src/components/volunteer/VolunteerProfile";

const Page = () => {
  const { id } = useParams();
  return (
    <div>
      <PageBanner bgImage="/assets/banner-bg.png" title="Team Details" />
      <VolunteerProfile id={id as string}  />
    </div>
  );
};

export default Page;

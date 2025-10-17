"use client";

import React from "react";
import { VolunteerCard } from "../common/card/VolunteerCard";
import { VolunteerGridProps } from "@/src/types/members";

export const VolunteerGrid: React.FC<VolunteerGridProps> = ({ members }) => {
  return (
    <div
      className=" grid grid-cols-1 sm:grid-cols-2  max-[1199px]:grid-cols-2  min-[1200px]:grid-cols-4  gap-6 max-w-[1200px]  mx-auto  p-8 "
    >
      {members.map((member, idx) => (
        <VolunteerCard key={member.id} member={member} idx={idx} />
      ))}
      kumar chandan check
    </div>
  );
};

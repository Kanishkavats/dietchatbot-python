"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import PageBanner from "@/src/components/common/PageBanner";
import VolunteerProfile from "@/src/components/About/VolunteerProfile";
import {
  useFetchAllMembers,
  useFetchSingleMember,
} from "@/src/hooks/useMembers";
import Pagination from "@/src/components/common/Pagination";

const Page = () => {
  const { id } = useParams();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch all members (for list / pagination)
  const { data: allMembersData, isLoading: isAllLoading } = useFetchAllMembers(
    currentPage,
    itemsPerPage
  );

  // ✅ Fetch single member (for detail page)
  const {
    data: member,
    isLoading: isSingleLoading,
    isError: isSingleError,
  } = useFetchSingleMember(id as string);

  // Loading state
  if (isAllLoading || isSingleLoading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  // Single member error
  if (isSingleError || !member) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Member not found</h2>
      </div>
    );
  }

  // Map all members if you want to show list/pagination
  const membersList = allMembersData?.members || [];
  const totalPages = allMembersData?.totalPages || 1;

  return (
    <div>
      {/* Page Banner */}
      <PageBanner bgImage="/assets/banner-bg.png" title="Team Details" />

      {/* Single member profile */}
      <VolunteerProfile member={member} />

      {/* Optional: List of all members with pagination */}
       {/* <div className="mt-12 px-4 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Other Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {membersList.map((m: any) => (
            <div key={m.id} className="bg-[#f1f0ee] p-4 rounded-lg text-center">
              <img
                src={m.imageUrl || "/assets/default-avatar.png"}
                alt={m.name}
                className="w-full h-40 object-cover rounded"
              />
              <h4 className="font-semibold mt-2">{m.name}</h4>
              <p className="text-sm">{m.position}</p>
            </div>
          ))}
        </div>*/}

      {/* Pagination */}
     {/* {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            groupSize={3}
          />
        )}
      </div>*/}
    </div>
  );
};

export default Page;

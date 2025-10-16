"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import PageBanner from "@/src/components/common/PageBanner";
import VolunteerProfile from "@/src/components/volunteer/VolunteerProfile";
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
    error: singleError,
  } = useFetchSingleMember(id as string);

  // Debug logging
  console.log('Volunteer detail page debug:', {
    id,
    member,
    isSingleLoading,
    isSingleError,
    singleError
  });

  // Don't block the entire page with loading - show static content immediately

  // Try to find member in all members list as fallback
  const fallbackMember = allMembersData?.members?.find((m: any) => m.id === id);
  
  // Transform fallback data to match expected format
  const transformedFallback = fallbackMember ? {
    id: fallbackMember.id,
    name: fallbackMember.name,
    position: fallbackMember.position,
    image: fallbackMember.image || fallbackMember.imageUrl || fallbackMember.img,
    imageUrl: fallbackMember.image || fallbackMember.imageUrl || fallbackMember.img,
    facebookUrl: fallbackMember.facebookUrl,
    twitterUrl: fallbackMember.twitterUrl,
    instagramUrl: fallbackMember.instagramUrl,
    linkedInUrl: fallbackMember.linkedInUrl,
    vimeoUrl: fallbackMember.vimeoUrl,
    behanceUrl: fallbackMember.behanceUrl,
    about: fallbackMember.about,
    role: fallbackMember.role,
    delay: 0
  } : null;

  // Map all members if you want to show list/pagination
  const membersList = allMembersData?.members || [];
  const totalPages = allMembersData?.totalPages || 1;

  return (
    <div>
      {/* Page Banner - Always show immediately */}
      <PageBanner bgImage="/assets/banner-bg.png" title="Team Details" />

      {/* Single member profile - Handle loading state here */}
      {isSingleLoading ? (
        <div className="text-center py-20">
          <p className="text-lg font-semibold text-gray-600">Loading volunteer details...</p>
        </div>
      ) : member ? (
        <VolunteerProfile member={member} isLoading={isSingleLoading} />
      ) : fallbackMember ? (
        <VolunteerProfile member={transformedFallback} isLoading={isSingleLoading} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Member not found</h2>
          <p className="text-gray-600 mt-2">ID: {id}</p>
          {singleError && (
            <div className="mt-4">
              <p className="text-red-500 mb-2">Error: {singleError.message}</p>
              {singleError.message?.includes('Authentication') && (
                <div className="mt-4">
                  <p className="text-blue-600 mb-2">This might be an authentication issue.</p>
                  <button 
                    onClick={() => window.location.href = '/login'}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      
    </div>
  );
};

export default Page;

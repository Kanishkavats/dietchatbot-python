"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../common/Buttons/Button";
import Image from "next/image";
import { teamMembers } from "@/src/staticResource";
import Pagination from "../common/Pagination";
import { VolunteerCard } from "../common/card/VolunteerCard";






const VolunteerTeam = () => {
  const router = useRouter();
  const itemsPerPage = 4;
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [showPagination, setShowPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewAll = () => {
    router.push('/team');
  };

  const membersToShow = showPagination
    ? teamMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : teamMembers.slice(0, visibleCount);

  return (
    <section className="relative bg-cover py-16 bg-center w-full bg-[url('/assets/bg-one-volunteer.png')]">
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="flex items-center text-[#046b59] justify-center gap-2 mb-2">
          <i className="text-2xl hand-icon"></i>
          <span className="font-caveat text-2xl font-semibold">
            Start Donating Poor People
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Meet Our Volunteer <br />
          <span className="text-yellow">Team</span> Members
        </h2>
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membersToShow.map((member, idx) => (
              <VolunteerCard key={idx} member={member} idx={idx} />
            ))}
          </div>
        </div>

        {!showPagination && visibleCount < teamMembers.length && (
          <div className="flex items-center w-[200px] h-[80px] justify-center mt-6">
            <Button
              text="View All"
              bgColor="bg-[#FFC107]"
              textColor="text-black"
              hoverTextColor="group-hover:text-white"
              hoverBg="before:bg-[#046b59]"
              onClick={handleViewAll}
            />
          </div>
        )}

        {showPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page < 1 || page > totalPages) return;
              setCurrentPage(page);
            }}
            groupSize={3}
          />
        )}
      </div>

      <div className="top absolute top-[10%] right-[6%] z-[-1] font-bold">
        <Image
          src="/assets/greenspade.png"
          alt="green spade"
          width={70}
          height={70}
          className="animate-dip-dop drop-shadow-[3px_3px_6px_rgba(0,113,93,0.9)]"
        />
      </div>
    </section>
  );
};

export default VolunteerTeam;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../common/Buttons/Button";
import Image from "next/image";
import Pagination from "../common/Pagination";
import { VolunteerCard } from "../common/card/VolunteerCard";
import { bgOneVolunteer, greenspade } from "../../../public/assets";
import { useTranslation } from "react-i18next";
import { useFetchAllMembers } from "@/src/hooks/useMembers";

const VolunteerTeam = () => {
  const router = useRouter();
  const { t } = useTranslation();

  // pagination setup

  const [showPagination, setShowPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = currentPage === 1 && !showPagination ? 4 : 8;

  //  fetch members from API
  const { data, isLoading, isError } = useFetchAllMembers(
    currentPage,
    itemsPerPage
  );
  console.log(data);

  // safely extract members
  const members = data?.members || [];
  const totalPages = data?.totalPages || 1;

  const handleViewAll = () => {
    setShowPagination(true);
    setCurrentPage(1);
  };

  return (
    <section
      className="relative bg-cover py-16 bg-center w-full"
      style={{  backgroundImage: `url(${bgOneVolunteer.src})` }}
    >
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="flex items-center text-[#046b59] justify-center gap-2 mb-2">
          <i className="text-2xl hand-icon"></i>
          <span className="font-caveat text-2xl font-semibold">
            {t("Start Donating Poor People")}
          </span>
        </div>
        {/*<h2 className="text-4xl md:text-5xl font-bold mb-8">
          {t("Meet Our Volunteer")} <br />
          <span className="text-yellow">{t("Team")}</span> {t("Members")}
        </h2>*/}

      <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-8 text-center">
  <span className="hidden xl:inline">
    {t("Meet Our Volunteer")} <br />
    <span className="text-yellow">{t("Team")}</span> {t("Members")}
  </span>

  <span className="inline xl:hidden whitespace-nowrap">
    {t("Meet Our Volunteer")} <span className="text-yellow">{t("Team")}</span> {t("Members")}
  </span>
</h2>



        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          {isLoading && <p>Loading members...</p>}
          {isError && <p>Failed to load members.</p>}
          {!isLoading && !isError && (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* <div className="volunteer-grid">  */}

              {members.map((member: any, idx: number) => (
                <VolunteerCard
                  key={member.id || idx}
                  member={member}
                  idx={idx}
                
                />
              ))}
            </div>
          )}
        </div>

        {/* View All button (switches to pagination mode) */}
        {!showPagination && members.length > 0 && (
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

        {/* Pagination controls */}
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

      <div className="top absolute top-[10%] right-[6%] z-0 font-bold hidden xl:block">
      
        <Image
          src={greenspade}
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

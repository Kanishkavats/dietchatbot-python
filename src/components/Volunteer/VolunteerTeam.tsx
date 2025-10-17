"use client";

import { useRouter } from "next/navigation";
import Button from "../common/Buttons/Button";
import Image from "next/image";
import { bgOneVolunteer, greenspade } from "../../../public/assets";
import { Trans, useTranslation } from "react-i18next";
import { useFetchAllMembers } from "@/src/hooks/useMembers";
import { VolunteerCard } from "../common/card/VolunteerCard";
import { TeamMember } from "@/src/types/members";
import CustomLoader from "../common/Loader/CustomLoader";

const VolunteerTeam = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const itemsPerPage = 4;

  // Fetch members from API
  const { data, isLoading, isError } = useFetchAllMembers(
    1,
    itemsPerPage
  );

  // Safely extract members
  const members = data?.members || [];

  // Hide component if no data is available
  if (!isLoading && (!data?.members || data.members.length === 0)) {
    return null;
  }



  const handleViewAll = () => {
    router.push('/team');
  };

  return (
    <section
      className="relative bg-cover py-16  w-full" 
      style={{ backgroundImage: `url(${bgOneVolunteer.src})` }}
    >
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center " >
        <div className="flex items-center text-green justify-center gap-3 mb-2">
          <i className="text-2xl hand-icon"></i>
          <span className="font-caveat text-2xl font-semibold">
            {t("Start Donating Poor People")}
          </span>
        </div>
        <h2 className="text-[23px] md:text-4xl lg:text-5xl font-bold mb-8">
          <Trans i18nKey={t('Meet Our Volunteer Team Members')} components={{ 1: <span className="text-yellow"></span> }} />
        </h2>

        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          {isLoading && <CustomLoader />}
          {isError && <p>Failed to load members.</p>}
          {!isLoading && !isError && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3"
            >
              {members.map((member: any, idx: number) => (
                <VolunteerCard key={member.id || idx} member={member} idx={idx} />
              ))}
            </div>
          )}
        </div>

        {/* View All button */}
        {members.length > 0 && (
          <div className="flex items-center w-[170px] h-[90px] justify-center mt-6">
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

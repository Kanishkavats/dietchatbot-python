"use client";

import { useRouter } from "next/navigation";
import Button from "../../UI/web/Buttons/Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useFetchAllMembers } from "@/src/hooks/web/useMembers";
import { VolunteerCard } from "../Team/TeamMemberCard";
import CustomLoader from "../../UI/web/Loader/CustomLoader";
import { useEffect, useState } from "react";
import { bgOneVolunteer, greenspade } from "@/public/assets";

const VolunteerTeam = ({ bg = '' }: { bg?: string }) => {

  const router = useRouter();
  const [bgColor, setBgColor] = useState<string>();
  const { t } = useTranslation();

  useEffect(() => {
    if (bg && bg.trim() !== '') {
      setBgColor(bg)
    } else {
      setBgColor(`bg-[url('/assets/bg-one-volunteer.png')]`)
    }
  })

  const itemsPerPage = 4;

  const { data, isLoading, isError } = useFetchAllMembers(
    1,
    itemsPerPage
  );
  console.log("member form bolunteer team", data)

  const members = data?.members || [];

  if (!isLoading && (!data?.members || data.members.length === 0)) {
    return null;
  }



  const handleViewAll = () => {
    router.push('/team');
  };

  return (
    <section
      className={`relative bg-cover py-16 lg:py-30 xl:py-20 bg-center ${bgColor} w-full px-3 lg:px-0 flex justify-center items-center `}
      style={{ backgroundImage: `url(${bgOneVolunteer.src})` }}
    >
      <div className="w-full md:w-10/11 flex flex-col items-center justify-center  text-center ">
        <div className="flex items-center text-green justify-center gap-3 mb-2">
          <i className="text-lg lg:text-2xl hand-icon"></i>
          <span className="font-caveat text-xl md:text-2xl lg:text-2xl font-semibold">
            {t("Start Donating Poor People")}
          </span>
        </div>

        <h2 className="text-[30px] p-0 md:text-[40px] lg:text-[42px] xl:text-[56px] text-center lg:max-w-[500px] xl:max-w-xl font-nunito text-dark-green font-[800]   sm:text-center ">
          <span className="">{t("Meet Our Volunteer")}</span>{' '}
          <span className=" text-yellow">
            {t("Team")}
          </span>
          <span>{' '}</span>
          <span className="">{t("Members")}</span>
        </h2>


        <div className="w-full  py-8 ">
          {isLoading && <div><CustomLoader /></div>}
          {isError && <p className="text-red-500">No Member</p>}
          {!isLoading && !isError && (
            <div
              className=" grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-3 md:gap-5 space-y-5 xl:gap-7"
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

      <div className="">
        <div className="top absolute top-[10%] md:top-[220] lg:top-[130] lg:right-[50] md:right-[-45] xl:right-[6%] z-0 font-bold hidden md:block">
          <Image
            src={greenspade}
            alt="green spade"
            className="animate-dip-dop w-10 h-10  lg:h-16 lg:w-16 drop-shadow-[3px_3px_6px_rgba(0,113,93,0.9)]"
          />
        </div>
      </div>
    </section>
  );
};

export default VolunteerTeam;

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { FaBehance, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Pagination from "@/src/components/common/Pagination";
import { motion, useAnimation, useInView } from "framer-motion";
import { useFetchAllMembers, useFetchSingleMember } from "@/src/hooks/useMembers";
import { Trans, useTranslation } from "react-i18next";
import CustomLoader from "./common/Loader/CustomLoader";
import { VolunteerCard } from "./common/card/VolunteerCard";

// Helper function to find image URL from various possible field names
const getImageUrl = (member: ApiMember): string | undefined => {
  const possibleImageFields = [
    'imageUrl', 'image', 'avatar', 'profileImage', 'photo', 'picture',
    'profile_image', 'profile_picture', 'avatar_url', 'image_url'
  ];

  for (const field of possibleImageFields) {
    if (member[field] && typeof member[field] === 'string' && member[field].trim() !== '') {
      console.log(`Found image in field '${field}':`, member[field]);
      return member[field];
    }
  }

  console.log('No image found in any field for member:', member.name);
  return undefined;
};

// API member type
interface ApiMember {
  id: string;
  name: string;
  position: string;
  imageUrl?: string;
  image?: string;
  avatar?: string;
  profileImage?: string;
  photo?: string;
  picture?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  behanceUrl?: string;
  [key: string]: any; // Allow for additional fields
}

// VolunteerCard type
interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl?: string;
  delay?: number;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  behanceUrl?: string;
}

interface VolunteerCardProps {
  member: TeamMember;
  idx: number;
}

// Social buttons
const SocialBar = ({ member }: { member: TeamMember }) => {
  const socials = [
    { icon: <FaFacebookF />, url: member.facebookUrl },
    { icon: <FaTwitter />, url: member.twitterUrl },
    { icon: <FaInstagram />, url: member.instagramUrl },
    { icon: <FaBehance />, url: member.behanceUrl },
  ];

  return (
    <div className="flex flex-col gap-2 p-2">
      {socials
        .filter((social) => social.url)
        .map((social, idx) => (
          <a
            key={idx}
            href={social.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full shadow-md text-black bg-white hover:bg-yellow-400 transition-all duration-300 z-50"
          >
            {social.icon}
          </a>
        ))}
    </div>
  );
};

// VolunteerCard component



// Main Ourteams component
const Ourteams = () => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [editMember, setEditMember] = useState<string | null>(null);
  const {t} = useTranslation();

  // ✅ Fetch all members
  const { data: memberData, isLoading } = useFetchAllMembers(currentPage, itemsPerPage);

  // ✅ Fetch single member
  const { data: singleMemberData, isLoading: isLoadingMember } = useFetchSingleMember(editMember || undefined);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <CustomLoader />
      </div>
    );
  }



  // Map API data with proper typing
  const members: TeamMember[] =
    memberData?.members.map((m: ApiMember, idx: number) => {
      console.log(`Member ${m.name} data:`, m);
      console.log(`Available fields in member:`, Object.keys(m));
      const imageUrl = getImageUrl(m);
      return {
        id: m.id,
        name: m.name,
        position: m.position,
        imageUrl: imageUrl,
        delay: idx * 0.2,
        facebookUrl: m.facebookUrl,
        twitterUrl: m.twitterUrl,
        instagramUrl: m.instagramUrl,
        behanceUrl: m.behanceUrl,
      };
    }) || [];


  const totalPages: number = memberData?.totalPages || 1;

  return (
    <section className="relative bg-cover py-16 bg-center w-full bg-[url('/assets/bg-one-volunteer.png')]">
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="flex items-center text-green justify-center gap-2 mb-3">
          <i className="text-xl lg:text-2xl hand-icon"></i>
          <span className="font-caveat text-[16px] lg:text-2xl font-semibold">
            {t("Start Donating Poor People")}
          </span>
        </div>
        <h2 className="text-[23px] md:text-4xl lg:text-5xl font-bold mb-8">
          <Trans i18nKey={t('Meet Our Volunteer Team Members')} components={{1:<span className="text-yellow"></span>}} />
        </h2>

        <div className="w-full  px-4 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {members.map((member, idx) => (
              <VolunteerCard key={member.id} member={member} idx={idx} />
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            groupSize={3}
          />
        )}

       
      </div>

      <div className="top absolute hidden xl:block top-[10%] right-[6%] z-[-1] font-bold">
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

export default Ourteams;
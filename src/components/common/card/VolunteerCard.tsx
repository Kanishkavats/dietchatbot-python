"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaBehance, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

interface TeamMember {
  id: string;
  name: string;
  role?: string;
  position?: string;
  image?: string;
   facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  behanceUrl?: string;
  vimeoUrl?: string;
}

interface VolunteerCardProps {
  member: TeamMember;
  idx: number;
}

const SocialBar: React.FC<{ member: TeamMember }> = ({ member }) => {
  const socials = [
    { icon: <FaFacebookF />, url: member.facebookUrl },
    { icon: <FaTwitter />, url: member.twitterUrl },
    { icon: <FaInstagram />, url: member.instagramUrl },
    { icon: <FaBehance />, url: member.behanceUrl },
  ];

// Social icons
{/*const SocialBar = () => {
  const socials = [
    { icon: <FaFacebookF />, url: member.facebook },
    { icon: <FaTwitter /> },
    { icon: <FaInstagram /> },
    { icon: <FaBehance /> },
  ];
*/}
  return (
    <div className="flex flex-col gap-2 p-2">
       {socials
        .filter((social) => social.url) // only show icons with a valid URL
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
     {/* {socials.map((social, idx) => (
        <button
          key={idx}
          className="w-12 h-12 flex items-center justify-center rounded-full shadow-md text-black bg-white hover:bg-yellow-400 transition-all duration-300 z-50"
        >
          {social.icon}
        </button>
      ))}
    </div>
  );
};*/}

// Volunteer card
export const VolunteerCard: React.FC<VolunteerCardProps> = ({ member }) => {
  const router = useRouter();
  const [showSocials, setShowSocials] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasSocialAccounts = !!(
  member.facebookUrl ||
  member.twitterUrl ||
  member.instagramUrl ||
  member.behanceUrl
);

console.log(`Member: ${member.name}`);
console.log("Has any social account?", hasSocialAccounts);
if (hasSocialAccounts) {
  if (member.facebookUrl) console.log("  Facebook:", member.facebookUrl);
  if (member.twitterUrl) console.log("  Twitter:", member.twitterUrl);
  if (member.instagramUrl) console.log("  Instagram:", member.instagramUrl);
  if (member.behanceUrl) console.log("  Behance:", member.behanceUrl);
}


  const isActive = showSocials || isHovered;

  const bgClass = isActive ? "bg-[#122f2a]" : "bg-[#f1f0ee]";
  const nameColor = isActive ? "text-white" : "text-black";
  const roleColor = isActive ? "text-yellow-400" : "text-black";

  return (
    <motion.div
      className="relative shadow rounded-2xl overflow-hidden w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[9/10] cursor-pointer overflow-hidden">
        <Image
          src={member.image || "/assets/default-avatar.png"}
          alt={member.name || "Member"}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onClick={() => router.push(`/volunteer/${member.id}`)}
        />

        {/* Desktop hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 right-2 z-50 flex flex-col gap-2 pb-4 hidden lg:flex"
        >
         {hasSocialAccounts && <SocialBar member={member} />}
        </motion.div>

        {/* Mobile/Tablet click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showSocials ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-6  right-2 z-50 flex flex-col gap-2 lg:hidden ${
            showSocials ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {hasSocialAccounts && <SocialBar member={member} />}
        </motion.div>
      </div>

      {/* Bottom content */}
      <div
        className={`relative h-28 p-8 flex flex-col items-start transition-all duration-500 ${bgClass}`}
      >
        <h6
          className={`font-semibold text-md transition-colors duration-300 ${nameColor}`}
        >
          {member.name}
        </h6>
        <p
          className={`text-sm mt-2 transition-colors duration-300 ${roleColor}`}
        >
          {member.role || member.position}
        </p>

        {/* Plus button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowSocials((prev) => !prev);
          }}
          className={`absolute top-[-22px] right-4 w-12 h-12 flex items-center justify-center bg-black text-white rounded-full transition-all duration-300 overflow-visible 
              ${showSocials || isHovered ? "bg-yellow-400 text-black" : "bg-black text-white"}`}
        >
          <span
            className={`inline-block transition-transform duration-300  ${
              showSocials  || isHovered ? "rotate-45 " : ""
            }`}
          >
            <FiPlus size={24} />
          </span>
        </button>
      </div>
    </motion.div>
  );
};

// Volunteer Grid
interface VolunteerGridProps {
  members: TeamMember[];
}

export const VolunteerGrid: React.FC<VolunteerGridProps> = ({ members }) => {
  return (
    <div
      className="
    grid grid-cols-1 
    sm:grid-cols-2 
    max-[1199px]:grid-cols-2 
    min-[1200px]:grid-cols-4 
    gap-6 
    max-w-[1200px] 
    mx-auto 
    p-8
  "
    >
      {members.map((member, idx) => (
        <VolunteerCard key={member.id} member={member} idx={idx} />
      ))}
    </div>
  );
};

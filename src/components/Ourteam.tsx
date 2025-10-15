"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { FaBehance, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Pagination from "@/src/components/common/Pagination";
import { motion, useAnimation, useInView } from "framer-motion";
import { useFetchAllMembers, useFetchSingleMember } from "@/src/hooks/useMembers";

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

// VolunteerCard component
const VolunteerCard: React.FC<VolunteerCardProps> = ({ member, idx }) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);
   console.log(`Rendering ${member.name} image:`, member.imageUrl);

  // Hover state variables (same as VolunteerCard)
  const bgClass = isHovered ? "bg-[#122f2a]" : "bg-[#f1f0ee]";
  const nameColor = isHovered ? "text-white" : "text-black";
  const roleColor = isHovered ? "text-yellow-400" : "text-black";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8, delay: member.delay || idx * 0.2, ease: "easeOut" }}
      className="relative shadow rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative w-full aspect-[4/5] cursor-pointer overflow-hidden"
        onClick={() => window.location.href = `/volunteer/${member.id}`}
      >
          <Image
            src={member.imageUrl || "/assets/volunteer1.png"}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            onError={(e) => {
              console.error(`Failed to load image for ${member.name}:`, member.imageUrl);
              // Fallback to a default image
              e.currentTarget.src = "/assets/volunteer1.png";
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#046b59]/90 to-transparent"
          />
          {/* Desktop hover - Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 right-2 z-50 flex flex-col gap-2 pb-4 hidden lg:flex"
          >
            <SocialBar member={member} />
          </motion.div>
        </div>

      <div className={`relative h-28 p-8 flex flex-col items-start transition-all duration-500 ${bgClass}`}>
        <h6 className={`font-semibold text-md transition-colors duration-300 ${nameColor}`}>
          {member.name}
        </h6>
        <p className={`text-sm mt-2 transition-colors duration-300 ${roleColor}`}>
          {member.position}
        </p>

        <button className={`absolute top-[-22px] right-4 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 overflow-visible ${
          isHovered ? "bg-yellow-400 text-black" : "bg-black text-white"
        }`}>
          <span className={`inline-block transition-transform duration-300 ${
            isHovered ? "rotate-45" : ""
          }`}>
            <FiPlus size={24} />
          </span>
        </button>
      </div>
    </motion.div>
  );
};

// Main Ourteams component
const Ourteams = () => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [editMember, setEditMember] = useState<string | null>(null);

  // ✅ Fetch all members
  const { data: memberData, isLoading } = useFetchAllMembers(currentPage, itemsPerPage);
  

 
  // ✅ Fetch single member
  const { data: singleMemberData, isLoading: isLoadingMember } = useFetchSingleMember(editMember || undefined);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-lg">Loading team members...</p>
      </div>
    );
  }

  // Debug: Log the full API response
  console.log('Full API response:', memberData);
  console.log('Members array:', memberData?.members);
  
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
        <div className="flex items-center text-[#046b59] justify-center gap-2 mb-2">
          <i className="text-2xl hand-icon"></i>
          <span className="font-caveat text-2xl font-semibold">
            Start Donating Poor People
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Meet Our Volunteer <br />
          <span className="text-[#FFC107]">Team</span> Members
        </h2>

        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
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

        {/* Optional single member display */}
        {editMember && singleMemberData && !isLoadingMember && (
          <div className="mt-8 p-4 border rounded-lg w-full max-w-md bg-white">
            <h3 className="font-bold text-lg">{singleMemberData.name}</h3>
            <p className="text-sm">{singleMemberData.position}</p>
            <Image
              src={singleMemberData.imageUrl || "/assets/volunteer1.png"}
              alt={singleMemberData.name}
              width={150}
              height={150}
              className="rounded-full mt-2"
              onError={(e) => {
                console.error(`Failed to load single member image for ${singleMemberData.name}:`, singleMemberData.imageUrl);
                e.currentTarget.src = "/assets/volunteer1.png";
              }}
            />
          </div>
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

export default Ourteams;
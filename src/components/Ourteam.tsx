"use client";

import { useState,useEffect,useRef } from "react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { FaBehance, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Pagination from "@/src/components/common/Pagination";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useFetchAllMembers, useFetchSingleMember } from "@/src/hooks/useMembers";


// API member type
interface ApiMember {
  id: string;
  name: string;
  position: string;
  imageUrl?: string;
}

// VolunteerCard type
interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl?: string;
  delay?: number;
  
}

interface VolunteerCardProps {
  member: TeamMember;
  idx: number;
}

// Social buttons
const SocialBar = () => {
  const socials = [
    { icon: <FaFacebookF />, color: "bg-white" },
    { icon: <FaTwitter />, color: "bg-white" },
    { icon: <FaInstagram />, color: "bg-white" },
    { icon: <FaBehance />, color: "bg-white" },
  ];
  return (
    <div className="flex flex-col gap-2 p-2 rounded shadow-md">
      {socials.map((social, idx) => (
        <div key={idx} className="relative group">
          <button
            className={`w-12 h-12  cursor-pointer flex items-center justify-center rounded-full shadow-md text-[#000000] transition-colors duration-300 ${social.color} hover:bg-[#FFC107]`}
          >
            {social.icon}
          </button>
        </div>
      ))}
    </div>
  );
};

// VolunteerCard component
const VolunteerCard: React.FC<VolunteerCardProps> = ({ member, idx }) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { margin: "-100px" });

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);
   console.log(`Rendering ${member} image:`, member.imageUrl);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8, delay: member.delay || idx * 0.2, ease: "easeOut" }}
      className="relative bg-[#f1f0ee] shadow rounded-2xl overflow-hidden group"
    >
      <Link href={`/volunteer/${member.id}`} className="block">
        <div className="relative w-full aspect-[4/5] cursor-pointer overflow-hidden">
          <Image
            src={member.imageUrl || "/assets/default-avatar.png"}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
             
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#046b59]/90 to-transparent"
          />
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/3 right-3 z-20"
          >
            <SocialBar />
          </motion.div>
        </div>
      </Link>

      <div className="relative bg-[#f1f0ee] h-28 p-8 flex flex-col items-start transition-colors duration-500 ">
        <h6 className="font-semibold text-md text-[#000000] transition-colors duration-300 group-hover:text-[#ffffff]">
          {member.name}
        </h6>
        <p className="text-sm text-[#000000] transition-colors duration-300 group-hover:text-[#FFC107]">
          {member.position}
        </p>

        <button className="absolute top-[-22px] right-4 w-12 h-12 flex items-center justify-center bg-[#000000] text-[#ffffff] rounded-full transition-colors duration-300 group-hover:bg-[#FFC107] overflow-visible">
          <span className="inline-block transition-transform duration-300 group-hover:rotate-45">
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

  // Map API data with proper typing
  const members: TeamMember[] =
    memberData?.members.map((m: ApiMember, idx: number) => ({
      id: m.id,
      name: m.name,
      position: m.position,
      imageUrl: m.imageUrl,
      delay: idx * 0.2,
    
    })) || [];


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
              src={singleMemberData.imageUrl || "/assets/default-avatar.png"}
              alt={singleMemberData.name }
              width={150}
              height={150}
              className="rounded-full mt-2"
              
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
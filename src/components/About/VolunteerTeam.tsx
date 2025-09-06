"use client";
import { useState } from "react";
import Button from "../common/Buttons/Button";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { FaBehance, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { teamMembers } from "@/src/staticResource";
import Pagination from "../common/Pagination";

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
            className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md text-black transition-colors duration-300 ${social.color} hover:bg-yellow-400`}
          >
            {social.icon}
          </button>
        </div>
      ))}
    </div>
  );
};

const VolunteerTeam = () => {
  const itemsPerPage = 4;
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [showPagination, setShowPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewAll = () => {
    setVisibleCount(teamMembers.length);
    setShowPagination(true);
    setCurrentPage(1);
  };

  const membersToShow = showPagination
    ? teamMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : teamMembers.slice(0, visibleCount);

  return (
    <section className="relative bg-cover py-16 bg-center w-full bg-[url('/assets/bg-one-volunteer.png')]">
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="flex items-center text-[#046b59] justify-center gap-2 mb-2">
          <i className="text-xl hand-icon"></i>
          <span className="font-caveat font-semibold">
            Start Donating Poor People
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Meet Our Volunteer <br />
          <span className="text-yellow-400">Team</span> Members
        </h2>
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membersToShow.map((member, idx) => (
              <div
                key={idx}
                className="relative bg-[#f1f0ee] shadow rounded-2xl overflow-hidden group"
              >
                <div className="relative w-full aspect-[4/5] cursor-pointer overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-16 right-2 z-20 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-10 translate-y-2 transition-all duration-300">
                    <SocialBar />
                  </div>
                </div>
                <div className="relative bg-[#f1f0ee] h-28 p-8 flex flex-col items-start transition-colors duration-500 group-hover:bg-[#122f2a]">
                  <h6 className="font-semibold text-md text-black transition-colors duration-300 group-hover:text-white">
                    {member.name}
                  </h6>
                  <p className="text-sm text-black transition-colors duration-300 group-hover:text-yellow-400">
                    {member.role}
                  </p>
                  <button className="absolute top-[-22px] right-4 w-12 h-12 flex items-center justify-center bg-black text-white rounded-full transition-colors duration-300 group-hover:bg-yellow-400 overflow-visible">
                    <span className="inline-block transition-transform duration-300 group-hover:rotate-45">
                      <FiPlus size={24} />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!showPagination && visibleCount < teamMembers.length && (
          <div className="flex items-center justify-center py-6">
            <Button
              text="View All"
              bgColor="bg-[#FFC107]"
              textColor="white"
              hoverTextColor="text-black"
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

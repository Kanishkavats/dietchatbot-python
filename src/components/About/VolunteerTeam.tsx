"use client";

import { useState } from "react";
import Button from "@/helper/Buttons/Button";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { FaBehance, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const SocialBar = () => {
  const socials = [
    { icon: <FaFacebookF />, name: "Facebook", color: "bg-white" },
    { icon: <FaTwitter />, name: "Twitter", color: "bg-white" },
    { icon: <FaInstagram />, name: "Instagram", color: "bg-white" },
    { icon: <FaBehance />, name: "Behance", color: "bg-white" },
  ];

  return (
    <div className="flex flex-col gap-2 p-2 rounded shadow-md ">
      {socials.map((social, idx) => (
        <div key={idx} className="relative group">
          <button
            className={`
              w-10 h-10 flex items-center justify-center rounded-full shadow-md text-black
              transition-colors duration-300
              ${social.color} hover:bg-yellow-400
            `}
          >
            {social.icon}
          </button>
        </div>
      ))}
    </div>
  );
};

const VolunteerTeam = () => {
  const [activeSocialBar, setActiveSocialBar] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "Michel Fokluz",
      role: "Volunteer",
      img: "/assets/volunteer1.png",
      delay: 0,
    },
    {
      name: "Arian Drobloas",
      role: "Volunteer",
      img: "/assets/volunteer2.png",
      delay: 300,
    },
    {
      name: "Jara Klintof",
      role: "Volunteer",
      img: "/assets/volunteer3.png",
      delay: 600,
    },
    {
      name: "Aiden Markram",
      role: "Volunteer",
      img: "/assets/volunteer4.png",
      delay: 900,
    },
  ];

  return (
    <div>
      <section className="relative h-140 w-full bg-gradient-to-r from-black via-black/50 to-transparent">
        <div className="relative bg-cover bg-center bg-[url('/assets/banner-bg.png')] h-140 w-full">
          <div className="absolute left-0 top-0 bottom-0 h-180 w-130 animate-[updown_0.5s_ease-in-out_infinite] ease-in-out infinite overflow-hidden">
            <Image
              src="/assets/shape-left.png"
              alt="shape left"
              fill
              className="object-cover animate-float pointer-events-none select-none"
            />
          </div>

          <div className="container mx-auto px-4 py-32 text-center text-white">
            <i className="text-xl mr-2 text-[#ffc107] hand-icon"></i>
            <span className="text-yellow-400 font-caveat text-xl md:text-2xl font-semibold">
              Start Donating Poor People
            </span>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-nunito leading-snug">
              Children Need Your Help By <br /> Donating Today
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <div className="flex gap-4 mt-6">
                <div className="text-white">
                  <Button
                    text="Discover More"
                    bgColor="[var(--color-palate-white2)]"
                    textColor="text-white"
                    hoverTextColor="text-black"
                    hoverBg="before:bg-[var(--color-palate-yellow)]"
                  />
                </div>

                <div className="text-black">
                  <Button
                    text="Get A Quote"
                    bgColor="[var(--color-palate-yellow)]"
                    textColor="text-white"
                    hoverTextColor="text-white"
                    hoverBg="before:bg-[var(--color-palate-quaternary-green)]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute w-full h-19 pointer-events-none select-none">
            <Image
              src="/assets/bottomsection.png"
              alt="bottom shape"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cover bg-center bg-[url('/assets/bg-one-volunteer.png')]">
        <div className="py-16 container mx-auto px-4 text-center">
          <div className="container mx-auto px-4">
            
          <i className="text-xl mr-2 text-[var(--color-palate-quaternary-green)] hand-icon"></i>
          <span className="text-[var(--color-palate-quaternary-green)] mb-2 inline-block">
            Start Donating Poor People
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Meet Our Volunteer <br />{" "}
            <span className="text-yellow-400">Team</span> Members
          </h2>

          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="relative bg-[#f1f0ee] shadow rounded-2xl overflow-hidden group"
                >
                  <div
                    className="relative w-full aspect-[4/5] cursor-pointer"
                    onMouseEnter={() => setActiveSocialBar(idx)}
                    onMouseLeave={() => setActiveSocialBar(null)}
                  >
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />

                    <button className="absolute bottom-0 right-2 w-10 h-10 flex items-center justify-center  bg-black text-white rounded-full transition-colors duration-300   group-hover:bg-yellow-400 ">
                      <span className="inline-block transition-transform duration-300 group-hover:rotate-45">
                        <FiPlus />
                      </span>
                    </button>

                    <button className="absolute bottom-0 right-2 bg-yellow p-3 rounded-full z-10"></button>

                    {activeSocialBar === idx && (
                      <div className="absolute bottom-14 right-0 z-20 opacity-0 animate-fade-in-down transition-opacity duration-300">
                        <SocialBar />
                      </div>
                    )}
                  </div>
                  <div className="bg-[#f1f0ee] p-4 flex flex-col items-start transition-colors duration-300 group-hover:bg-[var(--color-palate-quaternary-green)]">
                    <h6 className="font-semibold text-md text-black transition-colors duration-300 group-hover:text-white">
                      {member.name}
                    </h6>
                    <p className="text-sm text-black transition-colors duration-300 group-hover:text-yellow-400">
                      {member.role}
                    </p>
                  </div>
                </div>
                
              ))}
            </div>

            
          </div>
          <div className="flex items-center justify-center py-10">
              <Button
                text="View All"
                bgColor="[var(--color-palate-yellow)]"
                textColor="text-white"
                hoverTextColor="text-white"
                hoverBg="before:bg-[var(--color-palate-quaternary-green)]"
              />
            </div>
      
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerTeam;

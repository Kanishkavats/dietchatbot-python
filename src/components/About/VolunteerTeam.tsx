"use client";

import Button from "../common/Buttons/Button";
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
              w-12 h-12  flex items-center justify-center rounded-full shadow-md text-black
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
      <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] ">
        <div className="relative flex items-center justify-center bg-cover bg-center bg-[url('/assets/banner-bg.png')] min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh]  w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent w-1/3"></div>
          <div className="absolute left-0 top-0 bottom-0 h-180 w-80 md:w-130  animate-[updown_0.5s_ease-in-out_infinite] ease-in-out infinite overflow-hidden">
            <Image
              src="/assets/shape-left.png"
              alt="shape left"
              fill
              className="object-cover animate-float pointer-events-none select-none"
            />
          </div>

          <div className="w-full  px-4 py-32 text-center text-white">
            <i className="text-xl mr-2 text-[#ffc107] hand-icon"></i>
            <span className="text-yellow-400 font-caveat text-xl md:text-2xl font-semibold">
              Start Donating Poor People
            </span>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-nunito leading-snug">
              Children Need Your Help By <br /> Donating Today
            </p>

            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="flex items-center justify-center flex-wrap gap-3 mt-6">
                <div className="text-white bg-black/25  rounded-full">
                  <Button
                    text="Discover More"
                    bgColor="transparent"
                    textColor="text-white"
                    hoverTextColor="text-white"
                    hoverBg="before:bg-[var(--color-palate-yellow)]"
                  />
                </div>

                <div className="">
                  <Button
                    text="Get A Quote"
                    bgColor="[var(--color-palate-yellow)]"
                    textColor="text-black"
                    hoverTextColor="text-white"
                    hoverBg="before:bg-[var(--color-palate-quaternary-green)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="absolute w-full h-19 pointer-events-none select-none">
            <Image
              src="/assets/bottomsection.png"
              alt="bottom shape"
              fill
              className="object-cover"
            />
          </div> */}
        </div>
      </section>

      <section className=" relative bg-cover py-16 bg-center w-full bg-[url('/assets/bg-one-volunteer.png')]">
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <i className="text-xl text-[var(--color-palate-quaternary-green)] hand-icon"></i>
            <span className="text-[var(--color-palate-quaternary-green)] font-caveat font-semibold">
              Start Donating Poor People
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Meet Our Volunteer <br />
            <span className="text-yellow-400">Team</span> Members
          </h2>

          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="relative bg-[#f1f0ee] shadow rounded-2xl overflow-hidden group"
                >
                  <div className="relative w-full aspect-[4/5] cursor-pointer overflow-hidden">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                 <div className="absolute bottom-16 right-2 z-20 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-10 translate-y-2 transition-all  duration-300">
                      <SocialBar />
                    </div>
                  </div>

                  <div className="relative bg-[#f1f0ee] h-28 p-4 flex flex-col items-start transition-colors duration-300 group-hover:bg-[var(--color-palate-quaternary-green)]">
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

          <div className="flex items-center justify-center py-10">
            <Button
              text="View All"
              bgColor="[var(--color-palate-yellow)]"
              textColor="white"
              hoverTextColor="text-black"
              hoverBg="before:bg-[var(--color-palate-quaternary-green)]"
            />
          </div>
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
    </div>
  );
};

export default VolunteerTeam;

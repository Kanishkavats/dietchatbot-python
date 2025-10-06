"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  FaFacebookF,
  FaVimeoV,
  FaTwitter,
  FaLinkedinIn,
  //FaVimeoV,
} from "react-icons/fa";
import { CircleCheckBig } from "lucide-react";

import Button from "../common/Buttons/Button";
import { Member } from "@/src/types/members";

type VolunteerProfileProps = {
  member: Member;
};

const VolunteerProfile: React.FC<VolunteerProfileProps> = ({ member }) => {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: "easeOut" as const }, // <-- cast as const
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.5, ease: "easeOut" as const }, // <-- cast as const
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: "easeOut" as const, delay: 0.3 },
  },
};

const aboutVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: "easeOut" as const, delay: 0.5 },
  },
};

  const imageSrc = member.image || "/assets/default-avatar.png";

  return (
    <motion.section
      ref={ref}
      className="w-full flex justify-center items-center py-12 px-4 md:px-8"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="max-w-7xl w-full mt-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-nunito">
          {/* Image */}
          <motion.div
            className="flex justify-start"
            variants={imageVariants}
          >
            <div className="relative w-[534]  rounded-2xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={member.name}
                fill
                className="rounded-2xl object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div className="text-center md:text-left " variants={textVariants}>
            <h2 className="text-3xl font-bold text-foreground font-nunito">
              {member.name}
            </h2>
            <p className="text-base text-[#747474] font-nunito mb-6 mt-2">{member.position}</p>




            {/* Social links */}
            <div className="flex justify-center md:justify-start gap-3 mb-6">
            



              {member.facebookUrl && (
                <motion.a
                  href={member.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 30, damping: 15 }}
                >
                  <FaFacebookF size={20} />
                </motion.a>
              )}
              {member.vimeoUrl && (
                <motion.a
                  href={member.vimeoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 30, damping: 15 }}
                >
                  <FaVimeoV size={20} color="purple" />
                </motion.a>
              )}
              {member.twitterUrl && (
                <motion.a
                  href={member.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 30, damping: 15 }}
                >
                  <FaTwitter size={20} />
                </motion.a>
              )}
              {member.linkedInUrl && (
                <motion.a
                  href={member.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 30, damping: 15 }}
                >
                  <FaLinkedinIn size={20} />
                </motion.a>
              )}
            </div>

            {member.description && (
              <motion.p className="text-[#667471] mb-6 text-base font-nunito capitalize  max-w-2xl leading-relaxed">
                <a className="text-gray-500 mb-6 text-sm font-nunito ">
              Lorem ipsum dolor sit amet, con adipiscing elit. Etiam convallis
              elit id imperdiet. Quisq commodo simply free ornare tortor.
            </a>
              </motion.p>
            )}

            <h3 className="text-[#000000] text-xl mb-6 font-extrabold ">
              I Help My Clients Stand Out And They Help Me Grow.
            </h3>

            {/* Donation & Events */}
            <div className="mb-3">
              <div className="text-base text-black-700 font-bold mb-2">
                Donation Collect
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 relative">
                <div className="bg-[#046b59] h-2 rounded-full relative" style={{ width: "70%" }}>
                  <span className="absolute -top-6 right-0 text-base font-bold text-black">
                    70%
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-base text-black-700 font-bold mb-2">
                Successful Events
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 relative">
                <div className="bg-[#046b59] h-2 rounded-full relative" style={{ width: "85%" }}>
                  <span className="absolute -top-6 right-0 text-base font-bold text-black">
                    85%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-black-700 gap-x-8 gap-y-3">
              <p className="flex items-center gap-2 font-bold text-base">
                <CircleCheckBig className="text-[#046b59] w-4 h-4"  /> Best Quality Services
              </p>
              <p className="flex items-center gap-2 font-bold text-base">
                <CircleCheckBig className="text-[#046b59] w-4 h-4" /> Time Saving
              </p>
              <p className="flex items-center gap-2 font-bold text-base">
                <CircleCheckBig className="text-[#046b59] w-4 h-4" /> Meet The Deadlines
              </p>
              <p className="flex items-center gap-2 font-bold text-base">
                <CircleCheckBig className="text-[#046b59] w-4 h-4" /> 24/7 Customer Support
              </p>
            </div>

            <div className="w-55 rounded-full mt-12">
              <Button
                text="Donate With Me"
                bgColor="bg-[#FFC107] py-6"
                textColor="text-black"
                hoverTextColor="group-hover:text-white"
                hoverBg="before:bg-[#046b59]"
                onClick={() => router.push("/donate-us")}
              />
            </div>
          </motion.div>
        </div>

        {/* About section */}
        {member.about && (
          <motion.div 
            className="mt-10 text-center md:text-left font-nunito"
            initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }} // triggers when 30% visible
    transition={{ duration: 1.5, ease: "easeOut" }}
            //variants={aboutVariants}
          >
            <h3 className="text-3xl font-extrabold mb-3 font-nunito">
              About Me
            </h3>
            <p className="text-gray-green font-nunito text-lg leading-relaxed capitalize">
               {member.about} 
            
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default VolunteerProfile;

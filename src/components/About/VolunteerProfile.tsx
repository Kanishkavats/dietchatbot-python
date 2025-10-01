"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { CircleCheckBig } from "lucide-react";

import Button from "../common/Buttons/Button";
import { Member } from "@/src/types/members";

type VolunteerProfileProps = {
  member: Member;
};

const VolunteerProfile: React.FC<VolunteerProfileProps> = ({ member }) => {
  const router = useRouter();

  // Fallback image if member.image is empty
  const imageSrc = member.image || "/assets/default-avatar.png";

  return (
    <section className="w-full flex justify-center items-center py-12 px-4 md:px-8">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center place-items-center font-nunito">
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={member.name}
                width={450}
                height={450}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-foreground font-nunito">
              {member.name}
            </h2>
            <p className="text-sm text-gray-500 mb-6">{member.position}</p>

            {/* Social links only if provided */}
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
              {member.instagramUrl && (
                <motion.a
                  href={member.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 30, damping: 15 }}
                >
                  <FaInstagram size={20} />
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

            {/* Member description */}
            {member.description && (
              <p className="text-gray-500 mb-6 text-sm font-nunito ">
                {member.description}
              </p>
            )}

            <div className="w-58 round full">
              <Button
                text="Donate With Me"
                bgColor="bg-[#FFC107]"
                textColor="text-black"
                hoverTextColor="group-hover:text-white"
                hoverBg="before:bg-[#046b59]"
                onClick={() => router.push("/donate-us")}
              />
            </div>
          </div>
        </div>

        {/* About section */}
        {member.about && (
          <div className="mt-10 text-center md:text-left font-nunito">
            <h3 className="text-3xl font-extrabold mb-3 font-nunito">
              About Me
            </h3>
            <p className="text-gray-green font-nunito text-lg leading-relaxed">
              {member.about}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VolunteerProfile;

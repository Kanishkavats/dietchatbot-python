"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaFacebookF, FaVimeoV, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { CircleCheckBig } from "lucide-react";

import Button from "../common/Buttons/Button";
import { Member } from "@/src/types/members";

type VolunteerProfileProps = {
  member: Member;
};

const VolunteerProfile: React.FC<VolunteerProfileProps> = ({ member }) => {
  const router = useRouter();


  // 🧠 1️⃣ Check if essential fields are missing → hide component
  if (
    !member ||
    !member.name ||
    !member.position ||
    !member.description ||
    !member.image
  ) {
    return null; // ❌ Hide the entire profile if key data missing
  }

  // Fallback image if member.image is empty
  const imageSrc = member.image || "/assets/default-avatar.png";

  return (
    <motion.section
      ref={ref}
      className="w-full flex justify-center items-center py-12 px-4 md:px-8"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="max-w-7xl w-full mt-18 -mx-12 my-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-nunito items-start"> 
        

          {/* Image */}
          <motion.div
            className="flex justify-center order-1"
            variants={imageVariants}
          >
            <div className="relative rounded-2xl overflow-hidden volunteer-image mx-12 lg:mx-0">
              <Image
                src={imageSrc}
                alt={member.name}
                fill
                className="rounded-2xl object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="order-2 volunteer-text mt-6 lg:mt-0"
            variants={textVariants}
          >
            <div className="mx-6 lg:mx-0 max-w-[900px] lg:max-full">
              <h2 className="text-3xl font-bold text-foreground">
                {member.name}
              </h2>
              <p className="text-base text-[#747474] mb-6 mt-2">
                {member.position}
              </p>

              {/* <h2 className="text-3xl font-bold text-foreground">{member.name}</h2> */}
              {/* <p className="text-base text-[#747474] mb-6 mt-2">{member.position}</p> */}

              <div className="flex justify-start gap-3 mb-6">
                {member.facebookUrl && (
                  <SocialIcon url={member.facebookUrl} Icon={FaFacebookF} />
                )}
                {member.vimeoUrl && (
                  <SocialIcon url={member.vimeoUrl} Icon={FaVimeoV} />
                )}
                {member.twitterUrl && (
                  <SocialIcon url={member.twitterUrl} Icon={FaTwitter} />
                )}
                {member.linkedInUrl && (
                  <SocialIcon url={member.linkedInUrl} Icon={FaLinkedinIn} />
                )}
              </div>

              <p className="text-[#667471] mb-6 text-base leading-relaxed capitalize">
                Lorem ipsum dolor sit amet, con adipiscing elit tian convallis
                elit id impedie. Quisq commodo simply free ornare tortor. If you
                are going to use a passage.
              </p>





              <h3 className="text-[#000000] text-xl mb-6 font-extrabold">
                I Help My Clients Stand Out And They Help Me Grow.
              </h3>

              <ProgressBar label="Donation Collect" percentage={70} />
              <ProgressBar label="Successful Events" percentage={85} />

              <div className="grid grid-cols-2 gap-3 mb-6 text-sm gap-x-8 gap-y-3">
                <Feature text="Best Quality Services" />
                <Feature text="Time Saving" />
                <Feature text="Meet The Deadlines" />
                <Feature text="24/7 Customer Support" />
              </div>

              <div className="w-full max-w-[250px] rounded-full mt-12">
                <Button
                  text="Donate With Me"
                  bgColor="bg-[#FFC107] py-6"
                  textColor="text-black"
                  hoverTextColor="group-hover:text-white"
                  hoverBg="before:bg-[#046b59]"
                  onClick={() => router.push("/donate-us")}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* About Me section */}
        {member.about && (
          <motion.div
            className="volunteer-about mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            variants={aboutVariants}
          >
            <div className="mx-0 sm:mx-4 lg:mx-0 max-w-[900px] lg:max-w-full">
              <h3 className="text-3xl font-extrabold mb-6 text-left font-nunito">
                About Me
              </h3>
              <p className="text-[#667471] text-lg leading-relaxed text-left capitalize">
                {member.about}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* --- Global responsive styles --- */}
      <style jsx>{`
        .volunteer-image {
          width: 516px;
          height: 604px;
        }
        @media (min-width: 977px) {
          .volunteer-image {
            width: 696px;
            height: 815px;
          }
        }

          @media (min-width: 992px) and (max-width: 1190px) {
          .volunteer-image {
            width: 456px;
            height: 534px;
          }
        }
          
        @media (min-width: 1198px) {
          .volunteer-image {
            width: 456px;
            height: 534px;
          }
        }
        @media (min-width: 1398px) {
          .volunteer-image {
            width: 451px;
            height: 528px;
          }
        }

        @media (min-width: 1400px) {
          .volunteer-image {
            width: 526px;
            height: 616px;
          }
        }
        /* Left-aligned responsive text below image */
        @media (max-width: 1023px) {
          .volunteer-text,
          .volunteer-about {
            max-width: 516px;
            margin-left: 2rem; /* left gap */
            margin-right: auto;
            text-align: left;
            padding-left: 0;
            padding-right: 0;
          }
        }

        @media (min-width: 1024px) {
          .volunteer-about {
            max-width: 100%;
            margin-left: 0;
            text-align: left; /* or center if needed */
          }
        }
        @media (max-width: 768px) {
          .volunteer-text,
          .volunteer-about {
            max-width: 90%;
        
          }
        }

        /* Stack image above text below 990px */
@media (max-width: 990px) {
  .volunteer-image {
    margin-bottom: 2rem; /* add space between image and text */
  }

 

       
     


      `}</style>
    </motion.section>
  );
};

export default VolunteerProfile;

// ----- Helper Components -----
const SocialIcon = ({ url, Icon }: { url: string; Icon: any }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-600"
    whileHover={{ scale: 1.2 }}
    transition={{ type: "spring", stiffness: 30, damping: 15 }}
  >
    <Icon size={20} />
  </motion.a>
);

const ProgressBar = ({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) => (
  <div className="mb-6">
    <div className="text-base text-black-700 font-bold mb-2">{label}</div>
    <div className="w-full bg-gray-200 rounded-full h-2 relative">
      <div
        className="bg-[#046b59] h-2 rounded-full relative"
        style={{ width: `${percentage}%` }}
      >
        <span className="absolute -top-6 right-0 text-base font-bold text-black">
          {percentage}%
        </span>
      </div>
    </div>
  </div>
);

const Feature = ({ text }: { text: string }) => (
  <p className="flex items-center gap-2 font-bold text-base">
    <CircleCheckBig className="text-[#046b59] w-4 h-4" /> {text}
  </p>
);

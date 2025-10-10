"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { FaFacebookF, FaVimeoV, FaTwitter, FaLinkedinIn } from "react-icons/fa";
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
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.7, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.3 },
    },
  };

  const aboutVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.5 },
    },
  };

  const featureVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  const imageSrc = member.image || "/assets/default-avatar.png";

  return (
    <motion.section
      ref={ref}
      className="w-full flex justify-center items-center py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="max-w-7xl w-full mt-12 sm:mt-16 md:mt-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 font-nunito items-start">
          {/* ✅ Image Section */}
          <motion.div
            className="flex justify-center order-1 w-full lg:w-auto max-[640px]:mb-2"
            variants={imageVariants}
          >
            <div className="relative rounded-2xl overflow-hidden volunteer-image mx-0 sm:mx-12 lg:mx-0 w-full max-w-[534px]">
              <div className="relative w-full aspect-[7/9] sm:aspect-[4/5] md:aspect-auto md:h-[700px]">
                <Image
                  src={imageSrc}
                  alt={member.name}
                  width={534}
                  height={639}
                  className="rounded-2xl object-cover w-full h-full"
                  // sizes="(max-width: 650px) 90vw, 534px"
                  sizes="
    (max-width: 375px) 346.4px,
    (max-width: 425px) 397.6px,
    (max-width: 768px) 696px,
    (max-width: 1024px) 456px,
    (max-width: 1440px) 526px,
    526px
  "
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="order-2 volunteer-text mt-0 sm:mt-0"
            variants={textVariants}
          >
            <div className="max-w-full lg:max-w-[900px]">
              {/* Name and Position */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">
                {member.name}
              </h2>
              <p className="text-base sm:text-base text-[#747474] mb-4 sm:mb-6 mt-2">
                {member.position}
              </p>

              {/* Social Icons */}
              <div className="flex justify-start gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
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

              {/* Description */}
              <p className="text-[#667471] mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed capitalize">
                Lorem ipsum dolor sit amet, con adipiscing elit tian convallis
                elit id impedie. Quisq commodo simply free ornare tortor. If you
                are going to use a passage.
              </p>

              {/* Tagline */}
              <h3 className="text-[#000000] text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 font-extrabold leading-snug">
                I Help My Clients Stand Out And They Help Me Grow.
              </h3>

              {/* Progress Bars */}
              <ProgressBar label="Donation Collect" percentage={70} />
              <ProgressBar label="Successful Events" percentage={85} />

              {/* Feature Checks */}
              <motion.div
                className="grid gap-2 sm:gap-3 mb-4 sm:mb-6 grid-cols-1 sm:grid-cols-2"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {[
                  "Best Quality Services",
                  "Time Saving",
                  "Meet The Deadlines",
                  "24/7 Customer Support",
                ].map((text, index) => (
                  <motion.p
                    key={text}
                    custom={index}
                    variants={featureVariants}
                    className={`flex items-center gap-2 font-bold text-base sm:text-sm md:text-base
                      ${index === 0 ? "mb-2 sm:mb-2" : ""}
                      ${index === 1 ? "mb-2 sm:mb-2" : ""}
                      ${index === 2 ? "mb-2 sm:mb-2" : ""}
                      ${index === 3 ? "mb-2 sm:mb-2" : ""}`}
                  >
                    <CircleCheckBig className="text-[#046b59] w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="leading-tight">{text}</span>
                  </motion.p>
                ))}
              </motion.div>

              {/* Donate Button */}
              <div className="w-full max-w-[250px] sm:max-w-[280px] rounded-full mt-6 sm:mt-8 md:mt-12">
                <Button
                  text="Donate With Me"
                  bgColor="bg-[#FFC107] py-4 sm:py-5 md:py-6"
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
            className="volunteer-about mt-8 sm:mt-10 md:mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            variants={aboutVariants}
          >
            <div className="max-w-[900px] lg:max-w-full">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-left font-nunito">
                About Me
              </h3>
              <p className="text-[#747474] text-base sm:text-base md:text-lg font-nunito leading-relaxed text-left capitalize">
                {member.about}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .volunteer-image {
          width: 100%;
        }

        /* Mobile 375px */
        @media (max-width: 375px) {
          .volunteer-image img {
            width: 346.4px;
            height: 405.938px;
          }
        }

        /* Mobile 425px */
        @media (min-width: 376px) and (max-width: 425px) {
          .volunteer-image img {
            width: 397.6px;
            height: 465.938px;
          }
        }

        /* Tablet 768px */
        @media (min-width: 426px) and (max-width: 768px) {
          .volunteer-image img {
            width: 696px;
            height: 815.638px;
          }
        }

        /* Laptop 1024px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .volunteer-image img {
            width: 456px;
            height: 534.388px;
          }
        }

        /* Laptop 1440px */
        @media (min-width: 1025px) and (max-width: 1440px) {
          .volunteer-image img {
            width: 526px;
            height: 616.412px;
          }
        }

        /* Larger screens above 1440px */
        @media (min-width: 1441px) {
          .volunteer-image img {
            width: 526px;
            height: 616.412px;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default VolunteerProfile;

/* Helper Components */
const SocialIcon = ({ url, Icon }: { url: string; Icon: any }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 sm:p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-300"
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Icon size={16} className="sm:w-5 sm:h-5" />
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
    {/* Label */}
    <div className="text-sm sm:text-base text-black font-bold mb-1">
      {label}
    </div>

    {/* Percentage Above the Green Line */}
    <div className="relative w-full">
      <div
        className="absolute -top-5 sm:-top-6 right-0 text-xs sm:text-sm md:text-base font-bold text-black"
        style={{ right: `${100 - percentage}%`, transform: "translateX(13%)" }}
      >
        {percentage}%
      </div>

      {/* Background Line */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 relative overflow-hidden">
        {/* Green Line */}
        <div
          className="bg-[#046b59] h-1.5 sm:h-2 rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  </div>
);

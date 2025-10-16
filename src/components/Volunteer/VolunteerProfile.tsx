"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { FaFacebookF, FaVimeoV, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { CircleCheckBig } from "lucide-react";
import Button from "../common/Buttons/Button";
import { Member } from "@/src/types/members";
import { TeamMember } from "@/src/types";
import { useTranslation } from "react-i18next";

type VolunteerProfileProps = {
  member: TeamMember;
  isLoading?: boolean;
};

const VolunteerProfile: React.FC<VolunteerProfileProps> = ({ member, isLoading = false }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const [currentMember, setCurrentMember] = useState(member);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  // Handle language changes for bilingual data
  useEffect(() => {
    const handleLanguageChange = () => {
      if (member && typeof member === 'object') {
        const currentLang = i18n.language || 'en';
        
        // Check if member has bilingual structure
        const updatedMember = {
          ...member,
          name: typeof member.name === 'object' && member.name !== null 
            ? (member.name as any)[currentLang] || (member.name as any).en || member.name
            : member.name,
          position: typeof member.position === 'object' && member.position !== null
            ? (member.position as any)[currentLang] || (member.position as any).en || member.position
            : member.position,
          about: member.about && typeof member.about === 'object' && member.about !== null
            ? (member.about as any)[currentLang] || (member.about as any).en || member.about
            : member.about,
        };
        
        setCurrentMember(updatedMember);
      }
    };

    // Initial language setup
    handleLanguageChange();

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [member, i18n]);

  // Fallback: if currentMember is not set, use the original member
  const displayMember = currentMember || member;

  // Debug logging
  console.log('VolunteerProfile received member:', member);
  
  // Handle missing or invalid member data
  if (!displayMember) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">{t("Member data not available")}</h2>
      </div>
    );
  }

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

  const imageSrc = displayMember.image || displayMember.imageUrl || displayMember.img || "/assets/default-avatar.png";

  return (
    <motion.section
      ref={ref}
      className="w-full flex justify-center items-center py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="max-w-7xl w-full mt-8 sm:mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 font-nunito items-start">
          {/* ✅ Image Section */}
          <motion.div
            className="flex justify-center order-1 w-full lg:w-auto mb-4 sm:mb-6 lg:mb-0"
            variants={imageVariants}
          >
            <div className="relative rounded-2xl overflow-hidden w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[534px]">
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]">
                {isLoading ? (
                  <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse"></div>
                ) : (
                  <Image
                    src={imageSrc}
                    alt={displayMember.name}
                    width={534}
                    height={639}
                    className="rounded-2xl object-cover w-full h-full"
                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 534px"
                    priority
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="order-2 volunteer-text mt-2 sm:mt-0"
            variants={textVariants}
          >
            <div className="max-w-full lg:max-w-[900px] px-2 sm:px-0">
              {/* Name and Position */}
              {isLoading ? (
                <>
                  <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 sm:h-5 bg-gray-200 rounded animate-pulse mb-4 sm:mb-6 w-1/2"></div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight mb-2">
                    {displayMember.name}
                  </h2>
                  <p className="text-sm sm:text-base text-[#747474] mb-4 sm:mb-6">
                    {displayMember.position}
                  </p>
                </>
              )}

              {/* Social Icons */}
              <div className="flex justify-start gap-2 sm:gap-3 mb-5 sm:mb-6 flex-wrap">
                {displayMember.facebookUrl && (
                  <SocialIcon url={displayMember.facebookUrl} Icon={FaFacebookF} />
                )}
                {displayMember.vimeoUrl && (
                  <SocialIcon url={displayMember.vimeoUrl} Icon={FaVimeoV} />
                )}
                {displayMember.twitterUrl && (
                  <SocialIcon url={displayMember.twitterUrl} Icon={FaTwitter} />
                )}
                {displayMember.linkedInUrl && (
                  <SocialIcon url={displayMember.linkedInUrl} Icon={FaLinkedinIn} />
                )}
                {displayMember.instagramUrl && (
                  <SocialIcon url={displayMember.instagramUrl} Icon={FaTwitter} />
                )}
                {displayMember.behanceUrl && (
                  <SocialIcon url={displayMember.behanceUrl} Icon={FaTwitter} />
                )}
              </div>

              {/* Description */}
              {isLoading ? (
                <div className="space-y-2 mb-5 sm:mb-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                </div>
              ) : (
                <p className="text-[#667471] mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed capitalize">
                  {t("Lorem ipsum dolor sit amet, con adipiscing elit tian convallis elit id impedie. Quisq commodo simply free ornare tortor. If you are going to use a passage.")}
                </p>
              )}

              {/* Tagline */}
              {isLoading ? (
                <div className="h-6 sm:h-7 md:h-8 lg:h-9 bg-gray-200 rounded animate-pulse mb-5 sm:mb-6 w-4/5"></div>
              ) : (
                <h3 className="text-[#000000] text-base sm:text-lg md:text-xl lg:text-2xl mb-5 sm:mb-6 font-extrabold leading-snug">
                  {t("I Help My Clients Stand Out And They Help Me Grow.")}
                </h3>
              )}

              {/* Key Points Heading */}
              <h4 className="text-[#000000] text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 font-extrabold leading-snug">
                {t("Key Points")}
              </h4>


              {/* Feature Checks */}
              <motion.div
                className="grid gap-3 sm:gap-4 mb-6 sm:mb-8 grid-cols-1 sm:grid-cols-2"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {[
                  t("Best Quality Services"),
                  t("Time Saving"),
                  t("Meet The Deadlines"),
                  t("24/7 Customer Support"),
                ].map((text, index) => (
                  <motion.p
                    key={text}
                    custom={index}
                    variants={featureVariants}
                    className="flex items-center gap-2 font-bold text-sm sm:text-base"
                  >
                    <CircleCheckBig className="text-[#046b59] w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="leading-tight">{text}</span>
                  </motion.p>
                ))}
              </motion.div>

              {/* Donate Button */}
              <div className="w-full max-w-[280px] sm:max-w-[300px] rounded-full mt-6 sm:mt-8 md:mt-10">
                <Button
                  text={t("Donate With Me")}
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
        {displayMember.about && (
          <motion.div
            className="volunteer-about mt-8 sm:mt-10 md:mt-12 px-2 sm:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            variants={aboutVariants}
          >
            <div className="max-w-[900px] lg:max-w-full">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 text-left font-nunito">
                {t("About Me")}
              </h3>
              <p className="text-[#747474] text-sm sm:text-base md:text-lg font-nunito leading-relaxed text-left capitalize">
                {displayMember.about}
              </p>
            </div>
          </motion.div>
        )}
      </div>

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
    className="p-2.5 sm:p-3 bg-white border border-gray-200 rounded-full text-[#046b59] hover:bg-[#046b59] hover:text-white transition-all duration-300 flex-shrink-0"
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Icon size={14} className="sm:w-4 sm:h-4" />
  </motion.a>
);

const ProgressBar = ({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) => (
  <div className="mb-5 sm:mb-6">
    {/* Label */}
    <div className="text-sm sm:text-base text-black font-bold mb-2">
      {label}
    </div>

    {/* Percentage Above the Green Line */}
    <div className="relative w-full">
      <div
        className="absolute -top-4 sm:-top-5 right-0 text-xs sm:text-sm font-bold text-black"
        style={{ right: `${100 - percentage}%`, transform: "translateX(10%)" }}
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

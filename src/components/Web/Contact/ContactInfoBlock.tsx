// components/contact/ContactInfoBlock.tsx
'use client'
import { ContactInfoBlockProps, InfoItem, SocialLink } from "@/src/types";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaShareAlt,
  FaVimeoV,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";



// --------------------
// Contact Info Data
// --------------------
export const contactInfo: InfoItem[] = [
  {
    icon: FaMapMarkerAlt,
    title: "Location",
    lines: ['55 main street, 2nd block,', 'Melbourne, Australia'],
  },
  {
    icon: FaPhoneAlt,
    title: "Phone",
    lines: ["+1 (368) 567 89 54", "+236 (456) 896 22"],
  },
  {
    icon: FaEnvelope,
    title: "Email",
    lines: ["example@email.com", "charifund@email.com"],
  },
  {
    icon: FaShareAlt,
    title: "Social",
    isSocial: true,
  },
];

// --------------------
// Social Links Data
// --------------------
export const socialLinks: SocialLink[] = [
  {
    icon: FaFacebookF,
    href: "#",
  },
  {
    icon: FaVimeoV,
    href: "#",
  },
  {
    icon: FaTwitter,
    href: "#",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
  },
];


const ContactInfoBlock: React.FC<ContactInfoBlockProps> = ({ icon: Icon, title, lines, isSocial }) => {
  const{t}=useTranslation();
  return (
    <div className="flex gap-4  items-start">
      <Icon className="text-brown text-xl mt-1" />
      <div>
        <h4 className="font-nunito font-extrabold text-lg mb-2">{t(title)}</h4>

        {isSocial ? (
          <div className="flex gap-2 mt-2">
            {socialLinks.map((item, index) => {
              const SocialIcon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  className="w-9 h-9 border border-gray-400 rounded-full flex items-center justify-center text-muted-gray hover:bg-yellow hover:text-white hover:border-yellow transition"
                >
                  <SocialIcon  className="text-sm"/>
                </a>
              );
            })}
          </div>
        ) : (
          lines?.map((line, i) => (
            <p
              key={i}
              className="font-nunito text-base text-muted-gray leading-relaxed"
            >
              {t(line)}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactInfoBlock;

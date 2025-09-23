// components/contact/ContactInfoBlock.tsx
'use client'
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

// --------------------
// Type Definitions
// --------------------
type IconType = React.ElementType;

interface InfoItem {
  icon: IconType;
  title: string;
  lines?: string[];
  isSocial?: boolean;
}

interface SocialLink {
  icon: IconType;
  href: string;
}

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

// --------------------
// Contact Info Block Component
// --------------------
interface Props {
  icon: IconType;
  title: string;
  lines?: string[];
  isSocial?: boolean;
}

const ContactInfoBlock: React.FC<Props> = ({ icon: Icon, title, lines, isSocial }) => {
  const{t}=useTranslation();
  return (
    <div className="flex gap-4  items-start">
      <Icon className="text-brown text-xl mt-1" />
      <div>
        <h4 className="font-nunito font-extrabold text-lg mb-2">{t(title)}</h4>

        {isSocial ? (
          <div className="flex gap-2 mt-1">
            {socialLinks.map((item, index) => {
              const SocialIcon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center text-gray-500 hover:bg-yellow hover:text-white hover:border-yellow transition"
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
              className="font-nunito text-base text-gray-600 leading-relaxed"
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

"use client";

import React from "react";
import Image from "next/image";
import { FaHandHoldingHeart } from "react-icons/fa";
import ContactForm from "./ContactForm";
import ContactInfoBlock, { contactInfo } from "./ContactInfoBlock";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { useTranslation } from "react-i18next";

const ContactUs = () => {

  const {t} = useTranslation();
  return (
    <div className="bg-white py-22  flex justify-center">
      <div className="w-11/12 xl:w-10/12 flex flex-wrap gap-30 justify-between ">
        {/* Left Section */}
        <AnimatedReveal className="flex-1 ">
          <p className="inline-flex items-center justify-center gap-2 text-green font-caveat font-bold text-2xl mb-2">
            <FaHandHoldingHeart size={20} />
            {t("Get In Touch")}
          </p>
          <h1 className="text-[55px] font-nunito font-extrabold text-dark-green mb-1">Contact Us</h1>
          <p className="text-gray-500 font-nunito text-[16px] capitalize  leading-7 mb-12">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque inventore
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12 max-w-[700px]">
            {contactInfo.map((info, idx) => (
              <ContactInfoBlock
                key={idx}
                icon={info.icon}
                title={info.title}
                lines={info.lines}
                isSocial={info.isSocial}
              />
            ))}
          </div>

          {/* Contact Image */}
          <div className="w-full text-center mt-6 ">
            <Image
              src="/contact.png"
              alt="Contact Illustration"
              height={260}
              width={516}
              className="w-full  h-auto object-cover"
            />
          </div>
        </AnimatedReveal>

        {/* Right Section - Form */}

        <AnimatedReveal className="flex-1 bg-white p-10 rounded-xl border border-gray-200 shadow-md">
          <h2 className="text-4xl font-bold mb-3">Fill Up The Form</h2>
          <p className="font-nunito text-base text-gray-500 mb-15">
            Your email address will not be published. Required fields are marked *
          </p>
          <ContactForm />
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default ContactUs;

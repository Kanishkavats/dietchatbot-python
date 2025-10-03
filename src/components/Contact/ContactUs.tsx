"use client";

import React from "react";
import Image from "next/image";
import { FaHandHoldingHeart, FaStar } from "react-icons/fa";
import ContactForm from "./ContactForm";
import ContactInfoBlock, { contactInfo } from "./ContactInfoBlock";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { useTranslation } from "react-i18next";
import { useFetchApprovedFeedbacks } from "@/src/hooks/useFeedback";
import { Feedback } from "@/src/types/feedback";

const ContactUs = () => {
  console.log('check')
  const { t } = useTranslation();
  const { data } = useFetchApprovedFeedbacks(1, 10, "all");
  console.log("check", data);

  return (
    <div className="bg-white py-22 px-20 border ">
      <div className=" grid lg:grid-cols-2 gap-12">
        {/* Left Section */}
        <AnimatedReveal className="flex-1 ">
          <p className="inline-flex items-center justify-center gap-2 text-green font-caveat font-bold text-2xl mb-2">
            <FaHandHoldingHeart size={20} />
            {t("Get In Touch")}
          </p>
          <h1 className="text-[30px] md:text-[40px] xl:text-[55px] font-nunito font-extrabold text-dark-green mb-1">{t("Contact Us")}</h1>
          <p className="text-muted-gray font-nunito text-[16px]  capitalize leading-7 md:leading-8 mb-12">
            {t("Your support makes a difference. If you would like to learn more about our work, make a donation, or find out how you can volunteer, you can contact us using the information below.")}
          </p>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 mb-12 max-w-[700px] ">
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

        <AnimatedReveal className="flex-1 bg-white ">
          <div className="p-10   rounded-xl border border-gray-200  ">
            <h2 className="text-4xl font-bold mb-3">{t("Fill Up The Form")}</h2>
            <p className="font-nunito text-base text-gray-500 mb-15">
              {t("Your email address will not be published. Required fields are marked *")}
            </p>
            <ContactForm />
          </div>
        </AnimatedReveal>
      </div>
      {data?.feedback?.length > 0 && (
        <div className=" mt-20">
          <h2 className="text-3xl font-bold text-dark-green mb-6">What People Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.feedback.map((item: Feedback) => (
              <div key={item.id} className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  {item.image && typeof item.image === "string" && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full object-cover"
                    />)}
                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.designation}</p>
                  </div>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">{item.feedback}</p>
                <div className="flex gap-1 text-yellow">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;

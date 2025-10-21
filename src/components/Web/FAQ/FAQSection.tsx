"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import FAQList from "./FAQList";
import FAQSideImages from "./FAQSideImages";
import FadeInUp from "@/src/animations/FadeInUp";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const{t}=useTranslation();

  return (
      <div className="w-full lg:flex relative  lg:h-[800px] xl:h-[900px]  md:gap-8 items-start bg-white  overflow-hidden">
        {/* Left Side - FAQ */}
        <div className="lg:w-2/3 px-2  md:px-10 lg:px-0 xl:px-16 py-20 xl:mb-50 mx-auto 2xl:max-w-2xl lg:pl-15  ">
          <FadeInUp>
            <div className=" font-caveat flex items-start gap-2 text-green font-semibold mb-4 text-lg md:text-xl lg:text-2xl ">
              <Icon icon="mingcute:hand-heart-line" className="text-3xl" />
              <span>{t("Start Donating Poor People")}</span>
            </div>
            <h2 className="text-3xl md:text-[40px] font-nunito lg:text-[38px] xl:text-[56px] font-extrabold text-gray-900 mb-8 md:mb-10 lg:max-w-5xl">
              {t("Frequently")} <span className="text-yellow">{t("Asked")}</span> {t("Questions")}
            </h2>
          </FadeInUp>
          <FadeInUp>
            <div className="lg:absolute  lg:z-20 xl:z-0 lg:max-w-2xl ">
            <FAQList openIndex={openIndex} setOpenIndex={setOpenIndex} />
            </div>
          </FadeInUp>
        </div>
        {/* Right Side - Images */}
        <FAQSideImages />
      </div>
  );
};

export default FAQSection;

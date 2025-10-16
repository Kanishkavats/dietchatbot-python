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
      <div className="w-full lg:flex md:gap-8 items-start bg-white px-2 md:px-14 lg:px-0 xl:px-16 pt-16 md:pt-8 max-w-full overflow-hidden">
        {/* Left Side - FAQ */}
        <div className="lg:w-2/3 lg:pl-15">
          <FadeInUp>
<<<<<<< HEAD
            <div className=" font-caveat  flex items-start gap-2 text-green font-semibold mb-4 text-lg lg:text-2xl">
            <div className=" font-caveat flex items-start gap-2 text-green font-semibold mb-4 text-lg md:text-[20px] lg:text-2xl">
              <Icon icon="mingcute:hand-heart-line" className="text-3xl" />
              <span>{t("Start Donating Poor People")}</span>
            </div>
            <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-8">
            <h2 className="text-3xl md:text-[30px] font-nunito xl:text-4xl 2xl:text-[55px] lg:text-[40px] font-extrabold text-gray-900 mb-8">
=======
            <div className=" font-caveat flex items-start gap-2 text-green font-semibold mb-4 text-lg md:text-xl lg:text-2xl">
              <Icon icon="mingcute:hand-heart-line" className="text-3xl" />
              <span>{t("Start Donating Poor People")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-nunito xl:text-4xl font-extrabold text-gray-900 mb-8">
>>>>>>> 6c44b47fa356aa44c2aab774963610805c5cbbed
              {t("Frequently")} <span className="text-yellow">{t("Asked")}</span> {t("Questions")}
            </h2>
          </FadeInUp>
          <FadeInUp>
            <FAQList openIndex={openIndex} setOpenIndex={setOpenIndex} />
          </FadeInUp>
        </div>
        {/* Right Side - Images */}
        <FAQSideImages />
      </div>
  );
};

export default FAQSection;

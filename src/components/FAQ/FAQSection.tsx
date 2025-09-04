"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import FAQList from "./FAQList";
import FAQSideImages from "./FAQSideImages";
import FadeInUp from "@/src/animations/FadeInUp";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
      <div className="w-full px-4 lg:flex md:gap-12 items-start">
        {/* Left Side - FAQ */}
        <div className="lg:w-1/2">
          <FadeInUp>
            <div className=" font-caveat  flex items-start gap-2 text-[var(--green)] font-semibold mb-4 text-lg lg:text-2xl">
              <Icon icon="mingcute:hand-heart-line" className="text-3xl" />
              <span>Start Donating Poor People</span>
            </div>
            <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-8">
              Frequently <span className="text-[var(--yellow)]">Asked</span> Questions
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

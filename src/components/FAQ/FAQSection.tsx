"use client";

import { useState } from "react";
import Image from "next/image";
import FAQAccordion from "../Accordians/FAQAccordion";
import { faqData } from "@/staticResource";
import { manWithChildren, verticalShape, womenWithOneChild } from "@/assets";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Icon } from "@iconify/react/dist/iconify.js";


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { primaryColor } = useSelector((state: RootState) => state.theme)

  return (
    <section className="bg-white lg:ps-16 py-16 md:py-24 flex justify-center items-center">
      <div className="w-[95%] px-4 lg:flex md:gap-12 items-start ">
        {/* FAQ Accordion */}
        <div className="lg:w-1/2">
          <div className="flex items-start justify-baseline gap-2 text-shadow-palate-quaternary-green font-semibold mb-4 text-lg lg:text-2xl">
            <Icon icon="mingcute:hand-heart-line" className="text-3xl" />
            <span>Start Donating Poor People</span>
          </div>
          <h2 className=" text-3xl xl:text-4xl font-bold text-gray-900 mb-8">
            Frequently <span className="text-yellow-400">Asked</span> Questions
          </h2>
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <FAQAccordion
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* Side Images */}
        <div className=" hidden lg:block lg:w-1/2 mt-12 xl:mt-0 h-screen relative lg:flex ps-[5%] items-center  bg-palate-quaternary-green">
          <div className="absolute top-0 left-0 w-10 h-full z-10">
            <Image
              src={verticalShape.src}
              fill
              alt="shape"
            />
          </div>
          <div className="w-full md:w-3/5 h-[80%] relative rounded-2xl  border-10  border-palate-white shadow-lg">

            <div className=" relative w-full h-full">
              <Image
                src={manWithChildren.src}
                alt="Happy family"
                fill
                className="object-cover"
              />
              {/* line */}
              <div className={`w-4 h-30 xl:h-40 rounded-xl absolute bottom-0 right-[-50] bg-${primaryColor}`} />
            </div>
          </div>
          <div className="w-2/4 mt-6  h-68 absolute right-0 top-[30%] xl:top-[30%] rounded-lg overflow-hidden shadow-lg border-4 border-white -translate-y-16 z-10">
            <Image
              src={womenWithOneChild.src}
              alt="Mother with child"
              fill
              className="object-cover"
            />
          </div>


        </div>
      </div>
    </section>
  );
};

export default FAQSection;

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/src/staticResource";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { bgOneVolunteer, valueableshape, image99 } from "../../../public/assets";
import { useTranslation } from "react-i18next";
const ValueableCustomer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { t } = useTranslation();
  const [visibleCards, setVisibleCards] = useState(3);
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Duplicate slides for infinite effect
  const slides = [...testimonials, ...testimonials.slice(0, visibleCards)];
  const handleNext = () => {
    setInstant(false);
    setIndex((prev) => (prev + 1 >= slides.length ? 0 : prev + 1));

  };
  const handlePrev = () => {

    setInstant(false);
    setIndex((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  };
  // Auto-slide every 3s (pause when hovered)
  useEffect(() => {
    if (!hovered) {
      const id = setInterval(() => handleNext(), 3000);
      return () => clearInterval(id);
    }
  }, [hovered]);
  // Reset instantly when reaching cloned slides
  useEffect(() => {
    if (index >= slides.length - visibleCards + 1) {
      setInstant(true);
      setIndex(0);
    }
  }, [index, slides.length, visibleCards]);
  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center py-16"
      style={{ backgroundImage: `url(${bgOneVolunteer.src})` }}
    >
      {/* Background Shape */}
      <div
        className="absolute top-0 left-0 w-[60%] h-[40%] bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${valueableshape.src})` }}
      ></div>
      <div className="mt-20">
        {/* Heading */}
        <motion.div
          className="py-16"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 justify-center">
                        <i className="text-2xl hand-icon text-[#00715D]"></i>
            <span 
              className="text-[#00715D] text-[24px] font-caveat font-cursive font-semibold leading-[34px] -mt-[8px]"
              style={{ width: '362.71px', height: '34px' }}
            >
              {t("Start Donating Poor People")}
            </span>
          </div>
          <div className="mt-[15px] px-[12px]">
            <h2 className="text-center text-[45px] font-extrabold font-nunito text-[#122F2A] mb-0">
              {t("Our Valueable")}
              <span className="text-yellow"> {t("Customer")}</span>
            </h2>
            <h2 className="text-center text-[45px] font-extrabold font-nunito text-[#122F2A] mt-0">
              {t("Awesome Feedback")}
            </h2>
          </div>
        </motion.div>
        {/* Carousel */}
        <div className="container mx-auto px-25">
          <div
            className="relative overflow-hidden w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <motion.div className="flex"
              animate={{ x: `-${(100 / slides.length) * index}%` }}
              transition={
                instant ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }
              }
              style={{ width: `${(slides.length / visibleCards) * 100}%` }}
            >
              {slides.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="relative bg-white border border-yellow rounded-3xl p-8 flex flex-col justify-between shadow-sm  overflow-hidden">
                    <Image
                      src={image99}
                      alt="green spade"
                      width={70}
                      height={70}
                      className="absolute top-8 right-6 opacity-10 z-0"
                    />
                    <div>
                      <div className="flex mb-4 px-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IoMdStar
                            key={i}
                            size={20}
                            className="fill-yellow text-yellow"
                          />
                        ))}
                      </div>
                      <p className="text-[#667471] font-nunito text-lg px-6 leading-relaxed break-words">
                        “{t(item.review)}”
                      </p>
                    </div>
                    <div className="flex items-center mt-6 mb-3 px-6">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"

                      
                      />
                      <div className="ml-3">
                        <h4 className="font-bold font-nunito  text-foreground">
                          {t(item.name)}
                        </h4>
                        <p className="text-gray-500 font-nunito text-sm">{t(item.role)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full bg-[#122F2A] hover:bg-yellow hover:text-black text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
            >
              <ArrowLeft size={28} />
              </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-yellow hover:bG-[#122f2A] text-black hover:text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
            >
              <ArrowRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ValueableCustomer;  
  
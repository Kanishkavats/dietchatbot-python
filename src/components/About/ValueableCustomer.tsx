



"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { bgOneVolunteer, valueableshape, image99 } from "../../../public/assets";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchFeedback } from "@/src/services/webForms";

const ValueableCustomer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { t } = useTranslation();

  // Fetch API data
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
  });

  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cardWidth, setCardWidth] = useState(456); // default desktop width
  const [visibleCards, setVisibleCards] = useState(10);

  // Responsive breakpoints: set card width and visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardWidth(298); // mobile
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setCardWidth(456); // tablet
        setVisibleCards(2);
      } else {
        setCardWidth(456); // desktop
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Duplicate slides for infinite effect
  const slides = [...feedbacks, ...feedbacks.slice(0, visibleCards)];

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

  if (isLoading) {
    return <p className="text-center text-lg">Loading feedback...</p>;
  }

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
              className="text-[#00715D] text-[24px] font-caveat font-semibold leading-[34px] -mt-[8px]"
              style={{ width: "362.71px", height: "34px" }}
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
        <div className="container mx-auto xl:px-20 lg:px-14 px-4">
          <div
            className="relative overflow-hidden w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${index * cardWidth}px` }}
              transition={
                instant ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }
              }
            >
              {slides.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3 lg:px-3"
                  style={{ minWidth: `${cardWidth}px` }}
                >
                  <div className="relative bg-white border border-yellow rounded-3xl flex flex-col justify-between shadow-sm overflow-hidden px-[20px] py-[40px] h-[445px] lg:h-[385px] xl:h-[356px] w-full lg:p-10 xl:p-10">
                    <Image
                      src={image99}
                      alt="green spade"
                      width={70}
                      height={70}
                      className="absolute top-8 right-6 opacity-10 z-0"
                    />
                    <div>
                      {/* Rating stars */}
                      <div className="flex mb-4 px-6">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <IoMdStar
                            key={i}
                            size={20}
                            className="fill-yellow text-yellow"
                          />
                        ))}
                      </div>
                      <p className="text-[#667471] font-nunito text-lg px-6 lg:text-[16px] leading-relaxed break-words">
                        “{item.feedback || t(item.review)}”
                      </p>
                    </div>
                    <div className="flex items-center mt-6 mb-3 px-6">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={item.image || item.avatar || "/assets/author.png"}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-bold font-nunito lg:text-[18px] text-foreground">
                          {t(item.name)}
                        </h4>
                        <p className="text-gray-500 lg:text-[14px] font-nunito text-sm">
                          {t(item.designation || item.role)}
                        </p>
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
              className="w-14 h-14 rounded-full bg-yellow hover:bg-[#122f2A] text-black hover:text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
            >
              <ArrowRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueableCustomer;



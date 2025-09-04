"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ValueableCustomer = () => {
  const testimonials = [
    {
      name: "Michel Smith",
      role: "Cloth Store Inc.",
      avatar: "/assets/author.png",
      review:
        "Charity is the voluntary act of giving help, typically in the form of money, time, or resources, to those in need. Charitable organizations aim to solve social, environmental, and economic challenges by addressing issues like poverty.",
    },
    {
      name: "Ruby Klara",
      role: "Cloth Store Inc.",
      avatar: "/assets/author.png",
      review:
        "Charity is the voluntary act of giving help, typically in the form of money, time, or resources, to those in need. Charitable organizations aim to solve social, environmental, and economic challenges by addressing issues like poverty.",
    },
    {
      name: "Bishu Kiev",
      role: "Cloth Store Inc.",
      avatar: "/assets/author.png",
      review:
        "Charity is the voluntary act of giving help, typically in the form of money, time, or resources, to those in need. Charitable organizations aim to solve social, environmental, and economic challenges by addressing issues like poverty.",
    },
  ];

  const slides = [...testimonials, ...testimonials];

  const [visibleCards, setVisibleCards] = useState(3);
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setInstant(false);
    setIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setInstant(false);
    setIndex((prev) => (prev - 1 < 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const id = setInterval(() => handleNext(), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (index === testimonials.length) {
      setInstant(true);
      setIndex(0);
    }
  }, [index, testimonials.length]);

  return (
    <section className="relative w-full min-h-screen bg-[url('/assets/bg-one-volunteer.png')] bg-cover bg-center py-16">
      <div className="absolute top-0 left-0 w-[60%] h-[40%] bg-[url('/assets/valueableshape.png')] bg-no-repeat bg-contain"></div>
      <div className="mt-20">
        <div className="py-16">
          <div className="flex items-center justify-center text-[#046b59]">
            <i className="text-xl  hand-icon"></i>
            <span className="text-[var(--color-palate-quaternary-green)] text-xl font-caveat font-semibold">
              Start Donating Poor People
            </span>
          </div>
          <div>
            <h2 className="text-center text-4xl md:text-5xl font-bold font-nunito">
              Our Valueable
              <span className="text-yellow-400"> Customer</span>
            </h2>
            <h2 className="text-center text-4xl md:text-5xl font-bold font-nunito ">
              Awesome Feedback
            </h2>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden w-full">
            <motion.div
              className="flex"
              animate={{ x: `-${index * (100 / visibleCards)}%` }}
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
                  <div className="relative bg-white border border-yellow-400 rounded-2xl p-6 flex flex-col justify-between shadow-sm h-full overflow-hidden">
                    <Image
                      src="/assets/99.png"
                      alt="green spade"
                      width={70}
                      height={70}
                      className="absolute top-8 right-6 opacity-10 z-0"
                    />
                    <div>
                      <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IoMdStar
                            key={i}
                            size={20}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-[#667471] leading-relaxed">
                        “{item.review}”
                      </p>
                    </div>
                    <div className="flex items-center mt-6">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-gray-500 text-sm">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full bg-gray-800 hover:bg-[#FFC107] hover:text-black text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
            >
              <ArrowLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-[#FFC107] hover:bg-gray-800 text-black hover:text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
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

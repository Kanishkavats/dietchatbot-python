"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { bannerBg } from "@/public/assets";
import PageBanner from "../common/PageBanner";
import Button from "../common/Buttons/Button";
import SendMsg from "../About/SendMsg";
import ChildrenNeed from "../About/ChildrenNeed";
import { motion, useInView } from "framer-motion";
import DonationCard from "../common/card/DonationCard";
import FadeUpCard from "@/src/animations/FadeButtomUp";
import { donationCardsBig } from "@/src/staticResource";
import { BiLeftArrow } from "react-icons/bi";

const DonationPage: React.FC = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [leftButtonColor, setLeftButtonColor] = useState<"yellow" | "green">(
    "green"
  );
  const [rightButtonColor, setRightButtonColor] = useState<"yellow" | "green">(
    "yellow"
  );
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isCarouselInView = useInView(carouselSectionRef, {
    once: true,
    margin: "-100px",
  });

  const handleCardClick = (category: string) => {
    if (category === "Food") {
      router.push("/donation?type=food");
    } else if (category === "Health") {
      router.push("/donation?type=health");
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
    // Set both buttons to the hovered color of left button
    const newColor = hoveredLeft ? "yellow" : "green";
    setLeftButtonColor(newColor);
    setRightButtonColor(newColor);
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
    // Set both buttons to the hovered color of right button
    const newColor = hoveredRight ? "green" : "yellow";
    setLeftButtonColor(newColor);
    setRightButtonColor(newColor);
  };

  return (
    <>
      <PageBanner
        bgImage={bannerBg}
        tagline="Start Donating Poor People"
        title="our causes "
        smallIcon="mdi:hand-heart"
        decoIcon="mdi:ribbon"
        decoPosition="absolute bottom-10 left-10"
      />

      {/* Donation Causes Section */}
      <section
        ref={sectionRef}
        className="relative py-20 min-h-[500px] overflow-hidden"
      >
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <FadeUpCard delay={0.3}>
            <div className="text-center mb-16">
              {/* Top Left Text */}
              <div className="flex items-center justify-center mb-6">
                <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
                <span className="text-[var(--green)] font-caveat text-2xl font-bold">
                  Start Donating Poor People
                </span>
              </div>

              {/* Main Heading */}
              <h2
                className="text-5xl md:text-6xl font-extrabold leading-tight mb-8"
                style={{
                  fontFamily: "var(--font-nunito), Nunito, sans-serif",
                  fontWeight: "700",
                }}
              >
                <span className="text-gray-800  font-extrabold">
                  Be The Reason Of Someone{" "}
                </span>
                <br />

                <span className="text-yellow-400 font-extrabold ">Smiles </span>
                <span className="text-gray-800  font-extrabold">Causes</span>
              </h2>
            </div>
          </FadeUpCard>

          {/* Static Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationCardsBig.map((card, index) => (
              <FadeUpCard
                key={index}
                delay={index * 0.3}
                onAnimationComplete={() => {}}
              >
                <DonationCard
                  key={card.id}
                  card={card}
                  isInView={isInView}
                  hoveredCard={hoveredCard}
                  onMouseEnter={setHoveredCard}
                  onMouseLeave={() => setHoveredCard(null)}
                  onCardClick={handleCardClick}
                />
              </FadeUpCard>
            ))}
          </div>

          {/* Pagination Section */}
          <FadeUpCard delay={0.3}>
            <div className="flex justify-center items-center mt-12">
              <div className="flex items-center space-x-3">
                {/* Previous Page Button */}
                <button className="w-12 h-12 rounded-full bg-green flex items-center justify-center text-white hover:bg-yellow transition-colors duration-300">
                  <span className="text-lg font-bold">«</span>
                </button>

                {/* Page Numbers */}
                <button
                  className="w-12 h-12 rounded-full bg-gray  border-gray flex items-center justify-center text-black font-bold hover:bg-yellow transition-colors duration-300"
                  onClick={() => router.push("/latestnews")}
                >
                  1
                </button>

                <button className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold hover:bg-yellow transition-colors duration-300">
                  2
                </button>

                <button
                  className="w-12 h-12 rounded-full bg-gray flex items-center justify-center text-black font-bold hover:bg-yellow transition-colors duration-300"
                  onClick={() => router.push("/latestnews")}
                >
                  3
                </button>

                {/* Next Page Button */}
                <button className="w-12 h-12 rounded-full bg-green flex items-center justify-center text-white hover:bg-yellow transition-colors duration-300">
                  <span className="text-lg font-bold">»</span>
                </button>
              </div>
            </div>
          </FadeUpCard>
        </div>
      </section>

      {/* Children Need Your Help Section */}
      <ChildrenNeed />

      {/* Help & Donate Carousel Section */}
      <section
        ref={carouselSectionRef}
        className="relative py-20 min-h-[500px] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="h-1/2 bg-white"></div>
          <div
            className="h-1/2 bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/assets/section3/bgsection3.png')",
            }}
          >
            <div className="absolute inset-0 bg-black/4"></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-16">
            {/* Left Side - Main Content */}
            <div className="flex-1 max-w-2xl">
              {/* Top Left Text */}
              <div className="flex items-center mb-6">
                <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
                <span className="text-[var(--green)] font-caveat text-2xl font-bold">
                  Start Donating Poor People
                </span>
              </div>

              {/* Main Heading */}
              <h2
                className="text-5xl md:text-6xl font-bold leading-tight mb-8"
                style={{
                  fontFamily: "var(--font-nunito), Nunito, sans-serif",
                  fontWeight: "700",
                }}
              >
                <div className="w-[761px]">
                  <span className="text-gray-800">Help & </span>
                  <span className="text-yellow-400">Donate </span>
                  <span className="text-gray-800">Them when</span>
                </div>
                <div className="block">
                  <span className="text-gray-800">They are In Need</span>
                </div>
              </h2>
            </div>

            {/* Right Side - Navigation Arrows */}
            <div className="flex items-center gap-4 ml-12 mt-12">
              <button
                onClick={handlePrev}
                onMouseEnter={() => setHoveredLeft(true)}
                onMouseLeave={() => setHoveredLeft(false)}
                className="w-15 h-15 rounded-full flex items-center justify-center  cursor-pointer"
                style={{
                  backgroundColor: hoveredLeft
                    ? "#FBBF24"
                    : leftButtonColor === "yellow"
                    ? "#FBBF24"
                    : "#07110eff",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                <svg
                  className={`h-12 w-8 ${hoveredLeft ? "text-gray-900" : "text-white"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.82843 11L13.1924 5.63604L11.7782 4.22183L4 12L11.7782 19.7782L13.1924 18.364L7.82843 13H20V11H7.82843Z" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                onMouseEnter={() => setHoveredRight(true)}
                onMouseLeave={() => setHoveredRight(false)}
                className="w-16 h-16 rounded-full flex items-center justify-center  cursor-pointer"
                style={{
                  backgroundColor: hoveredRight
                    ? "#07110eff"
                    : rightButtonColor === "yellow"
                    ? "#FBBF24"
                    : "#07110eff",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                <svg
                  className={`h-12 w-8 ${hoveredRight ? "text-white" : "text-gray-900"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.172 11L10.808 5.63604L12.222 4.22183L20 12L12.222 19.7782L10.808 18.364L16.172 13H4V11H16.172Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="absolute -left-15 top-180 transform -translate-y-1/2 opacity-40 hover:opacity-50 transition-opacity duration-300">
            <Image
              src="/assets/section2/spade.png"
              alt="Hand outline"
              width={80}
              height={80}
              className="animate-[float_3s_ease-in-out_infinite]"
            />
          </div>

          {/* Carousel Section */}

          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              spaceBetween={26}
              loop={true}
              autoplay={{ delay: 15000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1280: { slidesPerView: 4, spaceBetween: 30 },
              }}
              className="h-auto"
              navigation={{
                prevEl: null,
                nextEl: null,
              }}
              style={
                {
                  "--swiper-navigation-size": "0px",
                } as React.CSSProperties
              }
            >
              {donationCardsBig.map((card, index) => (
                <SwiperSlide key={`${card.id}-${index}`} className="h-auto">
                  <DonationCard
                    card={card}
                    isInView={isCarouselInView}
                    hoveredCard={hoveredCard}
                    onMouseEnter={setHoveredCard}
                    onMouseLeave={() => setHoveredCard(null)}
                    onCardClick={handleCardClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Send Message For Donation Section */}
      <SendMsg />
    </>
  );
};

export default DonationPage;


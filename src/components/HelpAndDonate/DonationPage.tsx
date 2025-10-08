"use client";

import React, { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import DonationCard from "../common/card/DonationCard";
import PageBanner from "../common/PageBanner";
import FadeUpCard from "@/src/animations/FadeButtomUp";
import ChildrenNeed from "../About/ChildrenNeed";
import SendMsg from "../About/SendMsg";
import { ourcausebanner } from "@/public/assets";
import { useFetchAllCampaigns } from "@/src/hooks/useCampaigns";

import "swiper/css";
import "swiper/css/navigation";

const DonationPage: React.FC = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const [leftButtonColor, setLeftButtonColor] = useState("default");
  const [rightButtonColor, setRightButtonColor] = useState("default");
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isCarouselInView = useInView(carouselSectionRef, { once: true, margin: "-100px" });

  // Pagination state
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useFetchAllCampaigns(page, 8);

  const handleCardClick = (id: string) => {
    router.push(`/campaign/${id}`);
  };

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  // Map API data
  const campaignsToDisplay = useMemo(() => {
    if (!data?.campaigns) return [];
    return data.campaigns.map((campaign: any) => ({
      id: campaign._id || campaign.id,
      image: campaign.images?.[0] || "/default-image.jpg",
      category: campaign.category,
      title: campaign.title,
      description: campaign.description,
      progress: (campaign.raisedAmount / campaign.goalAmount) * 100,
      raised: `$${campaign.raisedAmount}`,
      goal: `$${campaign.goalAmount}`,
    }));
  }, [data]);

  if (isLoading) return <p>Loading campaigns...</p>;
  if (isError) return <p>Failed to load campaigns.</p>;

  const donationCardsBig = campaignsToDisplay;

  return (
    <>
      <PageBanner
        bgImage={ourcausebanner}
        tagline="Start Donating Poor People"
        title="Our Causes"
        smallIcon="mdi:hand-heart"
        decoIcon="mdi:ribbon"
        decoPosition="absolute bottom-10 left-10"
      />

      {/* === Section 1 === */}
      <section ref={sectionRef} className="relative py-20 min-h-[500px] overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeUpCard delay={0.3}>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
                <span className="text-[var(--green)] font-caveat text-2xl font-bold">
                  Start Donating Poor People
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8">
                <span className="text-gray-800 font-extrabold">Be The Reason Of Someone </span>
                <br />
                <span className="text-yellow-400 font-extrabold">Smiles </span>
                <span className="text-gray-800 font-extrabold">Causes</span>
              </h2>
            </div>
          </FadeUpCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaignsToDisplay.map((card:any, index:number) => (
              <FadeUpCard key={card.id || index} delay={index * 0.2}>
                <DonationCard
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
        </div>
      </section>

      <ChildrenNeed />

      {/* === Carousel Section === */}
      <section ref={carouselSectionRef} className="relative py-20 min-h-[500px] overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4 mt-6 md:mt-12 ml-0 md:ml-12">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoveredLeft(true)}
              onMouseLeave={() => setHoveredLeft(false)}
              className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
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
              className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
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

          {/* Swiper */}
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
            speed={850}
          >
            {donationCardsBig.map((card:any, index:number) => (
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
      </section>

      <SendMsg />
    </>
  );
};

export default DonationPage;

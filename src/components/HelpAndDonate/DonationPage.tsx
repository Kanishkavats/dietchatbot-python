"use client";

import React, { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import DonationCard from "../common/card/DonationCard";
import PageBanner from "../common/PageBanner";
import FadeUpCard from "@/src/animations/FadeButtomUp";
import ChildrenNeed from "../About/ChildrenNeed";
import SendMsg from "../About/SendMsg";
import { ourcausebanner } from "@/public/assets";
import { useFetchAllCampaigns } from "@/src/hooks/useCampaigns";

import "swiper/css";
import "swiper/css/navigation";


import { useTranslation } from "react-i18next";


const DonationPage: React.FC = () => {
  const {t} = useTranslation();
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
  const { data, isLoading, isError }: any = useFetchAllCampaigns(page, 8);
  console.log("check", data);

  const handleCardClick = (id?: string) => {
    if (!id) return;
    router.push(`/campaign/${id}`);
  };

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  // Map API data
  const campaignsToDisplay = useMemo(() => {
    if (!(data as any)?.campaigns) return [];
    return (data as any).campaigns.map((campaign: any) => ({
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

  const donationCardsBig = campaignsToDisplay;

  return (
    <>
      <PageBanner
        bgImage={ourcausebanner}
        tagline={t("Start Donating Poor People")}
        title={t("Our Causes")}
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
                  {t("Start Donating Poor People")}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-nunito leading-tight mb-8">
                <span className="text-gray-800 font-bold">{t("Be The Reason Of Someone")} </span>
                <br />
                <span className="text-yellow-400 font-bold">{t("Smiles")} </span>
                <span className="text-gray-800 font-bold">{t("Causes")}</span>
              </h2>
            </div>
          </FadeUpCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeleton for grid
              Array.from({ length: 8 }).map((_, index) => (
                <FadeUpCard key={`skeleton-${index}`} delay={index * 0.1}>
                  <div className="bg-gray-200 animate-pulse rounded-lg h-80">
                    <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-300 rounded w-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
                </FadeUpCard>
              ))
            ) : isError ? (
              <div className="col-span-full text-center py-8">
                <p className="text-red-500">Failed to load campaigns. Please try again.</p>
              </div>
            ) : (
              campaignsToDisplay.map((card:any, index:number) => (
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
              ))
            )}
          </div>
        </div>
      </section>

      <ChildrenNeed />

      {/* === Carousel Section === */}
      <section ref={carouselSectionRef} className="relative py-20 min-h-[500px] overflow-hidden  ">
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <FadeUpCard delay={0.3}>
              <div className="text-left mb-8 md:mb-12">
                <div className="flex items-center mb-4">
                  <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
                  <span className="text-[var(--green)] font-caveat text-base sm:text-lg md:text-xl lg:text-2xl font-bold w-full">
                    {t("Start Donating Poor People")}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight w-full" style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800'}}>
                  <div className="w-full">
                    <span className="text-gray-800">{t("Help &")} </span>
                    <span className="text-yellow-400">{t("Donate")} </span>
                    <span className="text-gray-800">{t("Them when")}</span>
                  </div>
                  <div className="block">
                    <span className="text-gray-800">{t("They are In Need")}</span>
                  </div>
                </h2>
              </div>
            </FadeUpCard>
            <div className="flex items-center gap-3 sm:gap-4 mt-0 md:mt-14">
              <button
                onClick={handlePrev}
                className="prev-btn cursor-pointer w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#122F2A] hover:bg-yellow hover:text-black text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
              >
                <ArrowLeft size={24} className="sm:w-7 sm:h-7" />
              </button>
              <button
                onClick={handleNext}
                className="next-btn cursor-pointer w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow hover:bg-[#122f2A] text-black hover:text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
              >
                <ArrowRight size={24} className="sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>

          {/* Swiper */}
          {isLoading ? (
            // Loading skeleton for carousel
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={`carousel-skeleton-${index}`} className="bg-gray-200 animate-pulse rounded-lg h-80">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load campaigns. Please try again.</p>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      <SendMsg />
    </>
  );
};

export default DonationPage;

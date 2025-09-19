"use client";

import React, { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import DonationCard from "../common/card/DonationCard";
import PageBanner from "../common/PageBanner";
import FadeUpCard from "@/src/animations/FadeButtomUp";
import ChildrenNeed from "../About/ChildrenNeed";
import EventPagination from "../Eventpaginations";
import { bannerBg } from "@/public/assets";
import { useFetchAllCampaigns } from "@/src/hooks/useCampaigns";

import "swiper/css";
import "swiper/css/navigation";

const DonationPage: React.FC = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isCarouselInView = useInView(carouselSectionRef, { once: true, margin: "-100px" });

  // Pagination state
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useFetchAllCampaigns(page, 8);

  const handleCardClick = (id: string) => {
    router.push(`/campaign/${id}`); // Navigate to campaign details
  };

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  // Map API data
  const campaignsToDisplay = useMemo(() => {
    if (!data?.campaigns) return [];
    return data.campaigns.map((campaign: any) => ({
      id: campaign._id || campaign.id, // ensure id exists
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

  return (
    <>
      <PageBanner
        bgImage={bannerBg}
        tagline="Start Donating Poor People"
        title="Our Causes"
        smallIcon="mdi:hand-heart"
        decoIcon="mdi:ribbon"
        decoPosition="absolute bottom-10 left-10"
      />

      <section ref={sectionRef} className="relative py-20 min-h-[500px] overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeUpCard delay={0.3}>
            <h2 className="text-5xl font-extrabold text-center mb-12">Be The Reason Of Someone Smiles</h2>
          </FadeUpCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaignsToDisplay.map((card, index) => (
              <FadeUpCard key={card.id || index} delay={index * 0.2}>
                <DonationCard
                  card={card}
                  isInView={isInView}
                  hoveredCard={hoveredCard}
                  onMouseEnter={setHoveredCard}
                  onMouseLeave={() => setHoveredCard(null)}
                  onCardClick={handleCardClick} // pass card id
                />
              </FadeUpCard>
            ))}
          </div>

          <FadeUpCard delay={0.3}>
            <div className="flex justify-center items-center mt-12">
              <EventPagination totalPages={data.totalPages || 1} currentPage={page} onPageChange={setPage} />
            </div>
          </FadeUpCard>
        </div>
      </section>

      <ChildrenNeed />
    </>
  );
};

export default DonationPage;



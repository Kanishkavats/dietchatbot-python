"use client";
import HeroCause from "./DonationSection";
import SearchBox from "./SearchBox";
import RecentCauses from "./RecentCauses";
import DonationCard from "./DonationCard";
import TagList from "./TagList";
import { bannerBg, heartLogoIcon, overView } from "@/public/assets";
import { faqData, tags } from "@/src/staticResource";
import FAQAccordion from "../Accordians/FAQAccordion";
import { useState } from "react";
import Gallery from "./Gallery";
import FadeInUp from "@/src/animations/FadeInUp";
import PageBanner from "../common/PageBanner";
import DonationSection from "./DonationSection";

const DonateUs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      <PageBanner
        bgImage={bannerBg}
        tagline="Start Donating Poor People"
        title="Donate Us"
        smallIcon="mdi:hand-heart"
        decoIcon="mdi:ribbon"
        decoPosition="absolute bottom-10 left-10"
      />
      <section className="bg-gray-100 py-16 flex justify-center items-center w-full">
        <div className="w-11/12 xl:w-10/12">
          <div className=" grid grid-cols-1 xl:grid-cols-3 gap-10">
            <div className="xl:col-span-2 relative">
              <DonationSection />
              <div className="col-span-2 space-y-6 ">
                <Gallery />
                <FadeInUp
                  className="space-y-6 "
                >
                  {faqData.map((item, index) => (
                    <FAQAccordion
                      key={index}
                      item={item}
                      isOpen={openIndex === index}
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                  ))}
                </FadeInUp>
              </div>
            </div>
            <div className="space-y-8 clear-both ">
              <SearchBox />
              <RecentCauses />
              <TagList
                tags={tags}
                onClick={(tag: string) => console.log("Clicked tag:", tag)}
              />
              <DonationCard
                icon={heartLogoIcon.src}
                backgroundImage={overView.src}
                subtitle="Small Donations Bigger Impact"
                title="Education Health For Every Child"
                buttonText="Get A Quote"
                onButtonClick={() => console.log("Button Clicked!")}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default DonateUs;

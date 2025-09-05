"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { PartnersCompaniesData } from "@/src/staticResource";

const PartnersCompanies = () => {
  return (
    <div className="w-full bg-[var(--gray-200)] py-16 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          loop={true} 
          slidesPerView={4} 
          spaceBetween={40}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false, 
          }}
          speed={800} 
        >
          {PartnersCompaniesData.map((logo, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={80}
                className="object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PartnersCompanies;

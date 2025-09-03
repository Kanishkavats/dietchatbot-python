"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { PartnersCompaniesData } from "@/src/staticResource";



const PartnersCompanies = () => {

    console.log(PartnersCompaniesData)
  return (
    <div className="w-full  bg-palate-white-gray py-20">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={4}
        spaceBetween={40}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          640: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 5, spaceBetween: 40 },
        }}
        speed={1500}
        className="w-full max-w-7xl"
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
  );
}

export default PartnersCompanies;
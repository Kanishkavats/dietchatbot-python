"use client";
import React from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchFeedback } from "@/src/services/webForms";
import { bgOneVolunteer, valueableshape, image99 } from "../../../public/assets";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const ValueableCustomer = () => {
  const { t } = useTranslation();
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
  });

  if (isLoading)
    return <p className="text-center text-lg">{t("Loading feedback...")}</p>;

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center py-16"
      style={{ backgroundImage: `url(${bgOneVolunteer.src})` }}
    >
      <div
        className="absolute top-0 left-0 w-[60%] h-[40%] bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${valueableshape.src})` }}
      />

      <div className="mt-[260px]">
        {/* Heading */}
        <div className="flex items-center gap-2 justify-center">
          <i className="text-2xl hand-icon text-[#00715D] -mb-[100px]" />
          <span className="text-[#00715D] xl:text-[24px] lg:text-[24px] text-[20px] font-caveat font-semibold leading-[34px] -mb-[100px]">
            {t("Start Donating Poor People")}
          </span>
        </div>
        <div className="mt-[15px] px-[12px] py-16 text-center">
          <h2 className="xl:text-[55px] lg:text-[55px] text-[30px] font-nunito font-extrabold text-[#122F2A]">
            {t("Our")}{" "}
            <span className="text-yellow font-nunito">
              {t("Valuable Customers")}
            </span>
          </h2>
          <h3 className="xl:text-[55px] lg:text-[55px] text-[30px] font-nunito font-extrabold text-[#122F2A] mt-0">
            {t("Awesome Feedback")}
          </h3>
        </div>

        {/* Swiper Carousel */}
        <div className="mx-auto w-full px-2 sm:pl-16 sm:pr-8 md:pl-8 lg:px-8 xl:px-20">
          <Swiper
            spaceBetween={12}
            slidesPerView={1}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 12 },
              480: { slidesPerView: 1, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 12 }, // vertical stack
              728: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 2, spaceBetween: 12 },
              1024: { slidesPerView: 2, spaceBetween: 12 },
              1280: { slidesPerView: 3, spaceBetween: 12 },
              1536: { slidesPerView: 3, spaceBetween: 12 },
            }}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            loop
            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
            speed={1000}
            modules={[Navigation, Autoplay]}
            className="pb-12"
          >
            {feedbacks.map((item, idx) => (
              <SwiperSlide key={`${item.id || item.name}-${idx}`}>
                <div className="relative bg-white border border-yellow rounded-3xl flex flex-col justify-between shadow-sm overflow-hidden px-[20px] py-[40px] w-[291px] h-[445.6px] lg:w-[456px] lg:h-[385.6px] xl:w-[356px] xl:h-[415.6px] 2xl:h-[385.6px] 2xl:w-[415.6px] sm:w-[246px] sm:h-[651.6px] md:w-[336px] md:h-[445.6px]">
                  
                  <Image
                    src={image99}
                    alt="green spade"
                    width={106}
                    height={88}
                    className="absolute top-8 right-6 opacity-10 z-0 md:w-[76.79px] md:h-[63.75px] xl:w-[106px] xl:h-[88px] sm:w-[63.99px] sm:h-[53.13px] w-[32.7px] h-[27.15px]"
                  />

                  {/* Rating */}
                  <div className="flex mb-4 px-6">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <IoMdStar
                        key={i}
                        size={20}
                        className="fill-yellow text-yellow"
                      />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-[#667471] font-nunito text-lg px-6 sm:text-[16px] md:text-[18px] xl:text-[16px] lg:text-[16px] text-[16px] leading-relaxed break-words">
                    “{truncateText(t(item.feedback || item.review), 120)}”
                  </p>

                  {/* User Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center mt-6 px-6 gap-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden mx-auto sm:mx-0">
                      <Image
                        src={item.image || item.avatar || "/assets/author.png"}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center sm:items-start mt-2 sm:mt-0 sm:ml-3">
                      <h4 className="font-bold font-nunito sm:text-[18px] md:text-[18px] lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-foreground">
                        {t(item.name)}
                      </h4>
                      <p className="text-gray-500 font-nunito sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[14px] 2xl:text-[14px]">
                        {t(item.designation || item.role)}
                      </p>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              className="prev-btn cursor-pointer w-14 h-14 rounded-full bg-[#122F2A] hover:bg-yellow hover:text-black text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
            >
              <ArrowLeft size={28} />
            </button>
            <button
              className="next-btn cursor-pointer w-14 h-14 rounded-full bg-yellow hover:bg-[#122f2A] text-black hover:text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
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

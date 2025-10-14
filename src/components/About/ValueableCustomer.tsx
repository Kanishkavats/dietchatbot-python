"use client";
import React, { useEffect } from "react";
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
interface props{
  setHasFeedback?:React.Dispatch<React.SetStateAction<boolean | null>>
}
const ValueableCustomer = ({setHasFeedback}:props) => {
  const { t } = useTranslation();
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
  });
//  useEffect(() => {
//     const invalid =
//       !feedbacks ||
//       feedbacks.length === 0 ||
//       feedbacks.every(
//         (f: any) => !f.name || !f.feedback || !f.rating || !f.image
//       );

//     if(setHasFeedback){
//       setHasFeedback(!invalid);
//     }
//   }, [feedbacks, setHasFeedback]);
    // 🟡 Loading state
  if (isLoading) return <p className="text-center text-lg">{t("Loading feedback...")}</p>;

  // 🔴 Hide component if no feedbacks or any required field missing
  const isInvalidData =
    Error ||
    !feedbacks ||
    feedbacks.length === 0 ||
    feedbacks.every(
      (f: any) =>
        !f.name ||
        !f.feedback ||
        !f.rating ||
        !f.image
    );

  // if (isInvalidData()) {
  //   return null; // ❌ Hide entire section if data missing
  // }

  // ✅ Otherwise render section normally
  

  if (isLoading)
    return <p className="text-center text-lg">{t("Loading feedback...")}</p>;

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center py-8 sm:py-12 md:py-16"
      style={{ backgroundImage: `url(${bgOneVolunteer.src})` }}
    >
      <div
        className="absolute top-0 left-0 w-[80%] sm:w-[70%] md:w-[60%] h-[30%] sm:h-[35%] md:h-[40%] bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${valueableshape.src})` }}
      />

      <div className="mt-[100px] sm:mt-[130px] md:mt-[150px] lg:mt-[170px]">
        {/* Heading */}
        <div className="flex items-center gap-2 justify-center">
          <i className="text-2xl hand-icon text-[#00715D] -mb-[20px] sm:-mb-[40px] md:-mb-[60px] lg:-mb-[80px] xl:-mb-[100px]" />
          <span className="text-[#00715D] xl:text-[24px] lg:text-[24px] text-[20px] font-caveat font-semibold leading-[34px] -mb-[20px] sm:-mb-[40px] md:-mb-[60px] lg:-mb-[80px] xl:-mb-[100px]">
            {t("Start Donating Poor People")}
          </span>
        </div>
        <div className="mt-[15px] sm:mt-[10px] md:mt-[5px] lg:mt-[15px] xl:mt-[20px] px-4 sm:px-6 md:px-8 lg:px-[12px] py-8 sm:py-12 md:py-16 text-center">
          <h2 className="text-[22px] sm:text-[28px] md:text-[35px] lg:text-[45px] xl:text-[55px] font-nunito font-extrabold text-[#122F2A] leading-6 sm:leading-8 md:leading-9 lg:leading-10 xl:leading-12">
            {t("Our")}{" "}
            <span className="text-yellow font-nunito">
              {t("Valuable Customers")}
            </span>
          </h2>
          <h3 className="text-[22px] sm:text-[28px] md:text-[35px] lg:text-[45px] xl:text-[55px] font-nunito font-extrabold text-[#122F2A] leading-6 sm:leading-8 md:leading-9 lg:leading-10 xl:leading-12 mt-4 sm:mt-2 md:-mt-2 lg:mt-2 xl:mt-3">
            {t("Awesome Feedback")}
          </h3>
        </div>

        {/* Swiper Carousel */}
        <div className="mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-20 -mt-4 sm:-mt-6 md:-mt-8">
          <Swiper
            spaceBetween={12}
            slidesPerView={1}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 12 },
              480: { slidesPerView: 1, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 12 },
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
            {feedbacks.map((item:any, idx:any) => (
              <SwiperSlide key={`${item.id || item.name}-${idx}`}>
                <div className="relative bg-white border border-yellow rounded-3xl flex flex-col justify-between shadow-sm overflow-hidden px-4 sm:px-6 md:px-[20px] py-6 sm:py-8 md:py-[40px] w-full max-w-[100%] sm:max-w-[320px] md:max-w-[336px] lg:max-w-[456px] xl:max-w-[356px] 2xl:max-w-[415px] h-auto min-h-[400px] sm:min-h-[450px] md:min-h-[445px] lg:min-h-[385px] xl:min-h-[415px] 2xl:min-h-[385px] mx-auto">
                  
                  <Image
                    src={image99}
                    alt="green spade"
                    width={106}
                    height={88}
                    className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-5 md:right-6 opacity-10 z-0 w-6 h-5 sm:w-8 sm:h-7 md:w-[76.79px] md:h-[63.75px] xl:w-[106px] xl:h-[88px]"
                  />

                  {/* Rating */}
                  <div className="flex mb-3 sm:mb-4 px-4 sm:px-5 md:px-6">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <IoMdStar
                        key={i}
                        size={16}
                        className="fill-yellow text-yellow w-4 h-4 sm:w-5 sm:h-5"
                      />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-[#667471] font-nunito text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 leading-relaxed break-words">
                    “{truncateText(t(item.feedback || item.review), 120)}”
                  </p>

                  {/* User Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center mt-4 sm:mt-5 md:mt-6 px-4 sm:px-5 md:px-6 gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mx-auto sm:mx-0">
                      <Image
                        src={item.image || item.avatar || "/assets/author.png"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center sm:items-start mt-2 sm:mt-0 sm:ml-3">
                      <h4 className="font-bold font-nunito text-sm sm:text-base md:text-lg text-foreground">
                        {t(item.name)}
                      </h4>
                      <p className="text-gray-500 font-nunito text-xs sm:text-sm md:text-base">
                        {t(item.designation || item.role)}
                      </p>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
            <button
              className="prev-btn cursor-pointer w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#122F2A] hover:bg-yellow hover:text-black text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
            >
              <ArrowLeft size={24} className="sm:w-7 sm:h-7" />
            </button>
            <button
              className="next-btn cursor-pointer w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow hover:bg-[#122f2A] text-black hover:text-white flex items-center justify-center transition-colors duration-500 ease-in-out"
            >
              <ArrowRight size={24} className="sm:w-7 sm:h-7" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueableCustomer;

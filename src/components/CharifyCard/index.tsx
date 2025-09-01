"use client";

import { cardBlue, cardGreen, cardYellow } from "@/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Charity = () => {
  const cards = [
    {
      title: "Medical Care",
      description:
        "Set Up A Secure And User-Friendly Online Donation Platform That Assists Multiple Healthcare Initiatives.",
      card: cardYellow,
    },
    {
      title: "Child Education",
      description:
        "Set Up A Secure And User-Friendly Online Donation Platform That Supports Education For Children.",
      card: cardBlue,
    },
    {
      title: "Healthy Food",
      description:
        "Set Up A Secure And User-Friendly Online Donation Platform That Provides Nutritious Food To Those In Need.",
      card: cardGreen,
    },
  ];

  return (
    <div className="py-16 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-4">Charity With Difference</h2>
      <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
        Join Our Monthly Giving Program To Provide Consistent Support To Our Initiatives. Regular
        Contributions, No Matter The Size, Help Us Plan And Sustain Long-Term Projects.
      </p>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {cards.map((card, idx) => (
          <SwiperSlide key={idx}>
            {/* Outer div handles border */}
            <div className="border-4 border-gray-300 rounded-3xl  shadow-lg h-80 over">
              {/* Inner div handles background image */}
              <div
                className="flex flex-col justify-end p-8 h-full"
                style={{
                  backgroundImage: `url(${card.card.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="text-white relative z-10">
                  <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                  <p>{card.description}</p>
                </div>

                {/* Decorative Blob */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-100 rounded-full opacity-20 pointer-events-none"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Charity;

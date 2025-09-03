"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState, useRef } from "react";
import { bannerTwoShape, homeFive, homeTwo, spradeBase } from "../../../public/assets/index";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Button from "@/helper/Buttons/Button";

const slides = [
    {
        id: 1,
        image: homeFive,
        tagline: "Start Donating Poor People",
        heading: ["Giving Help", "To Those", "Who Need It."],
    },
    {
        id: 2,
        image: homeTwo,
        tagline: "Start Donating Poor People",
        heading: ["Giving Help", "To Those", "Who Need It."],
    },
];


// Framer Motion variants
const slideInLeft = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 2, ease: "easeOut" },
    },
    exit: { opacity: 0, x: 80, transition: { duration: 0.5, ease: "easeIn" } },
};

export default function HeroCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<any>(null);

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const { primaryColor } = useSelector((state: RootState) => state.theme);

    return (
        <div className="relative w-full h-screen overflow-hidden ">
            {/* ✅ Swiper only for background images */}
            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 6000 }}
                loop
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                onSwiper={(swiper) => (swiperRef.current = swiper)} // store ref
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black/60"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="z-50">
                <img src={bannerTwoShape.src} alt=""  className="size-30" />
            </div>

            {/* ✅ Text overlay (independent from Swiper) */}
            <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto  z-20   ">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slides[activeIndex].id}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={slideInLeft}
                        className="space-y-6"
                    >
                        {/* Tagline */}
                        <p className={`text-palate-pink font-medium flex items-center gap-2 italic text-${primaryColor}`}>
                            <Icon icon="mdi:hand-heart" className="text-2xl" />
                            {slides[activeIndex].tagline}
                        </p>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                            {slides[activeIndex].heading.map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </h1>


                        {/* Buttons */}
                        <div className="flex gap-4 mt-6">
                            <Button text="Discover More" bgColor="bg-palate-green" />
                            <Button text="Get A Quote" />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ✅ Custom Navigation Arrows */}
            <div className="absolute  right-22 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
                <button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full bg-palate-green flex items-center justify-center text-white shadow-md hover:scale-105 transition"
                >
                    <Icon icon="mdi:chevron-left" className="text-2xl" />
                </button>
                <button
                    onClick={handleNext}
                    className={`w-12 h-12 rounded-full bg-${primaryColor} cursor-pointer flex items-center justify-center text-white shadow-md hover:scale-105 transition`}
                >
                    <Icon icon="mdi:chevron-right" className="text-2xl" />
                </button>
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 3,       // total time for one cycle
                        repeat: Infinity,  // loop forever
                        ease: "easeInOut", // smooth animation
                    }}
                    className="absolute top-[29%] xl:top-[82%] right-40 xl:right-38 transform -translate-y-1/2 text-palate-yellow size-14"
                >
                    <img src={spradeBase.src} alt="" />
                </motion.div>
            </div>

        </div >
    );
}

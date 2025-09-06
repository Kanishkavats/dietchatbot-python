"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { bannerOne, bannerTwo, horizontalWhiteShape, spradeBase, verticleYellowShape } from "@/public/assets";
import Button from "../../common/Buttons/Button";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import Image from "next/image";

const images = [bannerOne.src, bannerTwo.src];

export default function HeroStaticSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto image change
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/*  Background Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[index]})` }}
      />
      <section className="relative h-5 w-full z-22">
        <Image src={horizontalWhiteShape.src} alt="Horizontal White Shape" fill />
      </section>
      <section className="relative h-screen  w-20 md:w-30 z-21 ">
        <motion.div
          animate={{ y: [0, -20, 0, 20, 0] }} 
          transition={{
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut", 
          }}
          className="h-full w-full relative"
        >
          <Image
            src={verticleYellowShape.src}
            alt="Vertical Yellow Shape"
            fill
            className="object-cover"
          />
        </motion.div>
      </section>

      {/*  Text Overlay */}
      <div
        className="absolute inset-0  flex flex-col justify-center items-start px-10 lg:px-20 z-20 font-nunito"
        style={{
          background:
            "linear-gradient(to right, color-mix(in srgb, var(--dark-green) 90%, transparent), color-mix(in srgb, var(--foreground) 50%, transparent), color-mix(in srgb, var(--foreground) 0%, transparent))",
        }}
      >
        <AnimatedReveal
          key={index}
          direction="left"
          distance={100}
          duration={1}
          className="space-y-6"
        >
          <p className="text-[var(--yellow)] font-medium flex items-center gap-2 font-caveat">
            <Icon icon="mdi:hand-heart" className="text-2xl cursor-pointer" />
            Start Donating Poor People
          </p>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
            Giving Help <br /> To Those <br /> Who Need It.
          </h1>

          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-6 w-fit">
            <Button
              text="Discover More"
              textColor="text-[var(--green)]"
              bgColor="bg-[var(--dark-green)]/30"
              hoverBg="before:bg-[var(--yellow)]"
              hoverTextColor="text-[var(--foreground)]"
            />
            <Button text="Get A Quote" />
          </div>
        </AnimatedReveal>

        {/* ✅ Navigation Arrows */}
        <div className="absolute right-22 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-30 ">
          <button
            onClick={handlePrev}
            className="w-12 h-12 cursor-pointer rounded-full bg-[var(--dark-green)] flex items-center justify-center text-white shadow-md hover:scale-105 hover:bg-[var(--yellow)] transition"
          >
            <Icon icon="mdi:chevron-left" className="text-2xl" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[var(--yellow)] cursor-pointer flex items-center justify-center text-white shadow-md hover:scale-105 hover:bg-[var(--dark-green)] transition"
          >
            <Icon icon="mdi:chevron-right" className="text-2xl" />
          </button>

          {/* Floating Decorative Icon */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[29%] xl:top-[82%] right-40 xl:right-38 transform -translate-y-1/2 text-palate-yellow size-14"
          >
            <img src={spradeBase.src} alt="decoration" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

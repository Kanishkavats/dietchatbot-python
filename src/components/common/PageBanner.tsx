"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { PageBannerProps } from "@/src/types/hero";
import { horizontalWhiteShape, spradeBase } from "@/public/assets";
import PulsingImage from "./PulsingImage";

export const pageBannerBackgourndColor = {
  background: `
    linear-gradient(
      to right,
      color-mix(in srgb, var(--color-dark-green) 100%, var(--color-dark-green)),
      color-mix(in srgb, var(--color-dark-green) 90%, transparent),
      color-mix(in srgb, var(--color-foreground) 30%, transparent),
      color-mix(in srgb, var(--color-foreground) 0%, transparent)
    )
  `
};

const PageBanner: React.FC<PageBannerProps> = ({
  bgImage,
  smallIcon = "mdi:gift-outline",
  tagline = "Start Donating Poor People",
  title
}) => {
  return (
    <section

      className="relative w-full h-[50vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={bgImage}
        alt="Hero Background"
        fill
        className="object-cover object-center"
        priority
      />
      <section className="absolute top-0 left-0 h-10 w-full z-3">
        <Image src={horizontalWhiteShape.src} alt="Horizontal White Shape" fill className="object-cover object-end" />
      </section>

      <div
        className="absolute inset-0 z-2"
        style={pageBannerBackgourndColor}
      />


      {/* Content */}
      <div className="relative z-3 text-center px-6">
        <div
          className="font-caveat text-2xl flex items-center justify-center gap-2 text-yellow mb-4"
        >
          <Icon icon={smallIcon} width={20} height={20} />
          <span className="font-semibold">{tagline}</span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-5xl lg:text-[5rem] font-extrabold text-white font-nunito"
        >
          {title}
        </h1>
      </div>

      <PulsingImage
        src={spradeBase}
        alt="heart deco"
        height={140}
        width={120}
        duration={4}
        className="absolute bottom-8 md:top-1/2 left-[-8] md:left-8 z-12 h-15 w-20 md:h-30 md:w-40"
      />
    </section>
  );
};

export default PageBanner;

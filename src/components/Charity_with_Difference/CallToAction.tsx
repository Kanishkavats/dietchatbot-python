"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../common/Buttons/Button';
import { overView } from '../../../public/assets/index';

export default function CallToAction() {
  const router = useRouter();

  const handleGetQuoteClick = () => {
    router.push('/contact');
  };

  return (
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] rounded-lg shadow-md overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={overView}
          alt="Children in need"
          fill
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 "></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4 sm:p-6">
        {/* Heart logo */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg mb-4 sm:mb-6">
          <Image
            src="/assets/charity_with_difference/logo heart bottom banner.png"
            alt="Heart logo"
            width={64}
            height={64}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Subtitle */}
        <p className="text-white text-base sm:text-lg font-medium font-nunito mb-3 sm:mb-4">
          Small Donations Bigger Impact
        </p>

        {/* Main Title */}
        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-nunito font-bold mb-6 sm:mb-8 drop-shadow-lg leading-tight">
          Education Health<br />For Every Child
        </h3>

        {/* Get A Quote Button */}
          <div className="w-fit">
        <Button 
          text="Get A Quote"
          icon="mdi:arrow-top-right"
          bgColor="bg-yellow"
          hoverBg="before:bg-green"
          textColor="text-black"
          hoverTextColor="group-hover:text-white"
          rounded="rounded-full"
          paddingx="px-6 sm:px-8"
          paddingy="py-3 sm:py-5"
          onClick={handleGetQuoteClick}
        />
        </div>
      </div>
    </div>
  );
}

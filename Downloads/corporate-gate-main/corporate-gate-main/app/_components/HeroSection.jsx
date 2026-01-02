import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="max-w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-4 sm:px-6 md:px-8 lg:px-16 mx-auto">
      <div className="flex justify-start mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-gray-200 shadow-sm rounded-full">
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            <span className="text-[#345773]">AI</span> Powered
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
        <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight md:leading-24">
            Create a Job-Ready Resume in Minutes
          </h1>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#00000063] tracking-wide md:tracking-wider leading-relaxed">
            Create your resume easily with our AI resume builder and professional templates.
          </p>
          <Link href="/templates" className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-[#345773] text-white rounded-full text-sm sm:text-base md:text-lg font-semibold cursor-pointer transition-colors w-full sm:w-auto hover:bg-[#2a4560] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Build My Resume
          </Link>
        </div>
      </div>
    </div>
  );
}



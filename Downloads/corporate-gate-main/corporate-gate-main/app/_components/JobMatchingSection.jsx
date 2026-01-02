import Image from "next/image";

export default function JobMatchingSection() {
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 text-[#345773] text-sm sm:text-base font-medium">
            Find Jobs
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Smarter job matching for
            <div>better career moves</div>
          </h2>
        </div>

        <div>
          <div className="flex relative items-center justify-center py-6 sm:py-8">
            <div className="relative w-full max-w-4xl">
              <Image
                src="/iMac 24_ - Silver.svg"
                alt="Job matching illustration"
                width={1600}
                height={700}
                className="w-full h-auto"
              />
            </div>

            <div className="absolute top-8 sm:top-12 md:top-15">
              <Image 
                src="/Frame 1321316681.svg"
                width={847}
                height={400}
                alt="Image"
                className=""
              />
            </div>
          </div>

          <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 text-center">
            <p className="text-[#00000063] max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              Say goodbye to endless scrolling and irrelevant job listings. Our AI-powered platform
              matches you with roles that suit your profile, experience, and ambitions—helping you
              make smarter career decisions and land the right job, faster.
            </p>
            <div className="mt-8 sm:mt-10">
              <button className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-[#345773] text-white rounded-full text-sm sm:text-base md:text-lg font-semibold cursor-pointer hover:bg-[#2a4560] shadow-lg">
                Find Jobs Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



import Image from "next/image";

export default function AIInterviewSection() {
  return (
    <section className="pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 bg-[#F5F7F9]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 text-[#345773] text-sm sm:text-base font-medium">
            AI-Interview
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Endhance your confidence with
            <div>AI-powered interviews</div>
          </h2>
        </div>

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
                src="/Frame 1321316693.svg"
                width={847}
                height={400}
                alt="Image"
                className=""
              />
            </div>
          </div>

        <div className="text-center max-w-3xl mx-auto mt-8 px-4 sm:px-6">
          <p className="text-[#00000063] text-sm sm:text-base md:text-lg leading-relaxed">
            Tired of generic interviews? Our AI‑powered platform tailors questions to your skills and
            role—helping you practice smarter, gain confidence, and ace your next interview.
          </p>
          <button className="mt-8 sm:mt-10 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-[#345773] text-white rounded-full text-sm sm:text-base md:text-lg font-semibold cursor-pointer hover:bg-[#2a4560] shadow-lg">
            Start Now
          </button>
        </div>
      </div>
    </section>
  );
}



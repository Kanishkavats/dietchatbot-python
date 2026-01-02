import Image from "next/image";

export default function SkillAssessmentSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
        <div className="order-1">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 text-[#345773] text-sm sm:text-base font-medium">
            Skill Assessment System
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Unlock success
            <div>with intelligent skill</div>
            <div>assessment</div>
          </h2>
          <p className="mt-4 text-[#0000009c] text-sm sm:text-base leading-relaxed max-w-md">
            Landing your dream job starts with understanding your strengths. Our expert skill
            assessment system uncovers your true potential, providing data‑driven insights to help
            you grow and succeed — trusted by millions of professionals worldwide.
          </p>
          <button className="mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-[#345773] text-white rounded-full text-sm sm:text-base lg:text-lg font-semibold cursor-pointer hover:bg-[#2a4560] transition-colors">
            Start Now
          </button>
        </div>

        <div className="relative mx-auto w-full max-w-[260px] sm:max-w-md lg:max-w-lg order-2">
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#F5F7F9] shadow-xl sm:shadow-2xl overflow-hidden z-20">
            <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-center">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-full bg-[#345773] grid place-items-center text-white text-sm">
                  <Image src="/image 14.svg" alt="Logo" width={36} height={36} className="w-8 sm:w-10 h-auto" />
                </div>
                <div className="text-gray-900 text-lg sm:text-xl font-semibold">
                  <span className="text-[#345773]">
                    Corporate{" "}
                  </span>
                  Gate
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                <div className="flex flex-col items-start justify-center">
                  <div className="text-lg sm:text-xl font-semibold text-gray-900">John Nick</div>
                  <div className="text-[#345773] flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        <Image src="/solar_star-bold-duotone.svg" width={14} height={14} alt="Star" className="w-3 sm:w-3.5 h-auto" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="self-end sm:self-auto">
                  <p className="bg-white border rounded-full font-semibold px-6 sm:px-8 lg:px-12 text-xs sm:text-sm p-1 text-[#345773]">
                    <span className="text-lg sm:text-2xl absolute top-[114px] sm:top-21 right-29 sm:right-10 lg:right-40">
                      •
                    </span>
                    9000 Points
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-2 sm:h-3 w-5/6 bg-[#D9D9D933] rounded" />
                ))}
              </div>

              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                <div className="grid grid-cols-14 text-[8px] sm:text-[10px] text-white font-semibold">
                  <div className="col-span-1 grid place-items-center h-4 sm:h-6 bg-[#1f3a56] rounded-l">1</div>
                  <div className="col-span-1 grid place-items-center h-4 sm:h-6 bg-[#2b5278]">1</div>
                  <div className="col-span-6 grid place-items-center h-4 sm:h-6 bg-[#5f8bb5]">6</div>
                  <div className="col-span-6 grid place-items-center h-4 sm:h-6 bg-[#7fb0db] rounded-r">6</div>
                </div>

                <div className="grid grid-cols-23 text-[8px] sm:text-[10px] text-white font-semibold">
                  <div className="col-span-11 grid place-items-center h-4 sm:h-6 bg-[#5f8bb5] rounded-l">15</div>
                  <div className="col-span-8 grid place-items-center h-4 sm:h-6 bg-[#7fb0db]">6</div>
                  <div className="col-span-2 grid place-items-center h-4 sm:h-6 bg-[#244764]">1</div>
                  <div className="col-span-2 grid place-items-center h-4 sm:h-6 bg-[#244764] rounded-r">1</div>
                </div>

                <div className="grid grid-cols-20 gap-0.5 text-[8px] sm:text-[10px] text-white font-semibold">
                  <div className="col-span-20 grid place-items-center h-4 sm:h-6 bg-[#1f3a56] rounded">20</div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="absolute max-w-sm sm:max-w-md w-full mt-2 sm:mt-4 -top-1 left-6 sm:left-8 lg:left-24 rounded-2xl sm:rounded-3xl bg-[#F5F7F9] shadow-lg sm:shadow-xl overflow-hidden z-10">
            <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-center">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-full bg-[#345773] grid place-items-center text-white text-sm">
                  <Image src="/image 14.svg" alt="Logo" width={36} height={36} className="w-8 sm:w-10 h-auto" />
                </div>
                <div className="text-gray-900 text-lg sm:text-xl font-semibold">
                  <span className="text-[#345773]">
                    Corporate{" "}
                  </span>
                  Gate
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                <div className="flex flex-col items-start justify-center">
                  <div className="text-lg sm:text-xl font-semibold text-gray-900">John Nick</div>
                  <div className="text-[#345773] flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        <Image src="/solar_star-bold-duotone.svg" width={14} height={14} alt="Star" className="w-3 sm:w-3.5 h-auto" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="self-end sm:self-auto">
                  <p className="bg-white border rounded-full font-semibold px-6 sm:px-8 lg:px-12 text-xs sm:text-sm p-1 text-[#345773]">
                    <span className="text-lg sm:text-2xl absolute top-16 sm:top-20 right-8 sm:right-10 lg:right-40">
                      •
                    </span>
                    9000 Points
                  </p>
                </div>
              </div>

              <div className="mt-1 sm:mt-2 space-y-2 sm:space-y-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-2 sm:h-3 w-5/6 bg-[#D9D9D933] rounded" />
                ))}
              </div>

              <div className="mt-4 sm:mt-5 space-y-1 sm:space-y-2">
                <div className="grid grid-cols-14 text-[8px] sm:text-[10px] text-white font-semibold">
                  <div className="col-span-1 grid place-items-center h-4 sm:h-6 bg-[#1f3a56] rounded-l">1</div>
                  <div className="col-span-1 grid place-items-center h-4 sm:h-6 bg-[#2b5278]">1</div>
                  <div className="col-span-6 grid place-items-center h-4 sm:h-6 bg-[#5f8bb5]">6</div>
                  <div className="col-span-6 grid place-items-center h-4 sm:h-6 bg-[#244764] rounded-r">6</div>
                </div>

                <div className="grid grid-cols-23 text-[8px] sm:text-[10px] text-white font-semibold">
                  <div className="col-span-11 grid place-items-center h-4 sm:h-6 bg-[#244764] rounded-l">15</div>
                  <div className="col-span-8 grid place-items-center h-4 sm:h-6 bg-[#244764]">6</div>
                  <div className="col-span-2 grid place-items-center h-4 sm:h-6 bg-[#244764]">1</div>
                  <div className="col-span-2 grid place-items-center h-4 sm:h-6 bg-[#244764] rounded-r"></div>
                </div>

                <div className="grid grid-cols-20 gap-0.5 text-[8px] sm:text-[10px] text-white font-semibold">
                  <div className="col-span-20 grid place-items-center h-4 sm:h-6 bg-[#244764] rounded">20</div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="absolute max-w-sm sm:max-w-md w-full -top-1 left-12 sm:left-16 lg:left-32 rounded-2xl sm:rounded-3xl mt-4 sm:mt-7 bg-[#F5F7F9] shadow-lg sm:shadow-xl overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-center">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-full bg-[#345773] grid place-items-center text-white text-sm">
                  <Image src="/image 14.svg" alt="Logo" width={36} height={36} className="w-8 sm:w-10 h-auto" />
                </div>
                <div className="text-gray-900 text-lg sm:text-xl font-semibold">
                  <span className="text-[#345773]">
                    Corporate{" "}
                  </span>
                  Gate
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                <div className="flex flex-col items-start justify-center">
                  <div className="text-lg sm:text-xl font-semibold text-gray-900">John Nick</div>
                  <div className="text-[#345773] flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        <Image src="/solar_star-bold-duotone.svg" width={14} height={14} alt="Star" className="w-3 sm:w-3.5 h-auto" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="self-end sm:self-auto">
                  <p className="bg-white border rounded-full font-semibold px-6 sm:px-8 lg:px-12 text-xs sm:text-sm p-1 text-[#345773]">
                    <span className="text-lg sm:text-2xl absolute top-16 sm:top-20 right-8 sm:right-10 lg:right-40">
                      •
                    </span>
                    9000 Points
                  </p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-2 sm:h-3 w-5/6 bg-[#D9D9D933] rounded" />
                ))}
              </div>

              <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                <div className="grid grid-cols-14 text-[8px] sm:text-[10px] text-white font-semibold">
                  <div className="col-span-1 grid place-items-center h-4 sm:h-6 bg-[#1f3a56] rounded-l">1</div>
                  <div className="col-span-1 grid place-items-center h-4 sm:h-6 bg-[#2b5278]">1</div>
                  <div className="col-span-6 grid place-items-center h-4 sm:h-6 bg-[#5f8bb5]">6</div>
                </div>

                <div className="grid grid-cols-23 text-[8px] sm:text-[10px] text-white font-semibold">
                  <div className="col-span-11 grid place-items-center h-4 sm:h-6 bg-[#5f8bb5] rounded-l">15</div>
                  <div className="col-span-8 grid place-items-center h-4 sm:h-6 bg-[#7fb0db]">6</div>
                  <div className="col-span-2 grid place-items-center h-4 sm:h-6 bg-[#244764]">1</div>
                  <div className="col-span-2 grid place-items-center h-4 sm:h-6 bg-[#244764] rounded-r">1</div>
                </div>

                <div className="grid grid-cols-20 gap-0.5 text-[8px] sm:text-[10px] text-white font-semibold">
                  <div className="col-span-20 grid place-items-center h-4 sm:h-6 bg-[#244764] rounded">20</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



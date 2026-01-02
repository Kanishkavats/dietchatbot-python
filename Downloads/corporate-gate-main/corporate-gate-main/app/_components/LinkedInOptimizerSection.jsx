import Image from "next/image";

export default function LinkedInOptimizerSection() {
  return (
    <section className="py-14 sm:py-16 md:py-20 lg:pt-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 text-[#345773] text-sm sm:text-base font-medium">
            LinkedIn Optimizer
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-bold text-gray-900 leading-tight">
            Optimize your LinkedIn Profile
          </h2>
          <p className="mt-2 text-[#00000080] text-sm sm:text-base">
            Make it 40x more likely to land an opportunity
          </p>
          <button className="mt-6 inline-flex items-center justify-center px-6 sm:px-7 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-[#345773] text-white rounded-full text-sm sm:text-base md:text-lg font-semibold cursor-pointer hover:bg-[#2a4560] transition-colors shadow-lg hover:shadow-xl">
            Optimize Now
          </button>
        </div>

        {/* Illustration */}
        <div className="mt-10 sm:mt-24 flex items-center justify-center">
          <div className="block lg:hidden relative w-full max-w-sm">
            <div className="relative h-[280px]">
              <div className="absolute -left-20 bottom-0 w-[60%] h-[70%] rounded-xl border border-gray-200 shadow-sm overflow-hidden opacity-90">
                <div className="h-8 border-b border-gray-200 flex items-center px-3 gap-2 bg-[#e1e3e8]">
                  <div className="">
                    <Image src="/image 103.svg" height={14} width={14} alt="In" />
                  </div>
                  <div className="flex items-center gap-1 bg-[#dadde1] rounded-full px-2 py-1 w-1/2">
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="text-xs text-gray-500"> Search...</span>
                  </div>
                  <div className="ml-auto w-5 h-5 rounded-full bg-gray-200" />
                </div>

                <div className="p-3 bg-[#f4f7fb]">
                  <div className="relative">
                    <div className="h-20 rounded-lg bg-[#8da1b4]" />
                    <div className="absolute -bottom-4 left-3 w-12 h-12 rounded-full bg-[#e1e3e8] grid place-items-center">
                      <Image src="/tdesign_user-filled.svg" width={24} height={24} alt="Image" className="w-auto h-auto" />
                    </div>
                  </div>

                  <div className="pt-6 space-y-1">
                    <div className="h-2 w-8/12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-2 w-7/12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-2 w-6/12 rounded-full bg-[#e1e3e8]" />
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="h-3 rounded-full bg-[#e1e3e8]" />
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-4 w-12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-4 w-12 rounded-full bg-[#e1e3e8]" />
                  </div>
                </div>
              </div>

              <div className="absolute -right-20 bottom-0 w-[60%] h-[70%] rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white opacity-70">
                <div className="h-8 border-b border-gray-200 flex items-center px-3 gap-2 bg-[#e1e3e8]">
                  <div className="">
                    <Image src="/image 103.svg" height={14} width={14} alt="In" />
                  </div>
                  <div className="flex items-center gap-1 bg-[#dadde1] rounded-full px-2 py-1 w-1/2">
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="text-xs text-gray-500"> Search...</span>
                  </div>
                  <div className="ml-auto w-5 h-5 rounded-full bg-gray-200" />
                </div>

                <div className="p-3 bg-[#f4f7fb]">
                  <div className="relative">
                    <div className="h-20 rounded-lg bg-[#eaebef]" />
                    <div className="absolute -bottom-4 left-3 w-12 h-12 rounded-full bg-[#e1e3e8] grid place-items-center">
                      <Image src="/tdesign_user-filled.svg" width={24} height={24} alt="Image" className="w-auto h-auto" />
                    </div>
                  </div>

                  <div className="pt-6 space-y-1">
                    <div className="h-2 w-8/12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-2 w-7/12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-2 w-6/12 rounded-full bg-[#e1e3e8]" />
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="h-3 rounded-full bg-[#e1e3e8]" />
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-4 w-12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-4 w-12 rounded-full bg-[#e1e3e8]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card - Mobile */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-[280px]">
              <div className="rounded-[14px] overflow-hidden shadow-xl bg-[#EAF0F7]">
                <div className="bg-[#2E4D69] px-3 pt-3 pb-4 rounded-b-3xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-2">
                      <div className="text-[10px] text-white font-semibold">You are all set!</div>
                      <div className="mt-1.5 space-y-1">
                        <div className="h-2 w-32 rounded-full bg-white/20" />
                        <div className="h-2 w-24 rounded-full bg-white/15" />
                      </div>
                      <button className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-[#45769D] text-white text-xs font-semibold shadow-sm ring-1 ring-black/5">
                        Start Optimization
                      </button>
                    </div>
                    <div className="relative shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-full bg-[#33C36D]/25 grid place-items-center">
                        <div className="w-9 h-9 rounded-full bg-[#33C36D]/40 grid place-items-center">
                          <div className="w-6 h-6 rounded-full bg-[#33C36D] text-white grid place-items-center text-xs font-bold">✓</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#EAF0F7] px-3 pt-3 pb-4">
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#2E4D69] grid place-items-center text-white">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M17 10a7 7 0 10-2.05 4.95l-1.41-1.41A5 5 0 1115 10h-2l3 3 3-3h-2z" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#A8B9CB] grid place-items-center text-white">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10 2a6 6 0 00-3.7 10.6c.4.35.7.8.7 1.3V15h6v-1.1c0-.5.25-.95.65-1.3A6 6 0 0010 2zm-2 14h4v2H8v-2z" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#8FA6BC] grid place-items-center text-white">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M8 13l-3-3 1.5-1.5L8 10l5.5-5.5L15 6z" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#A8B9CB] grid place-items-center text-white">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10.9 2.7l7.1 12.3a1 1 0 01-.9 1.5H2.9a1 1 0 01-.9-1.5L9.1 2.7a1 1 0 011.8 0zM10 7v4h0V7zm0 6v2h0v-2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-[#45769D1A] px-2 py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-[#F7F7F7] grid place-items-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#EAF0F7]" />
                          </span>
                          <div className="flex flex-col gap-1">
                            <div className="h-1.5 w-20 rounded-full bg-[#F7F7F7]" />
                            <div className="h-1.5 w-16 rounded-full bg-[#F7F7F7]" />
                          </div>
                          <Image src="/Vector (2).svg" alt="LinkedIn Optimizer" width={8} height={8} className="w-auto h-auto" />
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M7 5l5 5-5 5" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original overlapping design */}
          <div className="hidden lg:block relative w-full max-w-xl">
            <div className="relative h-[530px]">
              <div className="absolute -left-40 bottom-0 w-[70%] h-[80%] rounded-2xl border border-gray-200 shadow-sm overflow-hidden opacity-90">
                <div className="h-11 border-b border-gray-200 flex items-center px-4 gap-3 bg-[#e1e3e8]">
                  <div className="">
                    <Image src="/image 103.svg" height={18} width={18} alt="In" />
                  </div>
                  <div className="flex items-center gap-2 bg-[#dadde1] rounded-full px-3 py-1.5 w-2/3">
                    <span className="w-3 h-3 rounded-full bg-gray-400" />
                    <span className="text-sm text-gray-500"> Search...</span>
                  </div>
                  <div className="ml-auto w-7 h-7 rounded-full bg-gray-200" />
                </div>

                <div className="p-5 bg-[#f4f7fb]">
                  <div className="relative">
                    <div className="h-40 rounded-lg bg-[#8da1b4]" />
                    <div className="absolute -bottom-6 left-5 w-24 h-24 rounded-full bg-[#e1e3e8] grid place-items-center">
                      <Image src="/tdesign_user-filled.svg" width={52} height={52} alt="Image" className="w-auto h-auto" />
                    </div>
                  </div>

                  <div className="pt-10 space-y-2">
                    <div className="h-3 w-10/12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-3 w-9/12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-3 w-8/12 rounded-full bg-[#e1e3e8]" />
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="h-5 rounded-full bg-[#e1e3e8]" />
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-8 w-28 rounded-full bg-[#e1e3e8]" />
                    <div className="h-8 w-28 rounded-full bg-[#e1e3e8]" />
                  </div>
                </div>
              </div>

              <div className="absolute -right-50 bottom-0 w-[70%] h-[80%] rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white opacity-70">
                <div className="h-11 border-b border-gray-200 flex items-center px-4 gap-3 bg-[#e1e3e8]">
                  <div className="">
                    <Image src="/image 103.svg" height={18} width={18} alt="In" />
                  </div>
                  <div className="flex items-center gap-2 bg-[#dadde1] rounded-full px-3 py-1.5 w-2/3">
                    <span className="w-3 h-3 rounded-full bg-gray-400" />
                    <span className="text-sm text-gray-500"> Search...</span>
                  </div>
                  <div className="ml-auto w-7 h-7 rounded-full bg-gray-200" />
                </div>

                <div className="p-5 bg-[#f4f7fb]">
                  <div className="relative">
                    <div className="h-40 rounded-lg bg-[#eaebef]" />
                    <div className="absolute -bottom-6 left-5 w-24 h-24 rounded-full bg-[#e1e3e8] grid place-items-center">
                      <Image src="/tdesign_user-filled.svg" width={52} height={52} alt="Image" className="w-auto h-auto" />
                    </div>
                  </div>

                  <div className="pt-10 space-y-2">
                    <div className="h-3 w-10/12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-3 w-9/12 rounded-full bg-[#e1e3e8]" />
                    <div className="h-3 w-8/12 rounded-full bg-[#e1e3e8]" />
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="h-5 rounded-full bg-[#e1e3e8]" />
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-8 w-28 rounded-full bg-[#e1e3e8]" />
                    <div className="h-8 w-28 rounded-full bg-[#e1e3e8]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-14 w-[400px]">
              <div className="rounded-[18px] overflow-hidden shadow-xl bg-[#EAF0F7]">
                <div className="bg-[#2E4D69] px-5 pt-4 pb-5 rounded-b-4xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-3">
                      <div className="text-[12px] text-white font-semibold">You are all set!</div>
                      <div className="mt-2 space-y-1.5">
                        <div className="h-2.5 w-52 rounded-full bg-white/20" />
                        <div className="h-2.5 w-40 rounded-full bg-white/15" />
                      </div>
                      <button className="mt-10 inline-flex items-center px-6 py-3 rounded-full bg-[#45769D] text-white text-xs font-semibold shadow-sm ring-1 ring-black/5">
                        Start Optimization
                      </button>
                    </div>
                    <div className="relative shrink-0 mt-1">
                      <div className="w-24 h-24 rounded-full bg-[#33C36D]/25 grid place-items-center">
                        <div className="w-16 h-16 rounded-full bg-[#33C36D]/40 grid place-items-center">
                          <div className="w-9 h-9 rounded-full bg-[#33C36D] text-white grid place-items-center text-sm font-bold">✓</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#EAF0F7] px-5 pt-4 pb-5">
                  <div className="mb-3 flex items-center justify-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2E4D69] grid place-items-center text-white">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M17 10a7 7 0 10-2.05 4.95l-1.41-1.41A5 5 0 1115 10h-2l3 3 3-3h-2z" />
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#A8B9CB] grid place-items-center text-white">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10 2a6 6 0 00-3.7 10.6c.4.35.7.8.7 1.3V15h6v-1.1c0-.5.25-.95.65-1.3A6 6 0 0010 2zm-2 14h4v2H8v-2z" />
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#8FA6BC] grid place-items-center text-white">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M8 13l-3-3 1.5-1.5L8 10l5.5-5.5L15 6z" />
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#A8B9CB] grid place-items-center text-white">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10.9 2.7l7.1 12.3a1 1 0 01-.9 1.5H2.9a1 1 0 01-.9-1.5L9.1 2.7a1 1 0 011.8 0zM10 7v4h0V7zm0 6v2h0v-2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-[#45769D1A] px-4 py-5">
                        <div className="flex items-center gap-4">
                          <span className="w-7 h-7 rounded-md bg-[#F7F7F7] grid place-items-center">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#EAF0F7]" />
                          </span>
                          <div className="flex flex-col gap-1">
                            <div className="h-2 w-40 rounded-full bg-[#F7F7F7]" />
                            <div className="h-2 w-40 rounded-full bg-[#F7F7F7]" />
                          </div>
                          <Image src="/Vector (2).svg" alt="LinkedIn Optimizer" width={12} height={12} className="w-auto h-auto" />
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M7 5l5 5-5 5" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



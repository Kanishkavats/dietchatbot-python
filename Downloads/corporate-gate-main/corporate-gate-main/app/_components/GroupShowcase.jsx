import Image from "next/image";

export default function GroupShowcase() {
  return (
    <div className="relative flex justify-center py-6 sm:py-8 md:py-12">
      <div
        className="absolute inset-0 bg-[#ECEEF2] z-0 hidden sm:block"
        style={{ height: "80%", top: "24%" }}
      ></div>

      <div className="relative max-w-4xl w-full px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="relative">
          <Image
            src="/Group 1321317444.svg"
            alt="Corporate Gate Group"
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="absolute bg-white top-2 left-2 px-2 rounded-lg shadow-md w-[140px] max-w-[140px]">
            <div className="flex justify-between items-center gap-1 my-1 text-gray-200 border rounded-full px-1.5 py-1">
              <p className="font-semibold text-black text-[8px]">Your Resume</p>
              <Image src="/Vector.svg" alt="Decorative Vector" width={16} height={16} className="w-3 h-auto" />
            </div>
            
            <div className="w-2/3 h-1 bg-[#D9D9D95E] rounded-full mb-1 mr-3"></div>
            <div className="w-2/5 h-1 bg-[#D9D9D933] rounded-full mb-1 mr-6"></div>

            <div className="border border-dashed border-[#345773] h-11 mx-1.5 my-2 py-3 rounded-lg"></div>
            
            <div className="absolute top-8 -right-1 bg-white shadow-md p-1.5 rounded-lg max-w-[100px]">
              <div className="flex justify-between items-center mb-1.5 gap-1">
                <Image src="/Ellipse 669.svg" alt="Image" width={16} height={16} className="w-3 h-auto" />
                <div className="flex-1 min-w-0">
                  <p className="text-[6px] text-black font-semibold leading-tight">Career Wins with This Resume</p>
                  <div className="flex justify-start gap-0.5 mt-0.5">
                    <Image src="/image 16.svg" alt="Decorative Vector" width={8} height={8} className="w-1.5 h-auto" />
                    <Image src="/image 17.svg" alt="Decorative Vector" width={8} height={8} className="w-1.5 h-auto" />
                    <Image src="/image 18.svg" alt="Decorative Vector" width={8} height={8} className="w-1.5 h-auto" />
                    <Image src="/image 19.svg" alt="Decorative Vector" width={8} height={8} className="w-1.5 h-auto" />
                    <Image src="/image 20.svg" alt="Decorative Vector" width={8} height={8} className="w-1.5 h-auto" />
                  </div>
                </div>
              </div>
              <div className="flex justify-around">
                <div className="flex justify-center items-center gap-0.5 px-1 py-0.5 border border-gray-200 rounded-full">
                  <Image src="/Vector (1).svg" alt="Decorative Vector" width={8} height={8} className="w-1.5 h-auto" />
                  <p className="text-black text-[6px] font-semibold">Share</p>
                </div>
              </div>
            </div>
            
            <div className="w-2/3 h-1 bg-[#D9D9D95E] rounded-full mb-1 mr-3"></div>
            <div className="w-3/4 h-1 bg-[#D9D9D940] rounded-full mb-1"></div>
            <div className="w-1/2 h-1 bg-[#D9D9D933] rounded-full mb-1"></div>
          </div>

          <div className="absolute bg-white right-2 w-[120px] top-12 rounded-lg shadow-md p-2">
            <div className="relative">
              <h4 className="font-bold text-center text-xs text-gray-800">Dream Job</h4>
              <div className="w-4 h-4 absolute -top-1 -right-1 bg-[#11CE5D] rounded-full flex items-center justify-center">
                <span className="text-white font-black text-[6px]">✓</span>
              </div>
            </div>
            <p className="text-[6px] text-center text-gray-600 mb-2">Company Name</p>
            <div className="flex justify-center items-center space-x-0.5 mb-2">
              <span className="text-[4px] text-black rounded-full px-1 py-0.5 font-medium border border-gray-300">Full-time</span>
              <span className="text-[4px] text-black rounded-full px-1 py-0.5 font-medium border border-gray-300">Remote</span>
              <span className="text-[4px] text-black rounded-full px-1 py-0.5 font-medium border border-gray-300">Senior</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-full h-1.5 bg-[#D9D9D95E] rounded-full mb-1"></div>
              <div className="w-2/3 h-1.5 bg-[#D9D9D929] rounded-full mb-1"></div>
              <div className="w-1/2 h-1.5 bg-[#D9D9D91A] rounded-full mb-1"></div>
            </div>
            <div className="w-[80%] mx-auto my-1 h-0.5 bg-gray-200 rounded mb-1"></div>
            <p className="text-[8px] font-semibold text-center text-gray-800">₹55,000</p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          {/* Resume Card */}
          <div className="absolute bg-white top-2 sm:top-4 md:top-6 lg:top-10 left-1 sm:left-2 md:left-4 lg:-left-8 xl:-left-18 px-2 sm:px-3 md:px-4 lg:px-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md w-[85%] sm:w-auto max-w-[250px] sm:max-w-[280px] md:max-w-none">
            <div className="flex justify-between items-center gap-1 sm:gap-2 md:gap-4 lg:gap-8 my-1.5 sm:my-2 md:my-3 lg:my-4 text-gray-200 border rounded-full px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2">
              <p className="font-semibold text-black text-xs sm:text-sm md:text-base">Your Resume</p>
              <Image src="/Vector.svg" alt="Decorative Vector" width={20} height={20} className="w-3 sm:w-4 md:w-5 lg:w-6 h-auto" />
            </div>
            
            <div className="w-2/3 sm:w-[60%] h-1.5 sm:h-2 md:h-3 lg:h-4 bg-[#D9D9D95E] rounded-full mb-1.5 sm:mb-2 mr-3 sm:mr-4 md:mr-6 lg:mr-6"></div>
            <div className="w-2/5 sm:w-[40%] h-1.5 sm:h-2 md:h-3 lg:h-4 bg-[#D9D9D933] rounded-full mb-1.5 sm:mb-2 mr-6 sm:mr-8 md:mr-12 lg:mr-16"></div>

            <div className="border border-dashed border-[#345773] mx-1.5 sm:mx-2 md:mx-3 lg:mx-6 my-2 sm:my-3 md:my-4 lg:my-6 py-3 sm:py-4 md:py-6 lg:py-8 rounded-lg sm:rounded-xl md:rounded-2xl"></div>
            
            {/* Career Wins Card */}
            <div className="absolute top-12 sm:top-16 md:top-20 lg:top-24 xl:top-27 -right-1 sm:-right-2 md:-right-4 lg:-right-6 bg-white shadow-md p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl md:rounded-2xl max-w-[160px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-none">
              <div className="flex justify-between items-center mb-1.5 sm:mb-2 gap-1 sm:gap-2">
                <Image src="/Ellipse 669.svg" alt="Image" width={20} height={20} className="w-4 sm:w-5 md:w-6 lg:w-8 h-auto" />
                <div className="flex-1 min-w-0">
                  <p className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-black font-semibold leading-tight">Career Wins with This Resume</p>
                  <div className="flex justify-start gap-0.5 sm:gap-1 md:gap-2 mt-0.5 sm:mt-1">
                    <Image src="/image 16.svg" alt="Decorative Vector" width={12} height={12} className="w-2 sm:w-2.5 md:w-3 lg:w-4 h-auto" />
                    <Image src="/image 17.svg" alt="Decorative Vector" width={12} height={12} className="w-2 sm:w-2.5 md:w-3 lg:w-4 h-auto" />
                    <Image src="/image 18.svg" alt="Decorative Vector" width={12} height={12} className="w-2 sm:w-2.5 md:w-3 lg:w-4 h-auto" />
                    <Image src="/image 19.svg" alt="Decorative Vector" width={12} height={12} className="w-2 sm:w-2.5 md:w-3 lg:w-4 h-auto" />
                    <Image src="/image 20.svg" alt="Decorative Vector" width={12} height={12} className="w-2 sm:w-2.5 md:w-3 lg:w-4 h-auto" />
                  </div>
                </div>
              </div>
              <div className="flex justify-around">
                <div className="flex justify-center items-center gap-0.5 sm:gap-1 md:gap-2 px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 border border-gray-200 rounded-full">
                  <Image src="/Vector (1).svg" alt="Decorative Vector" width={12} height={12} className="w-2 sm:w-2.5 md:w-3 lg:w-4 h-auto" />
                  <p className="text-black text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold">Share</p>
                </div>
              </div>
            </div>
            
            <div className="w-2/3 sm:w-[60%] h-1.5 sm:h-2 md:h-3 lg:h-4 bg-[#D9D9D95E] rounded-full mb-1.5 sm:mb-2 mr-3 sm:mr-4 md:mr-6 lg:mr-6"></div>
            <div className="w-3/4 sm:w-[70%] h-1.5 sm:h-2 md:h-3 lg:h-4 bg-[#D9D9D940] rounded-full mb-1.5 sm:mb-2"></div>
            <div className="w-1/2 sm:w-[50%] h-1.5 sm:h-2 md:h-3 lg:h-4 bg-[#D9D9D933] rounded-full mb-1.5 sm:mb-2"></div>
          </div>

          <div className="absolute -right-2 sm:-right-3 md:-right-4 lg:-right-6 xl:-right-8 top-36 sm:top-40 md:top-44 lg:top-48 xl:top-60 bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md p-2 sm:p-2.5 md:p-3 lg:p-4 w-28 sm:w-32 md:w-36 lg:w-40 xl:w-48">
            <div className="relative">
              <h4 className="font-bold text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-800">Dream Job</h4>
              <div className="w-5 sm:w-6 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 absolute -top-1.5 sm:-top-2 md:-top-2.5 lg:-top-3 -right-1.5 sm:-right-2 md:-right-2.5 lg:-right-3 bg-[#11CE5D] rounded-full flex items-center justify-center">
                <span className="text-white font-black text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs">✓</span>
              </div>
            </div>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-center text-gray-600 mb-2 sm:mb-2.5 md:mb-3 lg:mb-4">Company Name</p>
            <div className="flex justify-center items-center space-x-0.5 sm:space-x-1 mb-2 sm:mb-2.5 md:mb-3 lg:mb-4">
              <span className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[7px] text-black rounded-full px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 font-medium border border-gray-300">Full-time</span>
              <span className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[7px] text-black rounded-full px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 font-medium border border-gray-300">Remote</span>
              <span className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[7px] text-black rounded-full px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 font-medium border border-gray-300">Senior</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-full h-2 sm:h-2.5 md:h-3 lg:h-4 bg-[#D9D9D95E] rounded-full mb-1.5 sm:mb-2"></div>
              <div className="w-2/3 h-2 sm:h-2.5 md:h-3 lg:h-4 bg-[#D9D9D929] rounded-full mb-1.5 sm:mb-2"></div>
              <div className="w-1/2 h-2 sm:h-2.5 md:h-3 lg:h-4 bg-[#D9D9D91A] rounded-full mb-1.5 sm:mb-2"></div>
            </div>
            <div className="w-[80%] mx-auto my-1.5 sm:my-2 h-0.5 bg-gray-200 rounded mb-1.5 sm:mb-2"></div>
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-center text-gray-800">₹55,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}



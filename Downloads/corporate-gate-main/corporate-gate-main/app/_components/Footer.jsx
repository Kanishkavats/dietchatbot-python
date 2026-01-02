import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#345773] text-white pb-6 sm:pb-8 pt-16 sm:pt-20 lg:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-10">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-white font-semibold mb-3 text-base">Product</h4>
                <ul className="space-y-2 text-xs text-white/50">
                  <li className="cursor-pointer hover:text-white/80 transition-colors">Employee database</li>
                  <li className="cursor-pointer hover:text-white/80 transition-colors">Payroll</li>
                  <li className="cursor-pointer hover:text-white/80 transition-colors">Absences</li>
                  <li className="cursor-pointer hover:text-white/80 transition-colors">Time tracking</li>
                  <li className="cursor-pointer hover:text-white/80 transition-colors">Shift planner</li>
                  <li className="cursor-pointer hover:text-white/80 transition-colors">Recruiting</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3 text-base">Information</h4>
                <ul className="space-y-2 text-xs text-white/50">
                  <li className="cursor-pointer hover:text-white/80 transition-colors">FAQ</li>
                  <li className="cursor-pointer hover:text-white/80 transition-colors">Blog</li>
                  <li className="cursor-pointer hover:text-white/80 transition-colors">Support</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-white font-semibold mb-3 text-base">Company</h4>
              <ul className="space-y-2 text-xs text-white/50">
                <li className="cursor-pointer hover:text-white/80 transition-colors">About us</li>
                <li className="cursor-pointer hover:text-white/80 transition-colors">Careers</li>
                <li className="cursor-pointer hover:text-white/80 transition-colors">Contact us</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white/80 font-semibold mb-3 text-base">Reach-Us</h4>
              <div className="flex mb-4">
                <input
                  placeholder="Email address"
                  className="flex-1 rounded-l-full bg-white px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="rounded-r-full bg-[#0081FE] px-3 py-2 hover:bg-[#0066CC] transition-colors">
                  <span className="text-white text-sm">➜</span>
                </button>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Hello, we are Corporate Gate. Our goal is to empower professionals by revolutionizing how they discover and land the right job — through smart resume building, AI-powered job matching, intelligent interview preparation, and expert resume analysis.
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:block">
            <h4 className="text-white font-semibold mb-3 text-base sm:text-lg">Product</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/50">
              <li className="cursor-pointer hover:text-white/80 transition-colors">Employee database</li>
              <li className="cursor-pointer hover:text-white/80 transition-colors">Payroll</li>
              <li className="cursor-pointer hover:text-white/80 transition-colors">Absences</li>
              <li className="cursor-pointer hover:text-white/80 transition-colors">Time tracking</li>
              <li className="cursor-pointer hover:text-white/80 transition-colors">Shift planner</li>
              <li className="cursor-pointer hover:text-white/80 transition-colors">Recruiting</li>
            </ul>
          </div>

          <div className="hidden sm:block">
            <h4 className="text-white font-semibold mb-3 text-base sm:text-lg">Information</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/50">
              <li className="cursor-pointer hover:text-white/80 transition-colors">FAQ</li>
              <li className="cursor-pointer hover:text-white/80 transition-colors">Blog</li>
              <li className="cursor-pointer hover:text-white/80 transition-colors">Support</li>
            </ul>
          </div>

          <div className="hidden sm:block">
            <h4 className="text-white font-semibold mb-3 text-base sm:text-lg">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/50">
              <li className="cursor-pointer hover:text-white/80 transition-colors">About us</li>
              <li className="cursor-pointer hover:text-white/80 transition-colors">Careers</li>
              <li className="cursor-pointer hover:text-white/80 transition-colors">Contact us</li>
            </ul>
          </div>

          <div className="hidden sm:block sm:col-span-2 lg:col-span-1">
            <h4 className="text-white/80 font-semibold mb-3 text-base sm:text-lg">Reach-Us</h4>
            <div className="flex mb-4">
              <input
                placeholder="Email address"
                className="flex-1 rounded-l-full bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="rounded-r-full bg-[#0081FE] px-3 sm:px-4 py-2 hover:bg-[#0066CC] transition-colors">
                <span className="text-white text-sm sm:text-base">➜</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Hello, we are Corporate Gate. Our goal is to empower professionals by revolutionizing how they discover and land the right job — through smart resume building, AI-powered job matching, intelligent interview preparation, and expert resume analysis.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 sm:pt-6 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 text-white/70">
            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Cookies</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-white/80">
            <span className="w-6 sm:w-8 h-6 sm:h-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
              <Image src="/Group 36.svg" width={16} height={16} alt="Twitter" className="w-3 sm:w-4 h-auto" />
            </span>
            <span className="w-6 sm:w-8 h-6 sm:h-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
              <Image src="/Shape (1).svg" width={12} height={12} alt="LinkedIn" className="w-2.5 sm:w-3 h-auto" />
            </span>
            <span className="w-6 sm:w-8 h-6 sm:h-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
              <Image src="/Shape.svg" width={16} height={16} alt="Facebook" className="w-3 sm:w-4 h-auto" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}



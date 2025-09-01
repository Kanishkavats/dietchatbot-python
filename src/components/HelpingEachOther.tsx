import Image from 'next/image';

export default function HelpingEachOther() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Settings Icon */}
      <div className="absolute left-8 top-20 z-20">
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer animate-bounce">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001 1.51H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Visual Elements */}
          <div className="relative opacity-0 anim-fade-in-left">
            {/* Vertical Banner with Text */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-green-800 rounded-br-3xl flex items-center justify-center z-20 hover:bg-green-700 transition-all duration-300">
              <div className="transform -rotate-90 text-yellow-400 font-bold text-lg whitespace-nowrap">
                we give donations to poor people
              </div>
            </div>

            {/* Yellow Dots */}
            <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-center gap-3 z-10">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>

            {/* Image Composition */}
            <div className="relative ml-20">
              {/* Large Main Image with overlay and play button */}
              <div className="relative w-[420px] h-[520px] md:w-[575px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/section2/thumb-lg.png"
                  alt="Children in need"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-emerald-900/60 mix-blend-multiply"></div>
                <button aria-label="Play video" className="absolute inset-0 flex items-center justify-center group">
                  <span className="relative flex items-center justify-center">
                    <span className="absolute w-32 h-32 rounded-full bg-black/30 group-hover:bg-black/40 transition-colors"></span>
                    <span className="absolute w-24 h-24 rounded-full border-2 border-dashed border-yellow-400 animate-spin" style={{animationDuration: '8s'}}></span>
                    <span className="relative w-20 h-20 rounded-full bg-yellow-400 shadow-lg flex items-center justify-center">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-black">
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>

              {/* Top-left small card */}
              <div className="absolute -top-10 -left-10 w-56 h-40 rounded-2xl overflow-hidden shadow-lg border-6 border-white bg-white">
                <Image src="/assets/section2/thumb-top 2section.png" alt="Community meal" fill className="object-cover" />
              </div>

              {/* Bottom-right small card */}
              <div className="absolute -bottom-10 -right-0 w-56 h-50 rounded-2xl overflow-hidden shadow-lg border-6 border-white bg-white">
                <Image src="/assets/section2/thumb-bottom.png" alt="Smiling child" fill className="object-cover" />
              </div>

              {/* Curved Yellow Line */}
              <div className="absolute -bottom-6 left-24 w-[320px] h-24 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 320 96" fill="none">
                  <path d="M0 64 Q110 10 200 48 T320 48" stroke="#FBBF24" strokeWidth="3" fill="none" className="anim-draw-2s" />
                </svg>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 opacity-30 hover:opacity-50 transition-opacity duration-300">
              <Image
                src="/assets/section2/hand (1) section2.png"
                alt="Hand outline"
                width={80}
                height={80}
                className="animate-[float_3s_ease-in-out_infinite]"
              />
            </div>

            <div className="absolute -left-8 bottom-20 hover:scale-110 transition-transform duration-300">
              <Image
                src="/assets/section2/parasuit.png"
                alt="Hot air balloon"
                width={80}
                height={80}
                className="animate-bounce"
                style={{ animationDuration: '3s' }}
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="relative opacity-0 anim-fade-in-right" style={{animationDelay: '0.2s'}}>
            {/* Wavy Green Line */}
            <div className="mb-6 opacity-0 anim-slide-in-right" style={{animationDelay: '0.4s'}}>
              <svg className="w-32 h-8" viewBox="0 0 128 32" fill="none">
                <path
                  d="M0 16 Q16 8 32 16 T64 16 T96 16 T128 16"
                  stroke="#166534"
                  strokeWidth="3"
                  fill="none"
                  className="anim-draw-2s-delay-600"
                />
              </svg>
            </div>

            {/* Subtitle */}
            <div className="flex items-center gap-3 mb-4 opacity-0 anim-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              {/* <p className="text-green-600 text-lg font-caveat text-4xl font-bold">Start Donating Poor People</p> */}
              <i className="text-xl mr-2 text-green-600 hand-icon"></i>
            <span className="text-green-600 font-caveat text-2xl font-bold">Start Donating Poor People</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl lg:text-5xl font-Nunito ,sans-serif text-gray-900 mb-6 leading-tight opacity-0 anim-fade-in-up" style={{animationDelay: '0.8s'}}>
              Helping Each Other Can Make{' '}
              <span className="text-yellow-400 animate-pulse">World</span> Better
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8 opacity-0 anim-fade-in-up" style={{animationDelay: '1s'}}>
              Volunteering Offers Opportunities To Develop New Skills And Gain Valuable Experience. 
              This Can Include Leadership, Communication, Project Management, And Teamwork Skills.
            </p>

            {/* Feature Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Start Helping Them */}
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-lg transition-all duration-300 opacity-0 anim-fade-in-up" style={{animationDelay: '1.2s'}}>
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all duration-300">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Start Helping Them</h3>
                <p className="text-gray-600 text-sm">Raising Awareness About The Charity Mission And Cause.</p>
              </div>

              {/* Make Donations */}
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-lg transition-all duration-300 opacity-0 anim-fade-in-up" style={{animationDelay: '1.4s'}}>
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all duration-300">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Make Donations</h3>
                <p className="text-gray-600 text-sm">Raising Awareness About The Charity Mission And Cause.</p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3 mb-8 opacity-0 anim-fade-in-up" style={{animationDelay: '1.6s'}}>
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span className="text-gray-700">Helped Fund 3,265 Project Powerful Corporate Poor.</span>
              </div>
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span className="text-gray-700">We Give Child A Gift Of A Education</span>
              </div>
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span className="text-gray-700">We Help Companies Develop Powerful Corporate Social Responsibility.</span>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between opacity-0 anim-fade-in-up" style={{animationDelay: '1.8s'}}>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-teal-400 rounded-full animate-ping"></div>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
                  More About Us
                </button>
              </div>
              
              <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="text-gray-800 font-bold">+236 (456) 896 22</p>
                </div>
              </div>
            </div>

            {/* Background Heart Outline */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-10 animate-pulse">
              <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
        </button>
      </div>
    </section>
  );
}

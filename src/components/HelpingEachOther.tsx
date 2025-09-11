"Use client"




import Image from 'next/image';
import { useState, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';

export default function HelpingEachOther() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const router = useRouter();

  const handleVideoOpen = useCallback(() => {
    setIsVideoOpen(true);
  }, []);

  const handleVideoClose = useCallback(() => {
    setIsVideoOpen(false);
  }, []);

  const handleMoreAboutUs = useCallback(() => {
    router.push('/about');
  }, [router]);

  return (
    <>
      
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-4xl mx-4">
            
            <button
              onClick={handleVideoClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=XxVg_s8xAms"
                width="100%"
                height="100%"
                controls={true}
                playing={false}
                onError={(error) => console.log('Video error:', error)}
                onReady={() => console.log('Video ready')}
                stopOnUnmount={true}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      rel: 0
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      <section className="help relative py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-12 lg:px-20 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative opacity-0 anim-fade-in-left">
              
              <div className="absolute left-0 top-48 -bottom-8 w-20 bg-green-800 rounded-3xl border-2 border-yellow-500 flex items-center justify-center z-20 hover:bg-green-700 transition-all duration-300">
                <div
                  className="transform -rotate-90 text-white font-bold text-lg whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
                >
                  <span className="text-white">we give </span>
                  <span className="text-yellow-400">donations</span>
                  <span className="text-white"> to poor people</span>
                </div>
              </div>

              
              <div className="absolute -left-10 top-70 -bottom-4 z-10">
                <Image
                  src="/assets/section2/grid.png"
                  alt="Grid pattern"
                  width={120}
                  height={400}
                  className="grid-line"
                  style={{
                    opacity: 0.811946,
                    transform: 'translateY(0.723387px)'
                  }}
                />
              </div>

              
              <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-center gap-3 z-10">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.1} s` }}
                  ></div>
                ))}
            </div>

            
            <div className="relative ml-24">
              
              <div
                className="absolute -top-16 left-70 z-30 opacity-0 anim-fade-in-left"
                style={{ animationDelay: '0.3s' }}
              >
                <Image
                  src="/assets/section2/line.png"
                  alt="Decorative wavy line"
                  width={200}
                  height={40}
                  className="animate-[float_4s_ease-in-out_infinite] hover:scale-110 transition-transform duration-300"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </div>

              
              <div className="relative w-[420px] h-[520px] md:w-[575px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/section2/thumb-lg.png"
                  alt="Children in need"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-emerald-900/60 mix-blend-multiply"></div>
                <button
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center group"
                  onClick={handleVideoOpen}
                >
                  <span className="relative flex items-center justify-center">
                    <span className="absolute w-32 h-32 rounded-full bg-black/30 group-hover:bg-black/40 transition-colors"></span>
                    <span
                      className="absolute w-24 h-24 rounded-full border-2 border-dashed border-yellow-400 animate-spin"
                      style={{ animationDuration: '8s' }}
                    ></span>
                    <span className="relative w-20 h-20 rounded-full bg-yellow-400 shadow-lg flex items-center justify-center">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-black">
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>

              
              <div className="absolute -top-10 -left-24 w-60 h-60 rounded-2xl overflow-hidden shadow-lg border-6 border-white bg-white">
                <Image src="/assets/section2/thumb-top 2section.png" alt="Community meal" fill className="object-cover" />
              </div>

              <div className="absolute -bottom-10 -right-10 w-56 h-50 rounded-2xl overflow-hidden shadow-lg border-6 border-white bg-white">
                <Image src="/assets/section2/thumb-bottom.png" alt="Smiling child" fill className="object-cover" />
              </div>
            </div>

            
            <div className="absolute -left-15 top-2 transform -translate-y-1/2 opacity-40 hover:opacity-50 transition-opacity duration-300">
              <Image
                src="/assets/section2/hand (1) section2.png"
                alt="Hand outline"
                width={80}
                height={80}
                className="animate-[float_3s_ease-in-out_infinite]"
              />
            </div>

            <div className="absolute -left-12 bottom-20 hover:scale-110 transition-transform duration-300">
              <Image
                src="/assets/section2/parasuit.png"
                alt="Hot air balloon"
                width={100}
                height={100}
                style={{
                  top: '398.231px',
                  transform: 'translateX(-49.9345%) rotate(-10.3928deg)',
                  animation: 'fall 15s ease-in-out infinite'
                }}
              />
            </div>
          </div>

         
          <div className="relative opacity-0 anim-fade-in-right pl-8" style={{ animationDelay: '0.2s' }}>
            
            <div className="flex items-center gap-3 mb-4 opacity-0 anim-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <i className="text-xl mr-2 text-[var(--green)]  hand-icon"></i>
              <span className=" text-[var(--green)]  font-caveat text-2xl font-bold">Start Donating Poor People</span>
            </div>

            
            <h2
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight opacity-0 anim-fade-in-up"
              style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
            >
              Helping Each Other Can Make <span className="text-yellow-400 animate-pulse">World</span> Better
            </h2>

            
            <p
              className="text-[#667471] text-lg leading-relaxed mb-8 opacity-0 anim-fade-in-up"
              style={{ animationDelay: '1s' }}
            >
              Volunteering Offers Opportunities To Develop New Skills And Gain Valuable Experience. This Can Include
              Leadership, Communication, Project Management, And Teamwork Skills.
            </p>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
             
              <div className="flex items-center gap-4 opacity-0 anim-fade-in-up" style={{ animationDelay: '1.2s' }}>
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src="/assets/section2/football_hands.jpg"
                    alt="Football hands icon"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
                  >
                    Start Helping Them
                  </h3>
                  <p className="text-gray-600 text-sm">Raising Awareness About The Charity Mission And Cause.</p>
                </div>
              </div>

              
              <div className="flex items-center gap-4 opacity-0 anim-fade-in-up" style={{ animationDelay: '1.4s' }}>
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src="/assets/section2/heart_hands.jpg"
                    alt="Heart hands icon"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
                  >
                    Make Donations
                  </h3>
                  <p className="text-gray-600 text-sm">Raising Awareness About The Charity Mission And Cause.</p>
                </div>
              </div>
            </div>

           
            <div className="space-y-3 mb-8 opacity-0 anim-fade-in-up" style={{ animationDelay: '1.6s' }}>
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                <div className="w-5 h-5 bg-green-800 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-gray-700">Helped Fund 3,265 Project Powerful Corporate Poor.</span>
              </div>
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                <div className="w-5 h-5 bg-green-800 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-gray-700">We Give Child A Gift Of A Education</span>
              </div>
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                <div className="w-5 h-5 bg-green-800 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-gray-700">
                  We Help Companies Develop Powerful Corporate Social Responsibility.
                </span>
              </div>
            </div>

            
            <div className="flex items-center justify-between opacity-0 anim-fade-in-up" style={{ animationDelay: '1.8s' }}>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleMoreAboutUs}
                  className="bg-green-800 hover:bg[#FFC107] text-black font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                  style={{
                    width: "206.51px",
                    height: "70px",
                    fontSize: "16px",
                    fontFamily: "Nunito, sans-serif",
                    padding: "23px 46px",
                  }}
                >
                  More 

                </button>
              </div>


              <div className="flex items-center gap-3 w-[202.13px] h-[40px] hover:scale-105 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <div>
                 
                  <p
                    className="w-[157.13px] h-[14px] text-[#828A8D] text-[14px] font-nunito m-0 mb-2"
                  >
                    Phone
                  </p>

                 
                  <a
                    href="tel:+23645689622"
                    className="block w-[157.13px] h-[18px] text-[18px] font-nunito text-[#122F2A]"
                  >
                    +236 (456) 896 22
                  </a>
                </div>
              </div>

            </div>

            
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-10 animate-pulse">
              <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </section >
    </>
  );
}




"use client";
import { FaCheckCircle } from "react-icons/fa";
import Image from 'next/image';
import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiPhoneCall } from "react-icons/fi";
import { motion, useInView } from 'framer-motion';
export default function HelpingEachOther() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const router = useRouter();
  const thumbRef = useRef(null);
  const isThumbInView = useInView(thumbRef, { once: true, amount: 0.3 });
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
              aria-label="Close video"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/XxVg_s8xAms?autoplay=1&rel=0&modestbranding=1"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Introduction to React.js"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
      <section className="help relative py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-8 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-4 xl:gap-16 items-center">
            
            <div className="relative opacity-0 anim-fade-in-left">
             
              <div className="hidden lg:block absolute left-0 top-50 -bottom-15 w-16 lg:w-16 xl:w-25 bg-[#046b59] rounded-3xl border-t-4 border-b-4 border-yellow-500 flex items-center justify-center z-20 transition-all duration-300">
                <div
                  className="transform -rotate-90 text-white font-extrabold text-xl  whitespace-nowrap mt-80 px-2"
                  style={{
                    fontFamily: 'var(--font-nunito), Nunito, sans-serif',
                    fontWeight: '800',
                  }}
                >
                  <span className="text-white">we give </span>
                  <span className="text-yellow">donations</span>
                  <span className="text-white"> to poor people</span>
                </div>
              </div>
              
              <div className="hidden lg:block absolute -left-6 lg:-left-6 xl:-left-10 top-95 -bottom-4 z-10">
                <Image
                  src="/assets/section2/grid.png"
                  alt="Grid pattern"
                  width={120}
                  height={400}
                  className="grid-line"
                  style={{
                    opacity: 0.811946,
                    transform: 'translateY(0.723387px)',
                  }}
                />
              </div>
             
 
              
              <div className="relative ml-0 md:ml-16 lg:ml-8 xl:ml-28">
               
                <div
                  className="hidden lg:block absolute -top-16 left-70 z-30 opacity-0 anim-fade-in-left"
                  style={{ animationDelay: '0.3s' }}
                >
                  <Image
                    src="/assets/section2/line.png"
                    alt="Decorative wavy line"
                    width={200}
                    height={40}
                    className="animate-[float_4s_ease-in-out_infinite] hover:scale-110 transition-transform duration-300"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))' }}
                  />
                </div>
                
                <motion.div 
                  ref={thumbRef}
                  className="hidden md:block relative 
             w-[300px] h-[350px] 
             sm:w-[350px] sm:h-[400px] 
             md:w-[380px] md:h-[450px] 
             lg:w-[280px] lg:h-[340px]   /* more compact for 1024px */
             xl:w-[500px] xl:h-[555px]  /* bigger only on desktop */
             mx-auto rounded-3xl border-8 md:border-12 border-white overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, transform: "translateZ(0)" }}
                  animate={isThumbInView ? { opacity: 1, transform: "translateZ(0)" } : { opacity: 0, transform: "translateZ(0)" }}
                  transition={{ duration: 1 }}
                >
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
                        className="absolute w-24 h-24 rounded-full border-2 border-dashed border-yellow animate-spin"
                        style={{ animationDuration: '8s' }}
                      />
                      <span className="relative w-20 h-20 rounded-full bg-yellow shadow-lg flex items-center justify-center">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-black">
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </motion.div>
   
                <div className="hidden md:block absolute -top-6 -left-12 lg:-left-8 xl:-left-24 w-44 h-44 lg:w-36 lg:h-36 xl:w-60 xl:h-60 rounded-2xl overflow-hidden shadow-lg border-6 border-white bg-white">
                  <Image src="/assets/section2/thumb-top 2section.png" alt="Community meal" fill className="object-cover" />
                </div>
                
                <div className="hidden md:block absolute -bottom-16 -right-4 lg:-right-2 left-70 xl:-right-10 w-44 h-40 lg:w-36 lg:h-32 xl:w-56 xl:h-50 rounded-2xl overflow-hidden shadow-lg border-6 border-white bg-white">
                  <Image src="/assets/section2/thumb-bottom.png" alt="Smiling child" fill className="object-cover" />
                </div>
              </div>
             
              <div className="absolute -left-25 top-2 transform -translate-y-1/2 opacity-60 hover:opacity-50 transition-opacity duration-300">
                <Image
                  src="/assets/section2/hand (1) section2.png"
                  alt="Hand outline"
                  width={90}
                  height={90}
                  className="animate-[float_3s_ease-in-out_infinite]"
                />
              </div>
                <motion.div 
              className="absolute -left-40 bottom-20 hover:scale-110 transition-transform duration-300"
              animate={{
                top: [-150, 1372.21, -150],
                x: [0, -53.371, 0],
                rotate: [0, -23.4842, 0]
              }}
              transition={{
                duration: 15,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{
                insetInlineStart: '8%',
                zIndex: -1
              }}
            >
              <Image
                  src="/assets/section2/parasuit.png"
                  alt="Hot air balloon"
                  width={100}
                  height={100}
                  
                />
               
            </motion.div>
                
             
            </div>
           
            <div className="relative opacity-0 anim-fade-in-right pl-0 md:pl-4 lg:pl-0 xl:pl-8" style={{ animationDelay: '0.2s' }}>
              
              <div className="flex items-center gap-3 mb-4 opacity-0 anim-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
                <span className="text-[var(--green)] font-caveat text-xl md:text-2xl font-bold">
                  Start Donating Poor People
                </span>
              </div>
             
              <h2
                className="text-3xl sm:text-4xl lg:text-3xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight opacity-0 anim-fade-in-up"
                style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
              >
                Helping Each Other Can Make <span className="text-yellow">World</span> Better
              </h2>
              
              <p
                className="text-[#667471] text-base md:text-lg font-nunito leading-relaxed mb-8 opacity-0 anim-fade-in-up"
                style={{ animationDelay: '1s' }}
              >
                Volunteering Offers Opportunities To Develop New Skills And Gain Valuable Experience. This Can Include
                Leadership, Communication, Project Management, And Teamwork Skills.
              </p>
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-4 mb-8">
                
                <div className="flex items-center gap-4 opacity-0 anim-fade-in-up" style={{ animationDelay: '1.2s' }}>
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center shadow-md">
                    <Image
                      src="/assets/section2/football_hands.jpg" 
                      alt="Football hands icon"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-gray-900 font-nunito"
                      style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
                    >
                      Start Helping Them
                    </h3>
                    <p className="text-[#667471] font-nunito">
                      Raising Awareness About The Charity Mission And Cause.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 opacity-0 anim-fade-in-up" style={{ animationDelay: '1.4s' }}>
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center shadow-md">
                    <Image
                      src="/assets/section2/heart_hands.jpg" 
                      alt="hearthand"
                      width={100}
                      height={100}
                      className="object-contain"
                    />

                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-gray-900 font-nunito"
                      style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
                    >
                      Make Donations
                    </h3>
                    <p className="text-[#667471] font-nunito">
                      Raising Awareness About The Charity Mission And Cause.
                    </p>
                  </div>
                </div>
              </div>
         
              <div className="space-y-3 mb-15 opacity-0 anim-fade-in-up" style={{ animationDelay: '1.6s' }}>
                <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                  <FaCheckCircle className="text-[#122F2A] w-5 h-5" />
                  <span className="text-[#122F2A]">Helped Fund 3,265 Project Powerful Corporate Poor.</span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                  <FaCheckCircle className="text-[#122F2A] w-5 h-5" />
                  <span className="text-[#122F2A]">We Give Child A Gift Of A Education</span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                  <FaCheckCircle className="text-[#122F2A] w-5 h-5" />
                  <span className="text-[#122F2A]">
                    We Help Companies Develop Powerful Corporate Social Responsibility.
                  </span>
                </div>
              </div>
            
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-3 lg:gap-2 opacity-0 anim-fade-in-up" style={{ animationDelay: '1.8s' }}>
               
                <button
                  onClick={handleMoreAboutUs}
                  className="bg-yellow hover:bg-[#046b59] hover:text-white text-black font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform px-8 sm:px-12 py-4 sm:py-5 text-sm sm:text-base font-nunito w-full sm:w-auto"
                  style={{
                    width: "100%",
                    maxWidth: "210px",
                    height: "60px",
                    fontSize: "14px",
                    fontFamily: "Nunito, sans-serif",
                  }}
                >
                  More About Us
                </button>
                
                <div className="flex items-center gap-3 sm:ml-6 lg:ml-2 hover:scale-105 transition-transform duration-300">
                  <FiPhoneCall className="w-6 h-6 sm:w-7 sm:h-7 text-[#122F2A]" />
                  <div>
                    <p className="text-[#828A8D] text-[12px] sm:text-[14px] font-nunito leading-none mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+23645689622"
                      className="text-[16px] sm:text-[18px] font-nunito text-[#122F2A]"
                    >
                      +236 (456) 896 22
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block absolute right-0 bottom-[120px] opacity-10 animate-pulse">
                <Image
                  src="/assets/section2/spade.png"
                  alt="Heart Outline"
                  width={80}
                  height={80}
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      
        <div className="fixed bottom-8 right-8 z-50">
          <button
            aria-label="Scroll to top"
            className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}
  
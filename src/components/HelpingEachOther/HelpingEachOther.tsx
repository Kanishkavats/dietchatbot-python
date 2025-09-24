"use client";
import { FaCheckCircle } from "react-icons/fa";
import Image from 'next/image';
import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiPhoneCall } from "react-icons/fi";
import { motion, useInView } from 'framer-motion';
import Button from "../common/Buttons/Button";
import { useTranslation } from "react-i18next";
export default function HelpingEachOther() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const router = useRouter();
  const thumbRef = useRef(null);
  const{t}=useTranslation();
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
      <section className="help relative py-2 lg:py-3 xl:py-20 bg-white overflow-hidden">
        <div className="absolute left-0 top-[250px] transform -translate-y-1/2 opacity-60 hover:opacity-50 transition-opacity duration-300">
                <Image
                  src="/assets/section2/hand (1) section2.png"
                  alt="Hand outline"
                  width={90}
                  height={90}
                  className="animate-[float_3s_ease-in-out_infinite]"
                />
        </div>
        <div className="container mx-auto px-4 sm:pr-8 md:pr-12 lg:pr-8 xl:pr-16 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 lg:gap-8 xl:gap-16 2xl:gap-20 items-center">
            
            <div className="relative opacity-0 anim-fade-in-left">
             
                           

 

              <div className="hidden xl:block absolute left-6 top-54 -bottom-15 w-16 lg:w-16 xl:w-25 bg-[#046b59] rounded-3xl border-t-4 border-b-4 border-yellow-500 flex items-center justify-center z-20 transition-all duration-300">
                <div
                  className="transform -rotate-90 text-white font-extrabold text-xl  whitespace-nowrap mt-80 px-2"
                  style={{
                    fontFamily: 'var(--font-nunito), Nunito, sans-serif',
                    fontWeight: '800',
                  }}
                >
                  <span className="text-white">{t("We give")} </span>
                  <span className="text-yellow">{t("donations")}</span>
                  <span className="text-white"> {t("to poor people")}</span>
                </div>
              </div>
              
              <div className="hidden sm:hidden xl:block absolute -left- lg:-left-6 xl:-left-5 top-95 -bottom-4 z-10">
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

              
              <div className="relative ml-0 md:ml-16 lg:ml-0 xl:ml-16 2xl:ml-28">
               
                <div
                  className="hidden xl:block absolute -top-16 left-70 z-30 opacity-0 anim-fade-in-left"
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
                
                {/* 700-1000px breakpoint: Same layout as 1024px */}
                <div className="hidden bg-green sm:hidden md:hidden items-center justify-center gap-4 mb-8">
                  {/* Left image - same size as middle */}
                  <div className="w-[280px] h-[320px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white">
                    <Image src="/assets/section2/thumb-top 2section.png" alt="Community meal" width={280} height={320} className="object-cover w-full h-full" />
                  </div>
                  
                  {/* Main video image */}
                  <motion.div 
                    ref={thumbRef}
                    className="relative w-[280px] h-[320px] rounded-3xl border-8 border-white overflow-hidden shadow-2xl"
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
                    <div className="absolute inset-0 bg-dark-green mix-blend-multiply"></div>
                    <button
                      aria-label="Play video"
                      className="absolute inset-0 flex items-center justify-center group"
                      onClick={handleVideoOpen}
                    >
                      <span className="relative flex items-center justify-center">
                        <motion.span 
                          className="absolute w-24 h-24 rounded-full bg-black/30 group-hover:bg-black/40 transition-colors"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(0, 0, 0, 0.5)",
                              "0 0 0 20px rgba(0, 0, 0, 0.2)",
                              "0 0 0 0 rgba(0, 0, 0, 0.5)"
                            ]
                          }}
                          transition={{
                            duration: 3,
                            delay: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        ></motion.span>
                       
                        <span className="relative w-16 h-16 rounded-full bg-yellow shadow-lg flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-black">
                            <path d="M8 5v14l11-7L8 5z" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  </motion.div>
                  
                  {/* Right image - same size as middle */}
                  <div className="w-[280px] h-[320px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white">
                    <Image src="/assets/section2/thumb-bottom.png" alt="Smiling child" width={280} height={320} className="object-cover w-full h-full" />
                  </div>
                </div>

                {/* 1024px breakpoint: All images in a row */}
                <div className="flex lg:flex xl:hidden items-center justify-center gap-4 mb-8">
                  {/* Left image - now same size as middle */}
                  <div className="w-[280px] h-[320px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white">
                    <Image src="/assets/section2/thumb-top 2section.png" alt="Community meal" width={280} height={320} className="object-cover w-full h-full" />
                  </div>
                  
                  {/* Main video image */}
                  <motion.div 
                    ref={thumbRef}
                    className="relative w-[280px] h-[320px] rounded-3xl border-8 border-white overflow-hidden shadow-2xl"
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
                    <div className="absolute inset-0 bg-dark-green mix-blend-multiply"></div>
                    <button
                      aria-label="Play video"
                      className="absolute inset-0 flex items-center justify-center group"
                      onClick={handleVideoOpen}
                    >
                      <span className="relative flex items-center justify-center">
                        <motion.span 
                          className="absolute w-24 h-24 rounded-full bg-black/30 group-hover:bg-black/40 transition-colors"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(0, 0, 0, 0.5)",
                              "0 0 0 20px rgba(0, 0, 0, 0.2)",
                              "0 0 0 0 rgba(0, 0, 0, 0.5)"
                            ]
                          }}
                          transition={{
                            duration: 3,
                            delay: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        ></motion.span>
                        
                        <span className="relative w-16 h-16 rounded-full bg-yellow shadow-lg flex items-center justify-center">
                          <div className="relative w-12 h-12 rounded-full border-2 border-dashed border-black flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                          </div>
                        </span>
                      </span>
                    </button>
                  </motion.div>
                  
                  {/* Right image - now same size as middle */}
                  <div className="w-[280px] h-[320px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white">
                    <Image src="/assets/section2/thumb-bottom.png" alt="Smiling child" width={280} height={320} className="object-cover w-full h-full" />
                  </div>
                </div>

                {/* Original layout for other breakpoints */}
                <motion.div 
                  ref={thumbRef}
                  className="hidden md:hidden lg:hidden xl:block relative 
             w-[300px] h-[350px] 
             sm:w-[350px] sm:h-[400px] 
             md:w-[380px] md:h-[450px] 
             xl:w-[500px] xl:h-[555px]  /* bigger only on desktop */
             mx-auto rounded-3xl border-8 md:border-12 overflow-hidden shadow-2xl"
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
                  <div className="absolute inset-0 bg-dark-green mix-blend-multiply"></div>
                  <button
                    aria-label="Play video"
                    className="absolute inset-0 flex items-center justify-center group"
                    onClick={handleVideoOpen}
                  >
                    <span className="relative flex items-center justify-center">
                      <motion.span 
                        className="absolute w-32 h-32 rounded-full bg-black/30 group-hover:bg-black/40 transition-colors"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(0, 0, 0, 0.5)",
                            "0 0 0 20px rgba(0, 0, 0, 0.2)",
                            "0 0 0 0 rgba(0, 0, 0, 0.5)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          delay: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      ></motion.span>
                    
                      <span className="relative w-20 h-20 rounded-full bg-yellow shadow-lg flex items-center justify-center">
                         <div className="relative w-12 h-12   rounded-full border-1 border-dashed border-black flex items-center justify-center">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-black">
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                        </div>
                      </span>
                    </span>
                  </button>
                </motion.div>
   
                <div className="hidden md:hidden lg:hidden xl:block absolute -top-6 -left-12 xl:-left-24 w-44 h-44 xl:w-60 xl:h-60 rounded-2xl overflow-hidden shadow-lg border-6 border-white bg-white">
                  <Image src="/assets/section2/thumb-top 2section.png" alt="Community meal" fill className="object-cover" />
                </div>
                
                <div className="hidden md:hidden lg:hidden xl:block absolute -bottom-16 -right-4 left-70 xl:-right-10 w-44 h-40 xl:w-56 xl:h-50 rounded-2xl overflow-hidden shadow-lg border-6 border-white bg-white">
                  <Image src="/assets/section2/thumb-bottom.png" alt="Smiling child" fill className="object-cover" />
                </div>
              </div>

            
             

              
              {/* White box with yellow border - bottom left */}
              <div className="hidden xl:block absolute -bottom-15 left-60 w-40 h-24 bg-white border-1 border-yellow rounded-lg overflow-hidden -z-10"></div>
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
                insetInlineStart: '2%',
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
           
            <div className="relative opacity-0 anim-fade-in-right pl-0  md:pl-8 lg:pl-4 xl:pl-4 2xl:pl-6 mt-20" style={{ animationDelay: '0.2s' }}>
              
              <div className="flex items-center gap-3 mb-4 opacity-0 anim-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <i className="text-xl mr-2 text-[var(--green)] hand-icon"></i>
                <span className="text-[var(--green)] font-caveat text-xl md:text-2xl font-bold">
                  {t("Start Donating Poor People")}
                </span>
              </div>
             
              <h2
                className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight opacity-0 anim-fade-in-up"
                style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
              >
                {t("Helping Each Other Can Make")} <span className="text-yellow">{t("World")}</span>{t(" Better")}
              </h2>
              
              <p
                className="text-[#667471] text-base md:text-lg font-nunito font-s leading-relaxed mb-8 opacity-0 anim-fade-in-up"
                style={{ animationDelay: '1s' }}
              >
                {t("Volunteering Offers Opportunities To Develop New Skills And Gain Valuable Experience. This Can Include Leadership, Communication, Project Management, And Teamwork Skills.")}
              </p>
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-6 mb-8">
                
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
                      className="text-lg font-bold text-foreground font-nunito"
                      style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
                    >
                      {t("Start Helping Them")}
                    </h3>
                    <p className="text-[#667471] font-nunito">
                      {t("Raising Awareness About The Charity Mission And Cause.")}
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
                      className="text-lg font-bold text-foreground font-nunito"
                      style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800' }}
                    >
                      {t("Make Donations")}
                    </h3>
                    <p className="text-[#667471] font-nunito">
                      {t("Raising Awareness About The Charity Mission And Cause.")}
                    </p>
                  </div>
                </div>
              </div>
         
              <div className="space-y-3 mb-15 opacity-0 anim-fade-in-up" style={{ animationDelay: '1.6s' }}>
                <div className="flex items-center gap-3 ">
                  <FaCheckCircle className="text-[#122F2A] w-5 h-5" />
                  <span className="text-[#122F2A]">{t("Helped Fund 3,265 Project Powerful Corporate Poor.")}</span>
                </div>
                <div className="flex items-center gap-3 ">
                  <FaCheckCircle className="text-[#122F2A] w-5 h-5" />
                  <span className="text-[#122F2A]">{t("We Give Child A Gift Of A Education")}</span>
                </div>
                <div className="flex items-center gap-3 ">
                  <FaCheckCircle className="text-[#122F2A] w-5 h-5" />
                  <span className="text-[#122F2A]">
                    {t("We Help Companies Develop Powerful Corporate Social Responsibility.")}
                  </span>
                </div>
              </div>
            
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-3 lg:gap-4 opacity-0 anim-fade-in-up" style={{ animationDelay: '1.8s' }}>
               <div className="flex items-center w-[200px] h-[80px] justify-center mt-6">
            <Button
              text="More About Us"
              bgColor="bg-[#FFC107]"
              textColor="text-black"
              hoverTextColor="group-hover:text-white"
              hoverBg="before:bg-[#046b59]"
              onClick={handleMoreAboutUs}
            />
          </div>
                
                
                <div className="flex items-center gap-3 sm:ml-6 lg:ml-4 hover:scale-105 transition-transform duration-300">
                  <FiPhoneCall className="w-6 h-6 sm:w-7 sm:h-7 text-[#122F2A]" />
                  <div>
                    <p className="text-[#828A8D] text-[12px] sm:text-[14px] font-nunito leading-none mb-1">
                      {t("Phone")}
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
            className="w-12 h-12 bg-green hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform"
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
  
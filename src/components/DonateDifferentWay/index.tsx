'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { donateDifferentWayTabs, donateDifferentWayMissionItems } from '../../staticResource';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { gridDot, thumbSmChild } from '@/public/assets';
import FadeUpCard from '@/src/animations/FadeButtomUp';

const DonateDifferentWay: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const mainImageRef = useRef(null);
  const bottomImageRef = useRef(null);
  const isInView = useInView(mainImageRef, { once: true, amount: 0.3 });
  const isBottomImageInView = useInView(bottomImageRef, { once: true, amount: 0.3 });
  const{t}=useTranslation();
  // Use imported data from staticResource
  const tabs = donateDifferentWayTabs;
  const missionItems = donateDifferentWayMissionItems;

  return (
    <div className='w-full py-4 sm:py-6 lg:py-2 lg:px-0 px-2 mt-20 mb-10 xl:mb-20 lg:mt-25 bg-white '>
      <div className='max-w-7xl  md:pl-10 md:pr-10 lg:pl-0 lg:pr-0 mx-auto'>

        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4 xs:gap-6 sm:gap-8 lg:gap-20 w-full items-start'>
          {/* Left side - Video and image section */}
          <div className='lg:col-span-3 xl:col-span-5 space-y-3 lg:mt-20 sm:space-y-4 h-full relative'>
            
            {/* Grid background pattern */}
            <motion.div 
              className='hidden xl:block absolute  top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-35 lg:h-30 z-0 -mt-12 sm:-mt-16 lg:-mt-20 -ml-8 sm:-ml-12 lg:-ml-15'
              animate={{
                y: [-2, -30, -2]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              repeatType:"mirror"
              }}
            >
              <Image
                src={gridDot} 
                alt='Grid pattern' 
                fill={true}
                className='w-full h-full rounded-t-full rounded-b-full  object-contain opacity-60'
              />
            </motion.div>

            {/* Video player with actual image */}
            <motion.div 
              ref={mainImageRef}
              className='hidden lg:block relative rounded-xl sm:rounded-2xl overflow-hidden w-full max-w-sm sm:max-w-md lg:w-110 xl:w-[450px] lg:-ml-40 xl:-ml-0 h-64 sm:h-80 lg:h-5/7 xl:h-[600px]  lg:-mt-15  bg-gray-200 z-10'
              initial={{ opacity: 0,x:-100 }}
              animate={isInView ? { opacity: 1, x:0 } : {  }}
              transition={{ duration: 1 ,ease: "easeOut",delay:0.2
              }}
            >
              <Image
                src={thumbSmChild} 
                alt='Children in need' 
                fill={true}
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 
               bg-[linear-gradient(104deg,rgba(12,26,23,0)_1.9%,rgba(0,113,93,.08)_18.93%,rgba(0,113,93,.17)_29.72%,rgba(0,113,93,.37)_83.58%,rgba(0,113,93,.67)_109.85%,#00715d_133.89%,#00715d_133.91%,rgba(0,113,93,.91)_149.32%)]"
                    />
              <div className='absolute inset-0 opacity-30' style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay'
              }}></div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <motion.div 
                  className='w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-yellow rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-500 transition-colors shadow-lg'
                  onClick={() => setIsVideoModalOpen(true)}
                  animate={{
                    boxShadow: [
                      'rgba(0, 0, 0, 0.384) 0px 0px 0px 0px',
                      'rgba(0, 0, 0, 0.384) 0px 0px 0px 30.2903px',
                      'rgba(0, 0, 0, 0.384) 0px 0px 0px 0px'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    ease: 'linear',
                    delay: 2,
                    repeat: Infinity
                  }}
                >
                  <svg className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white ml-1' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M8 5v14l11-7z'/>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Small overlapping image */}
            <motion.div 
              ref={bottomImageRef}
              className='hidden lg:block absolute rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden border-4 sm:border-6 lg:border-10 border-white w-48 h-40 sm:w-56 sm:h-48 lg:w-75 lg:h-65 xl:w-75 xl:h-70 z-10  bottom-[-100] lg:bottom-[50] xl:bottom-0 lg:transform lg:-translate-y-1/2 lg:right-[-90%] xl:right-[-10%] '
              initial={{ opacity: 0, y:100 }}
              animate={isBottomImageInView ? { opacity: 1, y:0 } : { }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Image
                src='/assets/section2/thumb-bottom.png' 
                alt='Happy child running' 
                fill={true}
                className='w-full h-full object-cover'
              />
            </motion.div>
          </div>

          {/* Right side - Content section */}
          <div className='lg:col-span-9 xl:col-span-7 flex flex-col md:pl-5 lg:p-5 xl:p-0 lg:flex-row gap-4 sm:gap-6'>
            {/* Main content area */}
            <div className='space-y-4 sm:space-y-6 flex-1 '>
              {/* Main Title */}
              <div className='font-nunito font-extrabold relative'>
                {/* Header Section - Centered at top */}
        <div className='flex items-center pl-1 md:pl-0 justify-start lg:pl-15 xl:pl-0 lg:mb-6 xl:mb-0 ml-0'>
          <div className='flex items-center space-x-2 sm:space-x-4'>
            <Icon icon={'mdi:hand-heart'} className="text-lg xs:text-xl md:text-2xl xl:text-3xl text-green" />
            <span className="text-green text-lg sm:text-xl lg:text-2xl font-caveat font-semibold">{t("Start Donating Poor People")}</span>
          </div>
        </div>
                <div className='flex flex-col mt-5 md:mt-5 w-full lg:flex-row items-start justify-between '>
                  <h2 className='text-3xl w-full tracking-tight md:tracking-normal lg:pl-15 lg:pr-10 xl:pl-0 xl:pr-0 sm:text-3xl md:text-4xl xl:text-6xl font-nunito font-extrabold  text-dark-green leading-10 md:leading-10 lg:leading-tight'>
                    <span className='text-dark-green'>{t("Donate")} <span className='text-yellow'>{t("Support")}</span> {t("To Make")}</span>
                    <span className='text-dark-green'> {t("Difference Way")}</span>
                  </h2>
                  {/* Heart Image positioned to the right */}
                  <motion.div 
                    className='flex-shrink-0 absolute top-[35] md:top-[1] md:right-[2] xl:top-[-20] right-[20] xl:right-[-60]  ml-2 sm:ml-4 xl:ml-0 mt-1 sm:mt-2'
                    animate={{
                      scale: [0.5, 1.2,0.5]
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                  >
                    <Image
                      src='/assets/childoldcare/spade-green-heart.png'
                      alt='Green heart'
                      width={100}
                      height={100}
                      className='w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain'
                    />
                  </motion.div>
                </div>
              </div>

              {/* Introductory text */}
              <p className='text-gray-green text-sm sm:text-sm xl:text-[16px] md:pr-5 lg:pl-15 lg:pr-10 xl:pl-0 xl:pr-0 leading-7  lg:leading-relaxed xl:leading-7 lg:tracking-wide xl:tracking-wide  font-nunito font-normal'>
                {t("Charity Is The Voluntary Act Of Giving Help, Typically In The Form Of Money, Time, Or Resources, To Those In Need. Charitable Organizations Aim To Solve Social, Environmental, And Economic Challenges By Addressing Issues Like Poverty,")}
              </p>
              <div className='flex flex-col md:flex-row lg:pl-15 lg:pr-10 xl:pl-0 xl:pr-0 '>
                <div >
              {/* Tabbed Navigation */}
              <div className='flex flex-wrap gap-7 xs:gap-5 md:space-x-2 md:gap-1 xl:gap-2 justify-center md:mr-2 border-b border-gray-200 mx-auto lg:ml-5 lg:mr-5 xl:ml-0 xl:mr-0 mt-6 xs:mt-4 xl:mt-10 pb-4 '>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-3 xs:px-15 md:px-8 sm:px-6  sm:py-3 lg:px-12 lg:py-2.5 xl:px-7 xl:py-2.5 font-nunito rounded-full font-nunito text-sm  xl:text-lg font-semibold transition-colors duration-400 ${
                      activeTab === tab.id
                        ? 'bg-green text-white'
                        : 'text-foreground hover:bg-green hover:text-white'
                    }`}
                  >
                    {t(tab.label)}
                  </button>
                ))}
              </div>

              {/* Tab Content with Donation Cards */}
              <div className='flex flex-col  cursor-pointer md:flex-row md:pl-2 xl:mt-5 mt-2 xs:mt-7 lg:mt-0 lg:p-7 xl:p-2'>
                {/* Mission/Vision/Excellence Content */}
                <div className='flex-1'>
                  {(activeTab === 'mission' || activeTab === 'vision' || activeTab === 'excellence') && (
                    <div className='space-y-3 sm:space-y-4'>
                      <ul className='space-y-2 sm:space-y-3'>
                        {missionItems.map((item, index) => (
                          <li key={index} className='flex items-start space-x-2 sm:space-x-2'>
                            <div className='w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0 mt-0.5'>
                              <svg className='w-4 h-4 xl:w-6 xl:h-6 text-yellow' fill='currentColor' viewBox='0 0 24 24' strokeWidth='3' stroke='currentColor'>
                                <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' strokeWidth='3'/>
                              </svg>
                            </div>
                            <span className='text-gray-green flex flex-wrap text-sm xl:text-sm font-medium font-nunito md:font-semibold'>{t(item)}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Circular Progress Indicators */}
                      <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 pt-3 '>
                        <div className='flex items-center space-x-2 sm:space-x-3'>
                          <div className='relative w-20 h-20 xs:w-23 lg:w-20 lg:h-20 xs:h-23 xl:w-23 xl:h-23 flex-shrink-0'>
                            <svg className='w-20 xs:w-23 h-20 xs:h-23 lg:w-20 lg:h-20 xl:w-23 xl:h-23 transform -rotate-90' viewBox='0 0 100 100'>
                              <circle
                                cx='50'
                                cy='50'
                                r='35'
                                stroke='#e5e7eb'
                                strokeWidth='6'
                                fill='none'
                              />
                              <circle
                                cx='50'
                                cy='50'
                                r='35'
                                stroke='#046b59'
                                strokeWidth='6'
                                fill='none'
                                strokeDasharray={`${2 * Math.PI * 35}`}
                                strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.55)}`}
                                strokeLinecap='round'
                              />
                            </svg>
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <span className='text-sm xs:text-sm sm:text-sm font-bold text-dark-green'>55%</span>
                            </div>
                          </div>
                          <p className='text-sm md:text-[16px] xl:text-lg  text-dark-green font-bold font-nunito'>{t("Treatment Helping")}</p>
                        </div>

                        <div className='flex items-center space-x-2 sm:space-x-3'>
                          <div className='relative w-20 h-20 xs:w-23 lg:w-20 lg:h-20 xs:h-23 xl:w-23 xl:h-23 flex-shrink-0'>
                            <svg className='w-20 xs:w-23 h-20 xs:h-23 lg:w-20 lg:h-20 xl:w-23 xl:h-23 transform -rotate-90' viewBox='0 0 100 100'>
                              <circle
                                cx='50'
                                cy='50'
                                r='35'
                                stroke='#e5e7eb'
                                strokeWidth='6'
                                fill='none'
                              />  
                              <circle
                                cx='50'
                                cy='50'
                                r='35'
                                stroke='#046b59'
                                strokeWidth='6'
                                fill='none'
                                strokeDasharray={`${2 * Math.PI * 35}`}
                                strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.85)}`}
                                strokeLinecap='round'
                              />
                            </svg>
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <span className='text-sm xs:text-sm sm:text-sm font-bold text-dark-green'>85%</span>
                            </div>
                          </div>
                          <p className='text-sm md:text-[16px] xl:text-lg  text-dark-green font-bold font-nunito'>{t("Highest Fund Raised")}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </div>
              {/* Right side - Donation Cards */}
                <div className='flex flex-wrap xs:flex-row sm:flex-row md:flex-col gap-4 xl:gap-2 rounded-xl md:w-2/6 lg:w-4/3 xl:w-[250px] lg:mr-2 xl:mr-0  xl:mt-5  bg-gray-50 border border-gray-300 '>
                  {/* Donate Now Card */}
                  <div className=' p-3 sm:p-4  transition-shadow flex-1 flex flex-col items-center justify-center sm:flex-none'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 xl:w-20 xl:h-18 rounded-lg flex items-center justify-center  mb-3 sm:mb-4'>
                      <Image
                        src='/assets/childoldcare/icon2.png'
                        alt='Donate icon'
                        width={120}
                        height={120}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <h3 className='text-dark-green font-bold mb-2 font-nunito text-sm md:text-lg xl:text-lg'>{t("Donate Now")}</h3>
                    <p className='text-lg font-caveat font-bold text-yellow italic'>{t("$")}40,456</p>
                  </div>
                     <div className='hidden md:block border border-gray-200 ml-3 mr-3'></div>
                  {/* Total Fundraised Card */}
                  <div className='  p-3 sm:p-4  transition-shadow flex-1 flex flex-col items-center justify-center sm:flex-none '>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 xl:w-20 xl:h-18 rounded-lg flex items-center justify-center mb-3 sm:mb-4'>
                      <Image
                        src='/assets/childoldcare/icon1.png'
                        alt='Fundraising icon'
                        width={120}
                        height={120}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <h3 className='text-dark-green font-bold mb-2 font-nunito text-sm md:text-lg xl:text-lg '>{t("Total Fundraised")}</h3>
                    <p className='text-lg font-caveat font-bold text-green italic'>{t("$")}1,540,456</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground bg-opacity-75 p-2 sm:p-4">
          <div className="relative w-full max-w-4xl bg-foreground rounded-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-900">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">Introduction to React.js</h3>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button className="text-white hover:text-gray-300 hidden sm:block">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => setIsVideoModalOpen(false)}
                  className="text-white hover:text-gray-300"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/XxVg_s8xAms?si=0UwTlJoWAMUgT34S&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 bg-gray-900 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="flex items-center space-x-1 sm:space-x-2 text-white hover:text-gray-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span className="text-xs sm:text-sm">Watch on YouTube</span>
                </button>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="text-white hover:text-gray-300 hidden sm:block">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                </button>
                <span className="text-white text-xs sm:text-sm">0:00 / 1:19:10</span>
                <button className="text-white hover:text-gray-300 hidden sm:block">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </button>
                <button className="text-white hover:text-gray-300 hidden sm:block">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </button>
                <button className="text-white hover:text-gray-300 hidden sm:block">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateDifferentWay;

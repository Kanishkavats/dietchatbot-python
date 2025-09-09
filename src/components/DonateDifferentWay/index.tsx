'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const DonateDifferentWay: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Our Mission' },
    { id: 'vision', label: 'Our Vision' },
    { id: 'excellence', label: 'Excellence' }
  ];

  const missionItems = [
    'We Help Companies Develop Powerful Corporate Social',
    'Helped Fund 3,265 Project Powerful Corporate Poor',
    'Dedicated Tech Services'
  ];

  return (
    <div className='w-full py-8 px-4 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center'>
          {/* Left side - Video and image section - More space */}
          <div className='lg:col-span-5 space-y-4 h-full'>
            {/* Video player with actual image */}
            <div className='relative rounded-2xl overflow-hidden w-full h-96 bg-gray-200'>
              <Image
                src='/assets/section3/givehealthsupport.png' 
                alt='Children in need' 
                fill={true}
                className='w-full h-full object-cover'
                onError={(e) => {
                  console.log('Image failed to load:', e);
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className='absolute inset bg-opacity-20'></div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-500 transition-colors shadow-lg'>
                  <svg className='w-8 h-8 text-white ml-1' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M8 5v14l11-7z'/>
                  </svg>
                </div>
              </div>
             
            </div>
            
            {/* Small overlapping image */}
            <div className='relative rounded-2xl overflow-hidden w-48 h-32 ml-auto -mt-24 z-10'>
              <Image
                src='/assets/section2/thumb-bottom.png' 
                alt='Happy child running' 
                fill={true}
                className='w-full h-full object-cover'
                onError={(e) => {
                  console.log('Small image failed to load:', e);
                }}
              />
            </div>
          </div>

          {/* Right side - DonateDifferentWay content */}
          <div className='lg:col-span-7 flex flex-col  lg:flex-row gap-6'>
            {/* Main content area */}
            <div className='space-y-6 flex-1'>
              {/* Header */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <i className="text-xl text-[var(--green)] hand-icon"></i>
                  <span className="text-[var(--green)] font-caveat text-2xl font-bold">Start Donating Poor People</span>
                </div>
                <div style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800'}}>
                  <h2 className='text-4xl lg:text-5xl font-bold text-gray-700 leading-tight'>
                    <span className='text-gray-700'>Donate <span className='text-yellow-400'>Support</span> To Make</span>
                    <br />
                    <span className='text-gray-700'>Difference Way</span>
                  </h2>
                </div>
              </div>

              {/* Introductory text */}
              <p className='text-gray-600 text-base leading-relaxed max-w-4xl' style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '400', lineHeight: '1.6'}}>
                Charity Is The Voluntary Act Of Giving Help, Typically In The Form Of Money, Time, Or Resources, To Those In Need. Charitable Organizations Aim To Solve Social, Environmental, And Economic Challenges By Addressing Issues Like Poverty,
              </p>

              {/* Tabbed Navigation */}
              <div className='flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md'>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-teal-800 text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'mission' && (
                <div className='space-y-4'>
                  <ul className='space-y-3'>
                    {missionItems.map((item, index) => (
                      <li key={index} className='flex items-start space-x-3'>
                        <div className='w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                          <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/>
                          </svg>
                        </div>
                        <span className='text-gray-700'>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Circular Progress Indicators */}
                  <div className='flex space-x-8 pt-4'>
                    <div className='text-center'>
                      <div className='relative w-20 h-20 mx-auto mb-2'>
                        <svg className='w-20 h-20 transform -rotate-90' viewBox='0 0 100 100'>
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
                            stroke='#10b981'
                            strokeWidth='6'
                            fill='none'
                            strokeDasharray={`${2 * Math.PI * 35}`}
                            strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.55)}`}
                            strokeLinecap='round'
                          />
                        </svg>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <span className='text-sm font-bold text-gray-800'>55%</span>
                        </div>
                      </div>
                      <p className='text-xs text-gray-600'>Treatment Helping</p>
                    </div>

                    <div className='text-center'>
                      <div className='relative w-20 h-20 mx-auto mb-2'>
                        <svg className='w-20 h-20 transform -rotate-90' viewBox='0 0 100 100'>
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
                            stroke='#10b981'
                            strokeWidth='6'
                            fill='none'
                            strokeDasharray={`${2 * Math.PI * 35}`}
                            strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.85)}`}
                            strokeLinecap='round'
                          />
                        </svg>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <span className='text-sm font-bold text-gray-800'>85%</span>
                        </div>
                      </div>
                      <p className='text-xs text-gray-600'>Highest Fund Raised</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Donation Cards */}
            <div className='flex flex-col gap-4 lg:max-w-xs lg:ml-8 lg:mt-95'>
              {/* Donate Now Card */}
              <div className='bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'>
                <div className='w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/>
                  </svg>
                </div>
                <h3 className='text-teal-800 font-semibold mb-2'>Donate Now</h3>
                <p className='text-2xl font-bold text-yellow-400 italic'>$40,456</p>
              </div>

              {/* Total Fundraised Card */}
              <div className='bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'>
                <div className='w-12 h-12 bg-teal-800 rounded-lg flex items-center justify-center mb-4'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'/>
                  </svg>
                </div>
                <h3 className='text-teal-800 font-semibold mb-2'>Total Fundraised</h3>
                <p className='text-2xl font-bold text-teal-800 italic'>$1,540,456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateDifferentWay;

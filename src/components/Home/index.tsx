'use client'

import React from 'react'
import PartnersCompanies from './PartnersCompanies';
import HeroStaticSlider from './Hero';
import Community from './Community';

const Home = () => {
  return (
    <div>
      <HeroStaticSlider />
      <PartnersCompanies />
        <Community />
    </div>
  )
}

export default Home

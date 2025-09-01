'use client'

import React from 'react'
import HeroCarousel from '../Hero';
import PartnersCompanies from '../PartnersCompanies';
import Charity from '../CharifyCard';

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <PartnersCompanies />
      <Charity />
    </div>
  )
}

export default Home

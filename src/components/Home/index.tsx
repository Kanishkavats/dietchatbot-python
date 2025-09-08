'use client'

import React from 'react'
import PartnersCompanies from './PartnersCompanies';
import HeroStaticSlider from './Hero';
import Community from './Community';
import CharityWithDifference from '../CharityWithDiffrence';
import HelpingEachOther from '../HelpingEachOther';
import HelpAndDonate from '../HelpAndDonate';
import { ValueableCustomer } from '../About';

const Home = () => {
  return (
    <div>
      <HeroStaticSlider />
      <PartnersCompanies />
      <CharityWithDifference />
      <HelpingEachOther />
      <HelpAndDonate />
      <Community />
      <ValueableCustomer />
    </div>
  )
}

export default Home

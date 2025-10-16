'use client'

import React, { useState } from 'react'
import PartnersCompanies from './PartnersCompanies';
import HeroStaticSlider from './Hero';
import CharityWithDifference from '../Charity_with_Difference/CharityWithDiffrence';
import HelpingEachOther from '../HelpingEachOther/HelpingEachOther';
import HelpAndDonate from '../HelpAndDonate';
import BecomeVolunteer from '../BecomeVolunteer/BecomeVolunteer';
import VolunteerTeam from '../volunteer/VolunteerTeam';
import Community from './Community';
import ValueableCustomer from '../volunteer/ValueableCustomer';
import FeedbackForm from '../FeedbackForm';
import DonateDifferentWay from '../DonateDifferentWay';
import LatestNewsArticle from '../LatestNewsArticle';
import ChildOldCare from '../ChildOldCare';
import ScrollToTop from '../common/ScrollToTop';



const Home = () => {
      const [hasFeedback,setHasFeedback]=useState<boolean|null>(true);
  return (
    <div>
      <HeroStaticSlider />
      <PartnersCompanies />
      <CharityWithDifference />
      <HelpingEachOther />
      <HelpAndDonate />
      <BecomeVolunteer />
      <VolunteerTeam />
      <Community hasfeedback={hasFeedback} />
      {hasFeedback ? (
        <ValueableCustomer setHasFeedback={setHasFeedback}/>
      ) : (
        <div className="mt-[100px] md:mt-[112px] " />
      )}
      <FeedbackForm />
      
      <ChildOldCare />
      <DonateDifferentWay />
      
      <LatestNewsArticle />
      <ScrollToTop />
    </div>
  )
}

export default Home

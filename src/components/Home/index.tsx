'use client'

import React, { useState } from 'react'
import PartnersCompanies from './PartnersCompanies';
import HeroStaticSlider from './Hero';
import CharityWithDifference from '../Charity_with_Difference/CharityWithDiffrence';
import HelpingEachOther from '../HelpingEachOther/HelpingEachOther';
import HelpAndDonate from '../HelpAndDonate';
import BecomeVolunteer from '../BecomeVolunteer';
import Community from './Community';
import FeedbackForm from '../FeedbackForm';
import DonateDifferentWay from '../DonateDifferentWay';
import LatestNewsArticle from '../LatestNewsArticle';
import ChildOldCare from '../ChildOldCare';
import ScrollToTop from '../common/ScrollToTop';
import VolunteerTeam from '../Volunteer/VolunteerTeam';
import ValueableCustomer from '../Volunteer/ValueableCustomer';




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
      <VolunteerTeam bg={"bg-white"}/>
      <Community hasfeedback={hasFeedback} />
      <div className="mt-8 md:mt-0"></div>
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

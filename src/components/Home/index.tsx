'use client'

import React from 'react'
import PartnersCompanies from './PartnersCompanies';
import HeroStaticSlider from './Hero';
import CharityWithDifference from '../Charity_with_Difference/CharityWithDiffrence';
import HelpingEachOther from '../HelpingEachOther/HelpingEachOther';
import HelpAndDonate from '../HelpAndDonate';
import BecomeVolunteer from '../BecomeVolunteer';
import VolunteerTeam from '../About/VolunteerTeam';
import Community from './Community';
import ValueableCustomer from '../About/ValueableCustomer';
import FeedbackForm from '../FeedbackForm';
import DonateDifferentWay from '../DonateDifferentWay';
import LatestNewsArticle from '../LatestNewsArticle';
import ChildOldCare from '../ChildOldCare';

const Home = () => {
  return (
    <div>
      <HeroStaticSlider />
      <PartnersCompanies />
      <CharityWithDifference />
      <HelpingEachOther />
      <HelpAndDonate />
      <BecomeVolunteer />
      <VolunteerTeam />
      <Community />
      <ValueableCustomer />
      <FeedbackForm />
      <ChildOldCare />
      <DonateDifferentWay />
      <LatestNewsArticle />
    </div>
  )
}

export default Home

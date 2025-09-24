import React from 'react'
import PageBanner from '../common/PageBanner'
import HelpingEachOther from '../HelpingEachOther/HelpingEachOther'
import ChildrenNeed from './ChildrenNeed'
import VolunteerTeam from './VolunteerTeam'
import FAQSection from '../FAQ/FAQSection'
import ValueableCustomer from './ValueableCustomer'
import SendMsg from './SendMsg'
import ScrollImgSection from './ScrollImgSection'
import { bannerBg } from '@/public/assets'
import DonateDifferentWay from '../DonateDifferentWay'

const About = () => {
  return (
    <div>
      <PageBanner bgImage={bannerBg} title="About us" />
      <HelpingEachOther />
      <ChildrenNeed />
      <VolunteerTeam />
      <FAQSection />
      <ValueableCustomer />
      <SendMsg />
      <DonateDifferentWay />
      <ScrollImgSection />
    </div>
  )
}

export default About

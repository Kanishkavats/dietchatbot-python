import React from 'react'
import FAQSection from './FAQSection'
import { VolunteerTeam } from '../About'
import PageBanner from '../common/PageBanner'
import { bannerBg } from '@/public/assets'

const FAQ = () => {
  return (
    <div >
      <PageBanner
        bgImage={bannerBg}
        tagline="Start Donating Poor People"
        title="Frequently Asked Questions"
        smallIcon="mdi:hand-heart"
        decoIcon="mdi:ribbon"
        decoPosition="absolute bottom-10 left-10"
      />
      <section className='bg-white  md:px-7 xl:pl-20 py-16 md:py-24 '>
        <FAQSection />
      </section>
      <VolunteerTeam />
    </div>
  )
}

export default FAQ

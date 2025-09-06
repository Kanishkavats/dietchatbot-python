import React from 'react'
import BecomeVolunteer from './BecomeVolunteer'
import VolunteerForm from './VolunteerForm'
import FadeInUp from '@/src/animations/FadeInUp'
import PageBanner from '../common/PageBanner'
import { bannerBg } from '@/public/assets'

const Volunteer = () => {
  return (
    <section>
       <PageBanner
        bgImage={bannerBg}
        tagline="Start Donating Poor People"
        title="Become A Volunteer"
        smallIcon="mdi:hand-heart"
        decoIcon="mdi:ribbon"
        decoPosition="absolute bottom-10 left-10"
      />
    <div className='flex justify-center items-center py-8 xl:py-16'>
      <section className=' w-5/6 md:w-10/12 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10'>
        <BecomeVolunteer />
        <FadeInUp>
        <VolunteerForm />
        </FadeInUp>
      </section>
    </div>
    </section>
  )
}

export default Volunteer

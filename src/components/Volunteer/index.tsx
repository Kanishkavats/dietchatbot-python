import React from 'react'
import BecomeVolunteer from './BecomeVolunteer'
import VolunteerForm from './VolunteerForm'
import FadeInUp from '@/src/animations/FadeInUp'

const Volunteer = () => {
  return (
    <div className='flex justify-center items-center py-8 xl:py-16'>
      <section className=' w-5/6 md:w-10/12 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10'>
        <BecomeVolunteer />
        <FadeInUp>
        <VolunteerForm />
        </FadeInUp>
      </section>
    </div>
  )
}

export default Volunteer

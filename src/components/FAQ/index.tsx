import React from 'react'
import FAQSection from './FAQSection'
import { VolunteerTeam } from '../About'

const FAQ = () => {
  return (
    <div >
      <section className='bg-[var(--white)]  md:px-7 xl:pl-20 py-16 md:py-24 '>
        <FAQSection />
      </section>
      <VolunteerTeam />
    </div>
  )
}

export default FAQ

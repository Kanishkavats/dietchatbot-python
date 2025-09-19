import React from 'react'
import { teamMembers } from '@/src/staticResource'


import PageBanner from '@/src/components/common/PageBanner';
import VolunteerProfile from '@/src/components/About/VolunteerProfile';

const page = ({params}) => {
    const member = teamMembers.find(m => m.id.toString() === params.id);
  return (
    <div>
        <PageBanner 
        bgImage="/assets/banner-bg.png"
        title='Team Details'
        />
        <VolunteerProfile member={member}/>
    </div>
  )
}

export default page

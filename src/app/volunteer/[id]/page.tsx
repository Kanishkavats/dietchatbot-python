import React from 'react'
import { teamMembers } from '@/src/staticResource'
import { VolunteerProfile } from '@/src/components/About'

const page = ({params}) => {
    const member = teamMembers.find(m => m.id.toString() === params.id);
  return (
    <div>
        <VolunteerProfile member={member}/>
    </div>
  )
}

export default page

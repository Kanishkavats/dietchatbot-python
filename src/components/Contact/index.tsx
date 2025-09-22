'use client'
import React from 'react'
import ContactUs from './ContactUs'
import PageBanner from '../common/PageBanner'
import { bannerBg } from '@/public/assets'

const Contact = () => {
    return (
        <div>
            <PageBanner bgImage={bannerBg} title="Contact Us" />
            <ContactUs />
        </div>
    )
}

export default Contact

'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '../common/Buttons/Button'
import Form from './Form'

const FeedbackForm = () => {
  const [showForm, setShowForm] = useState(false)
  const titleRef = useRef(null)
  const headingRef = useRef(null)
  const isInView = useInView(titleRef, { once: true, amount: 0.3 })
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 })
  return (
    <div 
      className="w-full min-h-[500px] relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/assets/banner-bg.png)'
      }}
    >
      {/* Green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green/50 to-transparent z-10"></div>
      
      {/* Title and Heading */}
      <div className="absolute top-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 text-white">
        <div className="mb-5" ref={titleRef}>
          <motion.p 
            className="text-yellow font-medium flex items-center gap-2 font-caveat text-2xl justify-center"
            initial={{ opacity: 0, transform: 'translateZ(0)' }}
            animate={isInView ? { opacity: 1, transform: 'translateZ(0)' } : { opacity: 0, transform: 'translateZ(0)' }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Icon icon="mdi:hand-heart" className="cursor-pointer" />
            Start Donating Poor People
          </motion.p>
        </div>
        
          <motion.h1 
            ref={headingRef}
            className="text-2xl md:text-5xl font-extrabold text-white leading-tight mt-5 font-nunito max-w-xl lg:max-w-2xl"
            initial={{ opacity: 0, transform: 'translateZ(0)' }}
            animate={isHeadingInView ? { opacity: 1, transform: 'translateZ(0)' } : { opacity: 0, transform: 'translateZ(0)' }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
                   Our Valuable <span className="text-yellow">Feedback,,</span> your opinion counts here.
          </motion.h1>
           <div className="mt-13 flex justify-center">
             <div className="w-fit">
               <Button 
                 text=" Send Feedback" 
                 onClick={() => setShowForm(true)}
               />
             </div>
           </div>
        </div>
      
      {/* Bottom decorative image with animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-3/5 h-[500px] z-10"
        animate={{
          y: [0, -11, 0],
          opacity: [1, 0.8, 1]
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity
        }}
      >
        <img 
          src="/assets/verticle-yellow-shape.png" 
          alt="Decorative shape"
          className="w-3/5 h-[500px] block"
        />
      </motion.div>

      {/* Feedback Form Modal */}
      {showForm && (
        <Form onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}

export default FeedbackForm

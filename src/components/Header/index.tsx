'use client'

import React from 'react';
import TopBar from './TopBar';
import InfoBar from './InfoBar';
import Navbar from './Navbar';

const Header = () => {
  return (
    <div>
      <TopBar />
      <div className='px-15'>
        <InfoBar />
        <Navbar />
      </div>

    </div>
  )
}

export default Header

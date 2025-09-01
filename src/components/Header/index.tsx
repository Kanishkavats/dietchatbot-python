'use client'

import React from 'react';
import TopBar from './TopBar';
import InfoBar from './InfoBar';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="w-full">
      <TopBar />
      <InfoBar />
      <Navbar />
    </header>
  )
}

export default Header

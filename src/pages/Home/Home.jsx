// src/pages/Home/Home.jsx

import React from 'react';
import Hero from '../../components/Hero/Hero';
import About from '../../components/HomeAbout/About';
import Features from '../../components/Features/Features';
import CallToAction from '../../components/CallToAction/CallToAction';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <CallToAction />
    </>
  );
}

export default Home;

// src/pages/Home/Home.jsx
import React from 'react';
import Hero from '../components/sections/Hero/Hero';
import Features from '../components/sections/Features/Features';
import ProjectsPreview from '../components/sections/ProjectsPreview/ProjectsPreview';
import Team from '../components/sections/Team/Team';
// import Testimonials from '../components/sections/Testimonials/Testimonials';
// import BlogPreview from '../components/sections/BlogPreview/BlogPreview';
// import CTA from '../components/sections/CTA/CTA';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Features/Services Section */}
      <section id="services" className="section-spacing">
        <Features />
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="section-spacing dark-bg">
        <ProjectsPreview />
      </section>

      {/* Team Section */}
      <section id="team" className="section-spacing">
        <Team />
      </section>

      {/* Testimonials */}
      {/* <section id="testimonials" className="section-spacing dark-bg">
        <Testimonials />
      </section> */}

      {/* Blog Preview */}
      {/* <section id="blog" className="section-spacing">
        <BlogPreview />
      </section> */}

      {/* Final CTA */}
      {/* <section id="contact">
        <CTA />
      </section> */}
    </div>
  );
};

export default Home;
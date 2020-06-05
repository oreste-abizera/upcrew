import React from 'react'
import Hero from '../components/HomePage/Hero'
import Services from '../components/HomePage/Services'
import Versions from '../components/HomePage/Versions'
import OurTeam from '../components/HomePage/OurTeam'

export default function HomePage() {
  return (
    <>
      <Hero></Hero>
      <Services></Services>
      <Versions></Versions>
      <OurTeam></OurTeam>
    </>
  );
}

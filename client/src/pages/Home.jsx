import React from 'react'
import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import PublicLayout from '../layouts/PublicLayout'


function Home() {
  return (
    <div className=' min-h-screen bg-[#09090f] text-white'>

      <PublicLayout>
        <Hero />
        <Services />
        <Features />
        <HowItWorks />
      </PublicLayout>
    </div>
  )
}

export default Home

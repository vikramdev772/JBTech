
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from '../utils/Navbar'
import LandingPage from '../pages/LandingPage'
import Footer from '../utils/Footer'

const router = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<LandingPage />} />
        
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default router

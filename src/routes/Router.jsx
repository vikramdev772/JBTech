
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from '../utils/Navbar'
import LandingPage from '../pages/LandingPage'
import Footer from '../utils/Footer'
import Signup from '../auth/Signup'
import Login from '../auth/Login'

const router = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
        
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default router

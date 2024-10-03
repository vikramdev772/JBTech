
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from '../utils/Navbar'
import LandingPage from '../pages/LandingPage'
import Footer from '../utils/Footer'
import Signup from '../auth/Signup'
import Login from '../auth/Login'
import Courses from '../pages/Courses'
import Explore from '../screens/Explore'
import Contact from '../pages/Contact'

const router = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/courses' element={<Courses/>}/>
    <Route path='/explore' element={<Explore/>}/>
    <Route path='/contact' element={<Contact/>}/>
        
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default router

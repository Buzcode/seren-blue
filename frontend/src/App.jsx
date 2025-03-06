import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navigation_bar from './components/Navigation_bar'
import FindAmbulancePage from './pages/FindAmbulancePage'
import Footer from './components/footer'
import Success from './components/Success'; // Import the new Success component
import Failed from './components/Failed';
import Cancel from './components/Cancel';   // Import the new Failed component


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navigation_bar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path="/find-ambulance" element={<FindAmbulancePage />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path="/payment/success" element={<Success />} /> 
        <Route path="/payment/failed" element={<Failed />} /> 
        <Route path="/payment/cancel" element={<Cancel />} />   
      </Routes>
      <Footer />
    </div>
  )
}


export default App
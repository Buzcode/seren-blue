import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Ambulance from '../pages/Ambulance' // Import the Ambulance component

const Home = () => {
  return (
    <div>
       <Header/>
       <SpecialityMenu/>
       <TopDoctors/>
       <div id="ambulance-section"> 
         <Ambulance/> 
       </div>
    </div>
  )
}

export default Home
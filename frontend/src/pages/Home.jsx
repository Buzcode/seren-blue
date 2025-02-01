 // src/pages/Home.jsx
 import React from 'react';
 import Header from '../components/Header';
 import SpecialityMenu from '../components/SpecialityMenu';
 import TopDoctors from '../components/TopDoctors';
 import Ambulance from './Ambulance';
 import DiagnosticCare from '../components/DiagnosticCare';
 import FAQ from '../pages/FAQ';


 const Home = () => {
     return (
         <div>
             <Header/>
             <SpecialityMenu/>
             <TopDoctors/>
             <div id="ambulance-section">
                 <Ambulance/>
             </div>
             <div className="mt-8"> 
               <DiagnosticCare />
             </div>
             <FAQ/>
        </div>

     );
 };

 export default Home;
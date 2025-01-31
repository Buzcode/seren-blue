 // src/pages/Home.jsx
 import React from 'react';
 import Header from '../components/Header';
 import SpecialityMenu from '../components/SpecialityMenu';
 import TopDoctors from '../components/TopDoctors';
 import Ambulance from './Ambulance';
 import DiagnosticCare from '../components/DiagnosticCare';


 const Home = () => {
     return (
         <div>
             <Header/>
             <SpecialityMenu/>
             <TopDoctors/>
             <div id="ambulance-section">
                 <Ambulance/>
             </div>
             <div className="mt-8"> {/** Added the mt-8 class here */}
               <DiagnosticCare />
             </div>
        </div>
     );
 };

 export default Home;
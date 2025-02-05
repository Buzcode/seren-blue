// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navigation_bar from './components/Navigation_bar';
import Footer from './components/Footer';
import ICUAmbulanceDetails from './pages/ICUAmbulanceDetails';
import FindAmbulancePage from './pages/FindAmbulancePage';
import DiagnosticTestsPage from './components/DiagnosticTestsPage';
import CenterDetailsPage from './components/CenterDetailsPage';
 import DiagnosticCare from './components/DiagnosticCare';

const App = () => {
    return (
        <div className='mx-4 sm:mx-[10%]'>
            <Navigation_bar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/doctors' element={<Doctors />} />
                   <Route path='/diagnostic-care' element={<DiagnosticCare />} />
                <Route path='/doctors/:speciality' element={<Doctors />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/MyProfile' element={<MyProfile />} />
                <Route path='/my-appointments' element={<MyAppointments />} />
                <Route path='/appointment/:docId' element={<Appointment />} />
                <Route path="/icu-ambulance" element={<ICUAmbulanceDetails />} />
                <Route path="/find-ambulance" element={<FindAmbulancePage />} />
                <Route path="/check-prices" element={<DiagnosticTestsPage />} />
                <Route path="/diagnostic-tests/:testCategory" element={<DiagnosticTestsPage />} />
                <Route path="/center-details/:centerName" element={<CenterDetailsPage />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
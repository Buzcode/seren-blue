// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppContextProvider from './context/AppContext'; // Import AppContextProvider

import RequireAuth from './components/RequireAuth';
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
import AcAmbulanceDetails from './pages/AcAmbulanceDetails';
import AirAmbulanceDetails from'./pages/AirAmbulanceDetails';
import FindAmbulancePage from './pages/FindAmbulancePage';
import DiagnosticTestsPage from './components/DiagnosticTestsPage';
import CenterDetailsPage from './components/CenterDetailsPage';
import DiagnosticCare from './components/DiagnosticCare';
import AdminPanelPage from './pages/AdminPanelPage';
import RegisterPage from './pages/RegisterPage';
// ADDED import for Reviews Page
import Reviews from './pages/Reviews';
import DoctorDashboard from './components/DoctorDashboard'; // Adjust path if necessary
import Success from './components/Success';
import Failed from './components/Failed';
import Cancel from './components/Cancel';
//import { AuthProvider } from './context/AuthContext';



const App = () => {
    return (
        <AuthProvider>
            <AppContextProvider>
            <div className='mx-4 sm:mx-[10%]'>
                <Navigation_bar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/doctors' element={<Doctors />} />
                    <Route path='/diagnostic-care' element={<DiagnosticCare />} />
                    <Route path='/doctors/:speciality' element={<Doctors />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<RegisterPage />} />
                    {/* ADDED route for Reviews Page */}
                    <Route path='/reviews' element={<Reviews />} />

                    <Route path="/payment/success" element={<Success />} />
                    <Route path="/payment/fail" element={<Failed />} />
                    <Route path="/payment/cancel" element={<Cancel />} />

                    {/* PROTECT ADMIN PANEL ROUTE */}
                    <Route path='/admin-panel' element={
                        <RequireAuth requiredRole="admin">
                            <AdminPanelPage />
                        </RequireAuth>
                    } />

                     

                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/MyProfile' element={<MyProfile />} />
                    <Route path='/my-appointments' element={<MyAppointments />} />
                    <Route path='/appointment/:docId' element={<Appointment />} />
                    <Route path="/icu-ambulance" element={<ICUAmbulanceDetails />} />
                    <Route path="/ac-ambulance" element={<AcAmbulanceDetails />} />
                    <Route path="/air-ambulance" element={<AirAmbulanceDetails />} />
                    <Route path="/find-ambulance" element={<FindAmbulancePage />} />
                    <Route path="/check-prices" element={<DiagnosticTestsPage />} />
                    <Route path="/diagnostic-tests/:testCategory" element={<DiagnosticTestsPage />} />
                    <Route path="/center-details/:centerName" element={<CenterDetailsPage />} />
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    
                </Routes>
                <Footer />
            </div>
            </AppContextProvider>
        </AuthProvider>
    );
};

export default App;
import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Ambulance = () => {
    return (
        <div className="bg-sky-100 py-8 px-4 font-sans rounded-md"> {/* Changed background color to sky-100 (lighter sky blue) */}
            <div className="mb-8">
                <h2 className="text-2xl text-gray-800 font-semibold">We are ready to help at your emergency</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="relative"> {/* Added relative positioning for background section */}
                    <div className="absolute inset-0 bg-sky-200 rounded-lg -m-2"></div> {/* Background section behind card */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-200 relative"> {/* Kept card white and added relative positioning */}
                        <img src={assets.ac_ambulance} alt="AC Ambulance" className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl text-gray-800 font-semibold mb-3">AC Ambulance</h3>
                        <ul className="list-none p-0 m-0">
                            <li className="mb-2 flex items-center text-gray-700"><i className="mr-1 text-green-500">✓</i> Get ambulance within 30 minutes*</li>
                            <li className="mb-2 flex items-center text-gray-700"><i className="mr-1 text-green-500">✓</i> 24/7 affordable quality service</li>
                            <li className="mb-2 flex items-center text-gray-700"><i className="mr-1 text-green-500">✓</i> We are just a call away: <span className="font-bold text-blue-500">01405600700</span></li>
                        </ul>
                    </div>
                </div>

                {/*  CRITICAL: RE-VERIFY THIS LINK SECTION */}
                <Link to="/icu-ambulance" className="relative"> {/* Added relative positioning for background section */}
                    <div className="absolute inset-0 bg-sky-200 rounded-lg -m-2"></div> {/* Background section behind card */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-200 cursor-pointer relative"> {/* Kept card white and added relative positioning */}
                        <img src={assets.icu_ambulance} alt="ICU Ambulance" className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl text-gray-800 font-semibold mb-3">ICU Ambulance</h3>
                        <ul className="list-none p-0 m-0">
                            <li className="mb-2 flex items-center text-gray-700"><i className="mr-1 text-green-500">✓</i> Get ambulance within 30 minutes*</li>
                            <li className="mb-2 flex items-center text-gray-700"><i className="mr-1 text-green-500">✓</i> 24/7 affordable quality service</li>
                            <li className="mb-2 flex items-center text-gray-700"><i className="mr-1 text-green-500">✓</i> We are just a call away: <span className="font-bold text-blue-500">01405600700</span></li>
                        </ul>
                    </div>
                </Link>

                <div className="relative"> {/* Added relative positioning for background section */}
                    <div className="absolute inset-0 bg-sky-200 rounded-lg -m-2"></div> {/* Background section behind card */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-200 relative"> {/* Kept card white and added relative positioning */}
                        <img src={assets.air_ambulance} alt="AIR Ambulance" className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl text-gray-800 font-semibold mb-3">AIR Ambulance</h3>
                        <ul className="list-none p-0 m-0">
                            <li className="mb-2 flex items-center text-gray-700"><i className="mr-1 text-green-500">✓</i> Get ambulance within 60 minutes*</li>
                            <li className="mb-2 flex items-center text-gray-700"><i className="mr-1 text-green-500">✓</i> 24/7 affordable quality service</li>
                            <li className="mb-2 flex items-center text-gray-700"><i className="mr-1 text-green-500">✓</i> We are just a call away: <span className="font-bold text-blue-500">01405600700</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ambulance;
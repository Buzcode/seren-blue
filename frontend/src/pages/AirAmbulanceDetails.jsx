import React from 'react';
import { assets } from '../assets/assets';

const AirAmbulanceDetails = () => {
    return (
        <div className="font-sans bg-sky-50"> {/* Kept overall background color to sky-50 */}
            {/* Ambulance Service Banner Section */}
            <div className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden" style={{ backgroundImage: `url(${assets.ambulance_highway})` }}> {/* Banner section remains rounded and overflow hidden */}
                <div className="absolute inset-0 bg-black opacity-70 rounded-lg"></div> {/* Dark gray overlay remains */}
                <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-10 md:p-20">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Ambulance Service</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6">Rent a <span className="text-primary">Prompt, High quality, <br />Emergency</span> Ambulance at your need</h2>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <i className="mr-2 text-green-500">✓</i>
                            <span>Best Price, Quality Service, On-Time Gurantee</span>
                        </li>
                        <li className="flex items-center">
                            <i className="mr-2 text-green-500">✓</i>
                            <span>Trusted, Certified & Skilled Driver</span>
                        </li>
                        <li className="flex items-center">
                            <i className="mr-2 text-green-500">✓</i>
                            <span>Hotline: <span className="font-bold">01405 600 700</span></span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* AIR Ambulance Service Content Section */}
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-md"> {/* Left section background remains white and rounded */}
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">AIR Ambulance Service</h2>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <img src={assets.air_ambulance} alt="AIR Ambulance" className="rounded-lg" />
                        <img src={assets.air_ambulance2} alt="AIR Ambulance 2" className="rounded-lg" />
                        <img src={assets.air_ambulance3} alt="AIR Ambulance 3" className="rounded-lg" />
                    </div>
                    <p className="text-gray-700 mb-6">
                        Our Air Ambulance service provides rapid and long-distance medical transportation for patients in critical conditions or remote locations where ground transport is not feasible or timely. Equipped with advanced medical equipment and staffed by highly trained medical professionals, our air ambulances ensure patients receive immediate and continuous care during transit. Air ambulances are crucial for emergencies requiring quick transfer to specialized medical facilities, organ transport, and reaching patients in geographically challenging areas. We prioritize speed, safety, and advanced medical support to deliver the highest quality of care during air medical evacuations.
                    </p>
                    <ul className="mb-8 space-y-2">
                        <li className="flex items-center">
                            <i className="mr-2 text-green-500">✓</i>
                            <span>Get ambulance within 60 minutes*</span>
                        </li>
                        <li className="flex items-center">
                            <i className="mr-2 text-green-500">✓</i>
                            <span>24/7 affordable quality service</span>
                        </li>
                        <li className="flex items-center">
                            <i className="mr-2 text-green-500">✓</i>
                            <span>We are just a call away: <span className="font-bold">01405600700</span></span>
                        </li>
                    </ul>
                    <button className="bg-sky-200 hover:bg-sky-300 text-black font-normal py-3 px-4 rounded focus:outline-none focus:shadow-outline"> {/* Button styles remain same */}
                        View All Ambulances
                    </button>
                </div>

                {/* Request an AIR Ambulance Form Section */}
                <div className="bg-sky-100 p-6 rounded-lg shadow-md"> {/* Form background remains sky-100 */}
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Request an AIR Ambulance</h3>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="fromLocation" className="block text-gray-700 text-sm font-bold mb-2">From</label>
                            <input type="text" id="fromLocation" placeholder="Example- Dhaka" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label htmlFor="destinationLocation" className="block text-gray-700 text-sm font-bold mb-2">Destination</label>
                            <input type="text" id="destinationLocation" placeholder="Example- Khulna" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="doctorNeeded" className="mr-2" />
                            <label htmlFor="doctorNeeded" className="text-gray-700">I need a doctor</label>
                        </div>
                        <div>
                            <input type="date" placeholder="mm/dd/yyyy" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="roundTrip" className="mr-2" />
                            <label htmlFor="roundTrip" className="text-gray-700">I need a round trip</label>
                        </div>
                        <div>
                            <input type="text" placeholder="Your Name" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-700">+880</span>
                                </div>
                                <input type="tel" placeholder="" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-12" />
                            </div>
                        </div>
                        <button type="submit" className="bg-sky-200 hover:bg-sky-300 text-black font-normal py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"> {/* Button styles remain same */}
                            Send Ambulance Request
                        </button>
                    </form>
                    <p className="text-gray-600 text-sm mt-2">One of our agent will get back to you within 30 minutes with the update of the ambulance.</p>
                </div>
            </div>
        </div>
    );
};

export default AirAmbulanceDetails;
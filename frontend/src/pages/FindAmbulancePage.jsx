import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import for useNavigate

const FindAmbulancePage = () => {
    // State variables to manage form input values
    const [ambulanceType, setAmbulanceType] = useState('');
    const [fromLocation, setFromLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [doctorNeeded, setDoctorNeeded] = useState(false);
    const [bookingDate, setBookingDate] = useState('');
    const [roundTrip, setRoundTrip] = useState(false);
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const navigate = useNavigate(); // **Corrected variable name: useNavigate (not useNavigate2)**

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            ambulanceType,
            fromLocation,
            destination: destinationLocation,
            needDoctor: doctorNeeded,
            bookingDate, // You might need to format the date appropriately for your backend
            needRoundTrip: roundTrip,
            patientName,
            patientPhone,
        };

        try {
            const response = await axios.post('/api/ambulance/request', formData);
            console.log("Ambulance request submitted:", response.data);

            if (response.data.bookingId) {
                navigate(`/ambulance/confirm/${response.data.bookingId}`);
            } else {
                alert("Ambulance request submitted, but booking ID not received. Please contact support.");
            }

        } catch (error) {
            console.error("Error submitting ambulance request:", error);
            alert("Failed to submit ambulance request. Please check your details and try again.");
        }
    };

    return (
        <div className="font-sans bg-sky-50">

            <div className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden" style={{ backgroundImage: `url(${assets.ambulance_highway})` }}>
                <div className="absolute inset-0 bg-black opacity-70 rounded-lg"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-10 md:p-20">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Ambulance Service</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6">Book the right <span className="text-primary">Ambulance</span> for your needs</h2>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <i className="mr-2 text-green-500">✓</i>
                            <span>Wide range of Ambulance Services</span>
                        </li>
                        <li className="flex items-center">
                            <i className="mr-2 text-green-500">✓</i>
                            <span>Fast and Reliable Service</span>
                        </li>
                        <li className="flex items-center">
                            <i className="mr-2 text-green-500">✓</i>
                            <span>Hotline: <span className="font-bold">01405 600 700</span></span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Ambulance Services Content Sections */}
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {/* AC Ambulance Service Section */}
                    <div className="bg-white rounded-lg p-6 shadow-md mb-8">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">AC Ambulance Service</h2>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <img src={assets.ac_ambulance} alt="AC Ambulance" className="rounded-lg" />
                            <img src={assets.ac_ambulance2} alt="AC Ambulance 2" className="rounded-lg" />
                            <img src={assets.ac_ambulance3} alt="AC Ambulance 3" className="rounded-lg" />
                        </div>
                        <p className="text-gray-700 mb-6">
                            AC ambulances are also called Basic Life Support Ambulance, which are primarily used for transporting patients who are medically stable and do not require constant monitoring. AC Ambulance equipped with general equipment like oxygen, stethoscope, and equipment to check the blood pressure, etc. This ambulance is best for the transfer of patients in nearby areas. Basic ambulance is very much used for transferring patients especially to outstation, like from one district to another in Bangladesh. We are one of the most reputed and committed AC Ambulance providers in Dhaka. We take this opportunity to introduce ourselves as one of the quickest AC Ambulance providers.
                        </p>
                        <ul className="mb-8 space-y-2">
                            <li className="flex items-center">
                                <i className="mr-2 text-green-500">✓</i>
                                <span>Get ambulance within 30 minutes*</span>
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
                    </div>

                    {/* ACLS/ICU Ambulance Service Section */}
                    <div className="bg-white rounded-lg p-6 shadow-md mb-8">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">ICU/ACLS Ambulance Service</h2>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <img src={assets.icu_ambulance} alt="ICU Ambulance" className="rounded-lg" />
                            <img src={assets.icu_ambulance2} alt="ICU Ambulance 2" className="rounded-lg" />
                            <img src={assets.icu_ambulance3} alt="ICU Ambulance 3" className="rounded-lg" />
                        </div>
                        <p className="text-gray-700 mb-6">
                            The assignment of the ACLS emergency vehicle is to carry patients who are extremely harmed or enduring a heart assault, cardiac capture, asthma assault, stroke, respiratory disappointment, serious dying, obviousness, seizures, burn harm, harming, head damage, polytrauma, pregnancy, diabetic crisis, etc. Our ACLS rescue vehicle is prepared with a biphasic defibrillator, ventilator gadget, volumetric implantation, syringe pumps, and oxygen barrel. The completely programmed vehicle suspension framework guarantees an understanding of consolation and security for the continuous. We are prepared to serve the patients beneath perception till the time they are conceded to the adjacent clinics. Our restorative specialists (e.g. specialists, paramedics, ACLS pros) analyze the patients for basic conditions.
                        </p>
                        <ul className="mb-8 space-y-2">
                            <li className="flex items-center">
                                <i className="mr-2 text-green-500">✓</i>
                                <span>Get ambulance within 30 minutes*</span>
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
                    </div>

                    {/* AIR Ambulance Service Section */}
                    <div className="bg-white rounded-lg p-6 shadow-md mb-8">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">AIR Ambulance Service</h2>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <img src={assets.air_ambulance} alt="AIR Ambulance" className="rounded-lg" />
                            <img src={assets.air_ambulance2} alt="AIR Ambulance 2" className="rounded-lg" />
                            <img src={assets.air_ambulance3} alt="AIR Ambulance 3" className="rounded-lg" />
                        </div>
                        <p className="text-gray-700 mb-6">
                            Air ambulance service is a crucial component of modern healthcare, offering rapid medical transportation for patients in critical conditions over long distances. These specialized aircraft are equipped with advanced medical equipment and staffed by trained professionals, effectively functioning as flying intensive care units. Air ambulances are vital in emergencies where ground transportation is too slow or impractical, such as in remote areas, over long distances, or in heavy traffic. They ensure that patients receive timely medical attention, significantly improving outcomes in serious medical situations like heart attacks, strokes, trauma, and organ transplants. Air ambulance services bridge geographical barriers, providing swift access to specialized medical care and saving lives by দ্রুত reducing transit time to appropriate medical facilities.
                        </p>
                        <ul className="mb-8 space-y-2">
                            <li className="flex items-center">
                                <i className="mr-2 text-green-500">✓</i>
                                <span>Get ambulance within shortest possible time</span>
                            </li>
                            <li className="flex items-center">
                                <i className="mr-2 text-green-500">✓</i>
                                <span>24/7 service availability</span>
                            </li>
                            <li className="flex items-center">
                                <i className="mr-2 text-green-500">✓</i>
                                <span>Contact us for quick arrangement: <span className="font-bold">01405600700</span></span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Request an Ambulance Form Section */}
                <div className="bg-sky-100 p-4 rounded-lg shadow-md h-fit">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Request an Ambulance</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="ambulanceType" className="block text-gray-700 text-sm font-bold mb-2">Ambulance Type</label>
                            <select
                                id="ambulanceType"
                                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={ambulanceType}
                                onChange={(e) => setAmbulanceType(e.target.value)}
                            >
                                <option value="">Select Ambulance Type</option>
                                <option value="ac">AC Ambulance</option>
                                <option value="icu">ICU Ambulance</option>
                                <option value="air">AIR Ambulance</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fromLocation" className="block text-gray-700 text-sm font-bold mb-2">From</label>
                            <input
                                type="text"
                                id="fromLocation"
                                placeholder="Example- Dhaka"
                                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={fromLocation}
                                onChange={(e) => setFromLocation(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="destinationLocation" className="block text-gray-700 text-sm font-bold mb-2">Destination</label>
                            <input
                                type="text"
                                id="destinationLocation"
                                placeholder="Example- Khulna"
                                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={destinationLocation}
                                onChange={(e) => setDestinationLocation(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="doctorNeeded"
                                className="mr-2"
                                checked={doctorNeeded}
                                onChange={(e) => setDoctorNeeded(e.target.checked)}
                            />
                            <label htmlFor="doctorNeeded" className="text-gray-700">I need a doctor</label>
                        </div>
                        <div>
                            <input
                                type="date"
                                placeholder="mm/dd/yyyy"
                                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="roundTrip"
                                className="mr-2"
                                checked={roundTrip}
                                onChange={(e) => setRoundTrip(e.target.checked)}
                            />
                            <label htmlFor="roundTrip" className="text-gray-700">I need a round trip</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-700">+880</span>
                                </div>
                                <input
                                    type="tel"
                                    placeholder=""
                                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-12"
                                    value={patientPhone}
                                    onChange={(e) => setPatientPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="bg-sky-200 hover:bg-sky-300 text-black font-normal py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            Send Ambulance Request
                        </button>
                    </form>
                    <p className="text-gray-600 text-sm mt-2">One of our agent will get back to you within 30 minutes with the update of the ambulance.</p>
                </div>
            </div>
        </div>
    );
};

export default FindAmbulancePage;
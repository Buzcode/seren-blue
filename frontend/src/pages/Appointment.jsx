import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoInformationCircleSharp } from 'react-icons/io5';

const Appointment = () => {
    const { docId } = useParams();
    const { currencySymbol } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [relatedDoctors, setRelatedDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { bookAppointment } = useContext(AppContext);
    const [doctorAvailability, setDoctorAvailability] = useState(null); // NEW: State for doctor availability

    const fetchDocInfo = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/doctor-dashboard/doctors/${docId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDocInfo(data);
            setDoctorAvailability(data.availability); // NEW: Set doctor availability from API response
        } catch (e) {
            console.error("Error fetching doctor profile:", e);
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const getRelatedDoctors = async () => {
        if (docInfo) {
            setRelatedDoctors([]); // Placeholder for dynamic related doctors
        }
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);
        let today = new Date();
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(
                    currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
                );
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }
            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                });
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                });
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            setDocSlots((prev) => [...prev, timeSlots]);
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [docId]);

    useEffect(() => {
        getRelatedDoctors();
    }, [docInfo]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    useEffect(() => {
        if (selectedDateIndex != null && selectedTime) {
            const selectedDate = new Date();
            selectedDate.setDate(selectedDate.getDate() + selectedDateIndex);
            const appointment = {
                date: selectedDate.toLocaleDateString([], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                time: selectedTime,
                doctor: docInfo,
            };
            setAppointmentDetails(appointment);
        } else {
            setAppointmentDetails(null);
        }
    }, [selectedDateIndex, selectedTime, docInfo]);

    const handleBookAppointment = () => {
        if (appointmentDetails) {
            bookAppointment(appointmentDetails);
            alert("Appointment Booked Successfully!");
        } else {
            alert("Please select both a date and a time before booking");
        }
    };

    const dayNameMap = {
        0: 'sunday',
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday'
    };

    const handleDayClick = (dayIndex) => {
        // const selectedDayName = daysOfWeek[dayIndex].toLowerCase(); // OLD - using short day name 'mon', 'tue'
        const selectedDayName = dayNameMap[dayIndex]; // NEW - using full day name 'monday', 'tuesday'
        const availabilityMessageDiv = document.getElementById(`${daysOfWeek[dayIndex].toLowerCase()}-availability`); // Keep using short day name for ID

        console.log("Clicked day:", selectedDayName);
        console.log("doctorAvailability:", doctorAvailability);
        console.log(`doctorAvailability[${selectedDayName}]:`, doctorAvailability ? doctorAvailability[selectedDayName] : 'doctorAvailability is null');

        if (doctorAvailability && doctorAvailability[selectedDayName] === false) {
            console.log("Doctor is UNAVAILABLE on", selectedDayName);
            availabilityMessageDiv.textContent = "Dr. not available on this day!";
            availabilityMessageDiv.style.color = "red";
            setSelectedDateIndex(null);
        } else {
            console.log("Doctor is AVAILABLE on", selectedDayName);
            availabilityMessageDiv.textContent = "";
            setSelectedDateIndex(selectedDateIndex === dayIndex ? null : dayIndex);
        }
    };


    if (loading) {
        return <p>Loading doctor profile...</p>;
    }

    if (error) {
        return <p>Error loading doctor profile: {error.message}</p>;
    }

    return (
        docInfo && (
            <div>
                {/*......Doctor Details.......*/}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                        <img
                            className="bg-primary w-full sm:max-w-72 rounded-1g"
                            src={assets[docInfo.profilePicture]}
                            alt={docInfo.displayName}
                        />
                    </div>

                    <div className="flex-1 border border-gray-400 rounded-1g p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                        {/*..... Doc Info : name, degree, experience.....*/}
                        <p className="flex items-center gap-2 text-2x1 font-medium  text-gray-900">
                            {docInfo.displayName}
                            <AiFillCheckCircle className='w-5 h-5 text-primary' />
                        </p>
                        <div className="flex items-center gap-2 text-sm mt-1  text-gray-600">
                            <p>
                                {docInfo.degree} - {docInfo.specialization}
                            </p>
                            <button className="py-0.5 px-2 border text-xs rounded-full">
                                {docInfo.experience}
                            </button>
                        </div>

                        {/*........Doctor About........*/}
                        <div>
                            <p className="flex items-center gap-1 text-sm font-medium  text-gray-900 mt-3">
                                About <IoInformationCircleSharp className='w-4 h-4' />
                            </p>
                            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                                {docInfo.about}
                            </p>
                        </div>
                        <p className="text-gray-500 font-medium mt-4">
                            Appointment fee:
                            <span className="text-gray-600">
                                {currencySymbol}
                                {docInfo.fees}
                            </span>
                        </p>
                    </div>
                </div>
                {/*......Booking Slots........*/}
                <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
                    <p>Booking slots</p>
                    <div className="flex gap-2 mt-2">
                        {docSlots.map((daySlots, index) => (
                            <div key={index}>
                                <div
                                    className={`rounded-full py-2 px-4 ${selectedDateIndex === index
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-200 cursor-pointer'
                                        }`}
                                    onClick={() => handleDayClick(index)}
                                >
                                    {daysOfWeek[index]}
                                </div>
                                <div className="availability-message" id={`${daysOfWeek[index].toLowerCase()}-availability`}></div> {/* Availability message div */}

                                {selectedDateIndex === index && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {daySlots.map((slot) => (
                                            <button
                                                key={slot.time}
                                                className={`rounded-md border px-2 py-1 ${selectedTime === slot.time
                                                    ? 'bg-primary text-white'
                                                    : ''
                                                    }`}
                                                onClick={() => setSelectedTime(slot.time)}
                                            >
                                                {slot.time}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/*......Book Appointment Button.......*/}
                    <button
                        onClick={handleBookAppointment}
                        className="bg-primary text-white py-2 px-4 mt-4 rounded-md"
                    >
                        Book an appointment
                    </button>
                </div>

                {/*........ Related Doctors........*/}
                <div className='mt-8 text-gray-700'>
                    <h3 className='font-bold text-2xl mt-8'>Related Doctors</h3>
                    <p className='font-medium mt-1'>Simply browse through our extensive list of trusted doctors.</p>

                    <div className='flex gap-5 mt-5 flex-wrap'>
                        {relatedDoctors.map((doc) => (
                            <Link key={doc._id} to={`/appointment/${doc._id}`} className='rounded-1g border p-2 bg-white'>
                                <img src={doc.image} alt={doc.name} className='w-32 h-32 object-cover rounded-1g' />
                                <div className='mt-2 px-1'>
                                    <p className='text-sm text-gray-600'> <span className='bg-green-100 text-green-500 text-[10px] font-medium px-1 rounded-md'>● Available </span> </p>
                                    <p className='font-medium text-gray-800 mt-1'>{doc.name}</p>
                                    <p className='text-sm text-gray-500'>{doc.speciality}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
};

export default Appointment;
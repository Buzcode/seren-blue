import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AmbulanceConfirmationPage = () => {
    const { bookingId } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const apiUrl = `${API_BASE_URL}/ambulance/booking/${bookingId}`;
                console.log("Fetching booking details from API:", apiUrl);

                const response = await axios.get(apiUrl);
                setBookingDetails(response.data.booking); // <---- CORRECTED: Access response.data.booking
                console.log("Booking details fetched successfully:", response.data);


            } catch (error) {
                console.error("Error fetching booking details:", error);
                alert("Failed to load booking details. Please try again later.");
            }
        };

        fetchBookingDetails();
    }, [bookingId, API_BASE_URL]);


    if (!bookingDetails) {
        return <div>Loading booking details...</div>;
    }

    const handleProceedToPayment = async () => {
        try {
            const paymentInitiateUrl = `${API_BASE_URL}/ambulance/payment/initiate`;
            const response = await axios.post(paymentInitiateUrl, { bookingId: bookingId });

            if (response.data && response.data.gatewayURL) {
                window.location.href = response.data.gatewayURL;
            } else {
                alert("Payment initiation failed. Please try again.");
                console.error("Payment initiation response:", response.data);
            }
        } catch (error) {
            console.error("Error initiating payment:", error);
            alert("Failed to initiate payment. Please try again later.");
        }
    };

    return (
        <div className="font-sans bg-sky-50 p-10">
            <div className="bg-white rounded-lg p-8 shadow-md max-w-lg mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Confirm Your Ambulance Booking</h2>

                <div className="mb-6">
                    <p className="text-gray-700">Booking ID: <span className="font-semibold">{bookingDetails._id}</span></p>
                    <p className="text-gray-700">Ambulance Type: <span className="font-semibold">{bookingDetails.ambulanceType}</span></p>
                    <p className="text-gray-700">From: <span className="font-semibold">{bookingDetails.fromLocation}</span></p>
                    <p className="text-gray-700">Destination: <span className="font-semibold">{bookingDetails.destination}</span></p>
                    <p className="text-gray-700">Need Doctor: <span className="font-semibold">{bookingDetails.needDoctor ? 'Yes' : 'No'}</span></p>
                    <p className="text-gray-700">Booking Date: <span className="font-semibold">{bookingDetails.bookingDate ? new Date(bookingDetails.bookingDate).toLocaleDateString() : 'Invalid Date'}</span></p>
                    <p className="text-gray-700">Round Trip: <span className="font-semibold">{bookingDetails.needRoundTrip ? 'Yes' : 'No'}</span></p>
                    <p className="text-gray-700">Patient Name: <span className="font-semibold">{bookingDetails.patientName}</span></p>
                    <p className="text-gray-700">Patient Phone: <span className="font-semibold">{bookingDetails.patientPhone}</span></p>
                </div>

                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleProceedToPayment}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default AmbulanceConfirmationPage;
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function Success() {
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get('bookingId');

    return (
        <div className="font-sans bg-sky-50 p-10">
            <div className="bg-white rounded-lg p-8 shadow-md max-w-lg mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-6 text-green-600">Payment Successful!</h2>
                <p className="text-gray-700 mb-4">
                    Thank you for your payment. Your ambulance booking
                    {bookingId && ` (Booking ID: ${bookingId})`} has been confirmed.
                </p>
                <p className="text-gray-700 mb-6">
                    You will be contacted shortly regarding your ambulance service.
                </p>
                <Link to="/" className="bg-sky-200 hover:bg-sky-300 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Go to Home Page
                </Link>
            </div>
        </div>
    );
}

export default Success;
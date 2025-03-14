import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function Failed() {
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get('bookingId');
    const error = searchParams.get('error');

    return (
        <div className="font-sans bg-sky-50 p-10">
            <div className="bg-white rounded-lg p-8 shadow-md max-w-lg mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-6 text-red-600">Payment Failed</h2>
                <p className="text-gray-700 mb-4">
                    Sorry, your payment for ambulance booking
                    {bookingId && ` (Booking ID: ${bookingId})`} was not successful.
                </p>
                {error && <p className="text-red-500 mb-4">Error details: {error}</p>}
                <p className="text-gray-700 mb-6">
                    Please try again or contact support if the issue persists.
                </p>
                <div className="space-x-4">
                    <Link to={`/ambulance/confirm/${bookingId}`} className="bg-sky-200 hover:bg-sky-300 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Retry Payment
                    </Link>
                    <Link to="/contact" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Failed;
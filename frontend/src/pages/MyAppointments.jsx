// frontend/src/pages/MyAppointments.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from 'uuid'; // Import UUID

const MyAppointments = () => {
    const { appointments, setAppointments, user } = useContext(AppContext); // Get appointments and user

    if (!setAppointments) {
        console.error("setAppointments is not defined in the AppContext!");
        return <p>Error: Could not load appointments.  Contact support.</p>; // Or some other error handling
    }

    // Handle payment function
    const handlePayment = async (item) => { // Pass the appointment item
        const { doctor } = item;
        const amount = doctor.fee; // Get the doctor's fee from the item
        const doctorId = doctor._id; // Get doctor ID from appointment item.doctor

        // Check if user is available before accessing properties
        if (!user) {
            console.error("User data is not available. Payment cannot be initiated.");
            alert("User data is not available. Please refresh the page or try again later.");
            return; // Exit the function if user is undefined
        }

        const customerName = user.name;   // Get from user context
        const customerEmail = user.email;   // Get from user context
        const customerPhone = user.phone; // Get from user context
        const userId = user._id; // get user ID from user context

        const transactionId = uuidv4(); // Generate a unique transaction ID

        try {
            const response = await fetch("http://localhost:5001/api/payment/initiate-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: amount,
                    customerName: customerName,
                    customerEmail: customerEmail,
                    customerPhone: customerPhone,
                    doctorId: doctorId,
                    userId: userId,
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; // Redirect to SSLCommerz payment page
            } else {
                console.error("Payment initiation failed:", data);
                alert("Payment initiation failed.  See console for details.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment initiation failed.  Check console for errors.");
        }
    };

    // Handle appointment cancellation
    const handleCancel = (index) => {
        const updatedAppointments = [...appointments];
        updatedAppointments.splice(index, 1); // Remove appointment from array
        setAppointments(updatedAppointments);
    };

    return (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
                My Appointments
            </p>
            <div>
                {appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
                            <div>
                                <img className="w-32 bg-indigo-50" src={item.doctor.image} alt="" />
                            </div>
                            <div className="flex-1 text-sm text-zinc-600">
                                <p className="text-neutral-800 font-semibold">{item.doctor.name}</p>
                                <p>{item.doctor.speciality}</p>
                                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                                <p className="text-xs">{item.doctor.address?.line1 || "N/A"}</p>
                                <p className="text-xs">{item.doctor.address?.line2 || "N/A"}</p>
                                <p className="text-xs mt-1">
                                    <span className="text-sm text-neutral-700 font-medium">Date & Time:</span> {item.date} | {item.time}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 justify-end">
                                <button
                                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                                    onClick={() => handlePayment(item)} // Pass the entire item
                                >
                                    Pay Online
                                </button>
                                <button
                                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                                    onClick={() => handleCancel(index)}
                                >
                                    Cancel Appointment
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">No Appointments Booked</p>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
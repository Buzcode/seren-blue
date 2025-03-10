// frontend/src/components/DoctorDashboard.js
import React, { useState, useEffect } from 'react';

const DoctorDashboard = () => {
    // State variables to hold doctor profile, availability, and patient limit
    const [doctorProfile, setDoctorProfile] = useState(null);
    const [availability, setAvailability] = useState({ // Default availability: all days true
        monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true
    });
    const [patientLimit, setPatientLimit] = useState(10); // Default patient limit: 10
    const [loading, setLoading] = useState(true); // Loading state, initially true
    const [error, setError] = useState(null);     // Error state, initially null

    // **Get doctorId from localStorage - Assuming you are storing it after login**
    const doctorId = localStorage.getItem('doctorId');

    useEffect(() => {
        console.log("DoctorDashboard useEffect - RUNNING"); // ADD THIS LOG - Start of useEffect
        let isMounted = true; // Add a flag to prevent state updates on unmounted component

        const fetchDoctorProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const currentDoctorId = localStorage.getItem('doctorId'); // Get doctorId inside the effect
                console.log("DoctorDashboard useEffect - doctorId from localStorage:", currentDoctorId); // ADD THIS LOG - doctorId value

                if (!currentDoctorId) {
                    setError(new Error("doctorId not found. Please login as a doctor."));
                    setLoading(false);
                    console.log("DoctorDashboard useEffect - doctorId NOT FOUND, exiting"); // ADD THIS LOG - doctorId missing
                    return;
                }
                // CORRECTED FETCH URL - ENSURE PORT 5001 AND /api PREFIX
                const response = await fetch(`http://localhost:5001/api/doctor-dashboard/doctors/${currentDoctorId}`);
                if (!response.ok) {
                    const message = `HTTP error! status: ${response.status}`;
                    setError(new Error(message));
                    throw new Error(message);
                }
                const data = await response.json();
                if (isMounted) { // Check if component is still mounted before updating state
                    setDoctorProfile(data);
                    setAvailability(data.availability || availability); // Keep default if API doesn't return
                    setPatientLimit(data.patientLimit || patientLimit);   // Keep default if API doesn't return
                }
            } catch (error) {
                console.error("DoctorDashboard useEffect - Error fetching doctor profile:", error);
                setError(error);
            } finally {
                if (isMounted) { // Check if component is still mounted before updating state
                    setLoading(false);
                    console.log("DoctorDashboard useEffect - FETCH COMPLETE, loading set to false"); // ADD THIS LOG - Fetch complete
                }
            }
        };

        if (doctorId) {
            fetchDoctorProfile();
        } else {
            console.log("DoctorDashboard useEffect - doctorId is initially NULL or UNDEFINED"); // ADD THIS LOG - doctorId initial null
        }
        console.log("DoctorDashboard useEffect - FINISHED SETUP"); // ADD THIS LOG - End of useEffect setup

        return () => { // Cleanup function to set isMounted to false when component unmounts
            isMounted = false;
        };

    }, [doctorId]); // Dependency array - ONLY doctorId

    const handleAvailabilityChange = async (day, isAvailable) => {
        const updatedAvailability = { ...availability, [day]: isAvailable };
        setAvailability(updatedAvailability); // Optimistically update state immediately

        try {
            // CORRECTED FETCH URL - ENSURE PORT 5001 AND /api PREFIX
            const response = await fetch(`http://localhost:5001/api/doctor-dashboard/doctors/${doctorId}/availability`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ availability: updatedAvailability }),
            });
            if (!response.ok) {
                const message = `HTTP error! status: ${response.status}`;
                setError(new Error(message));
                throw new Error(message);
            }
            // Optionally, handle success response if needed
            console.log("Availability updated successfully in backend");
        } catch (error) {
            console.error("Error updating availability:", error);
            setError(error); // Set error state
            // Optionally, revert state on error if you don't want optimistic updates:
            // setAvailability(availability);
        }
    };

    const handlePatientLimitChange = async (event) => {
        const newPatientLimit = parseInt(event.target.value, 10);
        setPatientLimit(newPatientLimit); // Optimistically update state

        try {
            // CORRECTED FETCH URL - ENSURE PORT 5001 AND /api PREFIX
            const response = await fetch(`http://localhost:5001/api/doctor-dashboard/doctors/${doctorId}/patientLimit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patientLimit: newPatientLimit }),
            });
            if (!response.ok) {
                const message = `HTTP error! status: ${response.status}`;
                setError(new Error(message));
                throw new Error(message);
            }
            // Optionally, handle success response if needed
            console.log("Patient limit updated successfully in backend");
        } catch (error) {
            console.error("Error updating patient limit:", error);
            setError(error); // Set error state
            // Optionally revert state: setPatientLimit(patientLimit);
        }
    };

    // Simplified rendering for debugging
    return (
        <div>
            <h1>Doctor Dashboard</h1>
            {loading && <p>Loading Doctor Profile...</p>}
            {error && <p>Error: {error.message}</p>}
            {doctorProfile && (
                <div>
                    <h2>Welcome, {doctorProfile.displayName || doctorProfile.username}</h2>

                    <h3>Availability</h3>
                    <div className="availability-controls">
                        {Object.entries(availability).map(([day, isAvailable]) => (
                            <div key={day} className="day-control">
                                <label htmlFor={`${day}Availability`}>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
                                <input
                                    type="checkbox"
                                    id={`${day}Availability`}
                                    checked={isAvailable}
                                    onChange={(e) => handleAvailabilityChange(day, e.target.checked)}
                                />
                            </div>
                        ))}
                    </div>

                    <h3>Patient Limit</h3>
                    <div className="patient-limit-control">
                        <label htmlFor="patientLimit">Patient Limit per day:</label>
                        <input
                            type="number"
                            id="patientLimit"
                            value={patientLimit}
                            onChange={handlePatientLimitChange}
                            min="1"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;
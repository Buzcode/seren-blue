import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Import axios for profile data fetching
import { assets } from '../assets/assets'; // Assuming assets import is needed

const DoctorDashboardPage = () => {
  const { token } = useAuth();
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // State for user profile data

  useEffect(() => {
    console.log("DoctorDashboardPage useEffect - Token:", token); // <-- ADDED LINE - Log token value

    fetchUserProfile(); // Fetch user profile data on component mount
    fetchDoctorAvailability(); // Fetch availability data on component mount (as before)
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/users/me/profile', { // API endpoint to fetch user profile (same as MyProfilePage)
        headers: { Authorization: `Bearer ${token}` }, // Include JWT token
        withCredentials: true, // **ADDED: Include credentials (cookies) with axios request** - For axios, use withCredentials: true
      });
      setUserData(response.data); // Store fetched user profile data
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Error loading profile. Please try again later."); // Set error state if profile fetch fails
    }
  };


  const fetchDoctorAvailability = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/doctor/dashboard/availability', { // Fetch availability (FULL URL)
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 404) {
          // **Handle 404 Not Found specifically - No availability data yet**
          console.log("Availability data not found for this doctor (404)");
          setAvailability([]); // Set availability state to empty array to indicate no data
          return; // Important: Return here to prevent further error handling for 404
        } else {
          // For other errors (non-404), throw an error to be caught by the catch block
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
      setError("Error loading availability. Please try again later.");
    }
  };

  const handleAvailabilityChange = (dayOfWeek, isChecked) => {
    console.log(`Availability for ${dayOfWeek} changed to: ${isChecked}`);

    // **Optimistically update the availability state:**
    setAvailability(prevAvailability => {
      return prevAvailability.map(dayData => {
        if (dayData.day_of_week === dayOfWeek) {
          return { ...dayData, is_available: isChecked }; // Update is_available for the changed day
        } else {
          return dayData; // Keep other days unchanged
        }
      });
    });

    // **In the next steps, we will add logic to:**
    // 2. Send a PUT request to the backend to save the updated availability to the database.
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!userData) { // Show loading message if user data is not yet loaded
    return <p>Loading dashboard data...</p>;
  }


  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {/* **Doctor Profile Information Section - ADDED HERE** */}
      <img className='w-36 rounded' src={userData.image || assets.profilepic1} alt="Profile Picture" />
      <h2 className="text-2xl font-semibold mb-4">{userData.displayName || `${userData.firstName} ${userData.lastName}`}</h2>
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email Id:</p>
          <p className="text-blue-500">{userData.username}</p>
          <p className="font-medium">Phone:</p>
          <p className="text-blue-400">{userData.phone || 'N/A'}</p>
          <p className="font-medium">Address:</p>
          <p className='text-gray-500'>
            {userData.address?.line1 || 'N/A'}<br />
            {userData.address?.line2 || 'N/A'}
          </p>
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          <p className='text-gray-400'>{userData.gender || 'N/A'}</p>
          <p className='font-medium'>Birth Date:</p>
          <p className='text-gray-400'>{userData.birthDate || 'N/A'}</p>
        </div>
      </div>

      {/* **Availability Display Section - Modified to handle empty availability** */}
      <div>
        <p className='text-neutral-500 underline mt-3'>AVAILABILITY SETTINGS</p>
        {availability.length > 0 ? ( // **Check if availability.length > 0**
          <div className="mt-2">
            {availability.map((dayAvailability) => (
              <div key={dayAvailability._id} className="flex items-center justify-between py-2">
                <label htmlFor={`availability-${dayAvailability.day_of_week}`} className="font-medium text-neutral-700">
                  {dayAvailability.day_of_week}
                </label>
                <input
                  type="checkbox"
                  id={`availability-${dayAvailability.day_of_week}`}
                  className="mr-2 custom-checkbox"
                  checked={dayAvailability.is_available}
                  onChange={(e) => handleAvailabilityChange(dayAvailability.day_of_week, e.target.checked)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No availability set yet. Please set your availability below.</p>  // **Display this message when availability is empty**
        )}
      </div>
      <div className='mt-10'>
       
        {/* ... (Edit/Save button code) ... */}
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
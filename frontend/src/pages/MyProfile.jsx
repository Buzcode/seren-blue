import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { assets } from '../assets/assets'; // Assuming assets import is needed for profile picture

const MyProfilePage = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null); // Initialize userData to null
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false); // Example edit state

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
  }, []); // Empty dependency array: run only once on mount

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/users/me/profile', { // API endpoint to fetch user profile
        headers: { Authorization: `Bearer ${token}` }, // Include JWT token in Authorization header
      });
      setUserData(response.data); // Store fetched user profile data in state
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Error loading profile. Please try again later."); // Set error message
      setUserData(null); // Clear user data on error
    }
  };

  if (error) { // Display error message if any
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!userData) { // Show loading indicator while fetching data
    return <p>Loading profile...</p>; // Or a loading spinner
  }

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {/* Display user profile image (if you have image field in User model, adjust accordingly) */}
      <img className='w-36 rounded' src={userData.image || assets.profilepic1} alt="Profile Picture" /> {/* Use dummy profilepic1 if userData.image is not available */}

      <h2 className="text-2xl font-semibold mb-4">{userData.displayName || `${userData.firstName} ${userData.lastName}`}</h2> {/* Display display name or full name */}

      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email Id:</p>
          <p className="text-blue-500">{userData.username}</p> {/* Display dynamic username (email) from userData */}
          <p className="font-medium">Phone:</p>
          <p className="text-blue-400">{userData.phone || 'N/A'}</p> {/* Display dynamic phone from userData, default to 'N/A' if not available */}
          <p className="font-medium">Address:</p>
          <p className='text-gray-500'>
            {userData.address?.line1 || 'N/A'}<br /> {/* Display dynamic address line 1 from userData, default to 'N/A' if not available */}
            {userData.address?.line2 || 'N/A'} {/* Display dynamic address line 2 from userData, default to 'N/A' if not available */}
          </p>
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          <p className='text-gray-400'>{userData.gender || 'N/A'}</p> {/* Display dynamic gender from userData, default to 'N/A' if not available */}
          <p className='font-medium'>Birth Date:</p>
          <p className='text-gray-400'>{userData.birthDate || 'N/A'}</p> {/* Display dynamic birthDate from userData, default to 'N/A' if not available */}
        </div>
      </div>
      <div className='mt-10'>
        {/* Keep Edit/Save button - functionality to be implemented later */}
        {
          isEdit
            ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(false)} >Save Information</button>
            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfilePage;
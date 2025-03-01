import path from 'path'; 

import User from "../model/user.js"; 

export const getAllUsers = async (req, res) => { /* ... your code ... */ };
export const getProfile = async (req, res) => { /* ... your code ... */ };
export const createUser = async (req, res) => { /* ... your code ... */ };
export const updatedUser = async (req, res) => { /* ... your code ... */ };
export const deleteUser = async (req, res) => { /* ... your code ... */ };
export const deleteAllUsers = async (req, res) => { /* ... your code ... */ };


export const getUserProfileController = async (req, res) => { 
    try {
      // Access user ID using req.user.id (lowercase "id") - CORRECTED LINE
      const userId = req.user.id; // <-- CHANGED to req.user.id - Access user ID using "id" claim

      console.log("getUserProfileController - Start: Fetching profile for user ID:", userId); 

      // Log the userId just before querying the database - VERY IMPORTANT
      console.log("getUserProfileController - Before User.findById - userId value:", userId); 

      // Fetch user profile from database using userId
      const userProfile = await User.findById(userId).select('-password -__v'); 

      // Log the userProfile object IMMEDIATELY after fetching from database - VERY IMPORTANT
      console.log("getUserProfileController - After User.findById - userProfile value:", userProfile);

      if (!userProfile) {
        console.log("getUserProfileController - User profile NOT found in database for ID:", userId); 
        return res.status(404).json({ error: "User profile not found" }); 
      }

      console.log("getUserProfileController - User profile FOUND and fetched successfully:", userProfile);

      res.json(userProfile); 
      console.log("getUserProfileController - Response sent successfully.");

    } catch (error) {
      console.error("getUserProfileController - Error fetching user profile - Error:", error); 
      res.status(500).json({ error: "Failed to fetch user profile" }); 
      console.error("getUserProfileController - Error response sent.");
    }
  };
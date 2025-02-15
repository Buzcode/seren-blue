import express from "express";
import checkToken from "../middlewares/checkToken.js";
import authorizeRole from "../middlewares/authorizeRole.js"; // Import authorizeRole
import {
  getAllUsers,
  getProfile,
  createUser,
  deleteUser,
  deleteAllUsers,
  updatedUser,
} from "../controller/userController.js";

const router = express.Router();

// Example Route Protections - ADJUST THESE BASED ON YOUR SPECIFIC NEEDS
router.get("/", checkToken, authorizeRole('admin'), getAllUsers); // Only admins can get all users
router.get("/profile", checkToken, authorizeRole('patient', 'doctor', 'admin'), getProfile); // Patients, doctors, admins can access their own profile
router.post("/", createUser); // Public route for patient registration (default role is 'patient')
router.put("/:id", checkToken, authorizeRole('patient', 'doctor', 'admin'), updatedUser); // Patients, doctors, admins can update *their own* profiles (you'll need to add logic in controller to check if it's the user's own profile or admin is updating)
router.delete("/:id", checkToken, authorizeRole('admin'), deleteUser); // Only admins can delete users
router.delete("/", checkToken, authorizeRole('admin'), deleteAllUsers); // Only admins can delete all users

export default router;
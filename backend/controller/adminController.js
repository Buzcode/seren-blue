// backend/controller/adminController.js
import User from "../model/user.js";
import { hashPassword } from "../utils/helpers.js";

export const createUserController = async (req, res) => {
  try {
    const { username, displayName, password, role } = req.body;

    // Basic input validation (you can add more robust validation)
    if (!username || !password || !role) {
      return res.status(400).json({ error: "Username, password, and role are required." });
    }

    if (!['doctor', 'admin'].includes(role)) { // Only allow creating 'doctor' or 'admin' roles through this endpoint
      return res.status(400).json({ error: "Invalid role. Only 'doctor' or 'admin' roles can be created here." });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." }); // 409 Conflict status code for resource conflict
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      username,
      displayName,
      password: hashedPassword,
      role, // Role is taken from the request body (admin will select 'doctor' or 'admin')
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully.", userId: newUser._id }); // 201 Created status code for successful resource creation

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user.", details: error.message }); // 500 Internal Server Error for server-side errors
  }
};
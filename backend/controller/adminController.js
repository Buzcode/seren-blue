// backend/controller/adminController.js
import User from "../model/user.js";
import { hashPassword } from "../utils/helpers.js";

export const createUserController = async (req, res) => {
  console.log("createUserController function started!"); // Log when controller starts
  try {
    const { username, displayName, password, role } = req.body;

    // Basic input validation
    if (!username || !password || !role) {
      return res.status(400).json({ error: "Username, password, and role are required." });
    }

    if (!['doctor', 'admin'].includes(role)) {
      return res.status(400).json({ error: "Invalid role. Only 'doctor' or 'admin' roles can be created here." });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      username,
      displayName,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully.", userId: newUser._id });

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user.", details: error.message });
  }
};
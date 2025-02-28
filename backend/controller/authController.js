import User from "../model/user.js";
import { comparePassword, hashPassword } from "../utils/helpers.js"; // Import hashPassword helper
import jwt from "jsonwebtoken";
import validator from 'validator'; // Import validator for email validation (npm install validator)

const JWT_SECRET_KEY = "YOUR_VERY_SECRET_KEY_HERE"; // <-- HARDCODED SECRET KEY - DEVELOPMENT ONLY!
const lifetime = "3600000";

export const login = async (req, res) => {
  // ... (your existing login function code - no changes needed) ...
  console.log("Login request received at /api/auth/login");
  const { username, password } = req.body;
  console.log("Username received:", username);
  console.log(
    "Password received (plain text - for debugging only!):",
    password
  );

  const user = await User.findOne({ username: username }).select(["-__v"]);

  if (!user) {
    console.log("User NOT found in database for username:", username);
    return res.status(404).json({ error: "User not found" });
  }

  const isSame = await comparePassword(password, user.password);
  if (!isSame) {
    console.log("Password comparison failed for username:", username);
    return res.status(400).json({ error: "Wrong password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role, // <-- This line is intended to include role
    },
    JWT_SECRET_KEY, // <-- HARDCODED SECRET KEY USED HERE
    { expiresIn: lifetime }
  );
  console.log("User object just before JWT signing:", user);
  console.log("User role just before JWT signing:", user.role);
  console.log("JWT Token generated successfully for user:", username);

  res.cookie("token", token, {
    // Cookie settings - CHANGED sameSite to "lax" for Test 1
    maxAge: lifetime,
    httpOnly: true,
    secure: false,  // <-- Keep secure: false for testing on HTTP localhost
    sameSite: "lax", // <-- CHANGED sameSite to "lax" for Test 1
    path: "/",
  });
  console.log("Token cookie set successfully for user:", username);

  // Modified response: Include token in JSON response body AND user data
  return res.status(200).json({
    message: "Login successful",
    token: token, // <-- ADDED: Include token in JSON response body!
    user: {
      // (Optional) Include user data in response if needed
      _id: user._id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    },
  });
};

export const register = async (req, res) => {
  console.log("Registration request received at /api/auth/register");
  const { firstName, lastName, username, password } = req.body;

  // 1. Backend Input Validation (using validator library for email)
  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ error: "All fields are required." }); // 400 Bad Request for missing fields
  }
  if (!validator.isEmail(username)) { // Validate email format
    return res.status(400).json({ error: "Invalid email format." }); // 400 Bad Request for invalid email
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." }); // 400 Bad Request for weak password
  }

  try {
    // 2. Check if username already exists (case-insensitive email check)
    const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } }); // Case-insensitive username check
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." }); // 409 Conflict for username taken
    }

    // 3. Hash the password
    const hashedPassword = await hashPassword(password); // Assuming you have hashPassword helper

    // 4. Create new user in database
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword, // Store hashed password
      role: 'patient', // Default role for registered users is 'patient'
      isPatient: true, // Set isPatient flag
      isActive: true, // Set isActive flag (optional - for account activation)
      // ... other user fields ...
    });

    const savedUser = await newUser.save();
    console.log("New user registered successfully:", savedUser);

    // 5. (Optional) Send email verification email (implementation not shown here)

    // 6. Success response - Redirect to login page or confirmation page
    return res.status(201).json({ message: "Registration successful! Please log in." }); // 201 Created for successful resource creation

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Registration failed. Please try again later." }); // 500 Internal Server Error for server-side errors
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return res.status(200).json({ message: "Logout successful" });
};
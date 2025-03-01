// authController.js
import User from "../model/user.js";
import { comparePassword, hashPassword } from "../utils/helpers.js";
import jwt from "jsonwebtoken";
import validator from 'validator';

// **IMPORTANT:** Replace "YOUR_VERY_SECRET_KEY_HERE" with a strong, randomly generated secret key!
//              Ideally, store this in an environment variable (e.g., process.env.JWT_SECRET_KEY)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "YOUR_VERY_SECRET_KEY_HERE";
const lifetime = "3600000";

export const login = async (req, res) => {
  console.log("Login request received at /api/auth/login");
  const { username, password } = req.body;

  console.log("Username received from frontend:", username); // <--- KEEP THIS LOG

  // **MODIFIED QUERY for Case-Insensitive Username Lookup:**
  const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } }).select(["-__v"]);

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
      id: user._id,
      username: user.username,
      role: user.role, // Include role in JWT payload
    },
    JWT_SECRET_KEY,
    { expiresIn: lifetime }
  );
  console.log("User object just before JWT signing:", user);
  console.log("User role just before JWT signing:", user.role);
  console.log("JWT Token generated successfully for user:", username);

  res.cookie("token", token, {
    maxAge: lifetime,
    httpOnly: true,
    secure: false, // Set to true in production if using HTTPS
    sameSite: "lax", // Or 'none' if you need to send cookies cross-site (and set secure: true & handle SameSite=None correctly)
    path: "/",
  });
  console.log("Token cookie set successfully for user:", username);

  return res.status(200).json({
    message: "Login successful",
    token: token,
    user: {
      _id: user._id,
      username: user.username,
      displayName: user.displayName, // Assuming displayName exists in your User model
      role: user.role,
    },
  });
};

export const register = async (req, res) => {
  console.log("Registration request received at /api/auth/register");
  const { firstName, lastName, username, password, phone, addressLine1, addressLine2, gender, birthDate } = req.body;

  // 1. Backend Input Validation
  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ error: "All required fields are missing." });
  }
  if (!validator.isEmail(username)) {
    return res.status(400).json({ error: "Invalid email format." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  try {
    // 2. Check if username already exists (case-insensitive email check)
    const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." });
    }

    // 3. Hash the password
    const hashedPassword = await hashPassword(password);

    // 4. Create new user in database
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role: 'patient', // Default role for registered users
      isPatient: true,
      isActive: true,
      phone: phone || '',
      address: { line1: addressLine1 || '', line2: addressLine2 || '' },
      gender: gender || '',
      birthDate: birthDate || null,
    });

    const savedUser = await newUser.save();
    console.log("New user registered successfully:", savedUser);

    // 6. Success response
    return res.status(201).json({ message: "Registration successful! Please log in." });

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Registration failed. Please try again later." });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Set to true in production if using HTTPS
    sameSite: "none", // Or 'lax' depending on your needs
    path: "/",
  });
  return res.status(200).json({ message: "Logout successful" });
};
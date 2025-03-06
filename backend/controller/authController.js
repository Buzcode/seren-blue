import User from "../model/user.js";
import { comparePassword, hashPassword } from "../utils/helpers.js";
import jwt from "jsonwebtoken";
import validator from 'validator';

const JWT_SECRET_KEY = process.env.JWT_SECRET; 
const lifetime = "3600000";

export const login = async (req, res) => {
  console.log("Login request received at /api/auth/login");
  const { username, password } = req.body;

  try { 
    const user = await User.findOne({ username }).select(["-__v"]);

    if (!user) {
      console.log("User NOT found in database for username:", username);
      return res.status(404).json({ error: "Invalid credentials" }); 
    }

    const isSame = await comparePassword(password, user.password);
    if (!isSame) {
      console.log("Password comparison failed for username:", username);
      return res.status(404).json({ error: "Invalid credentials" }); 
    }

    const payload = { 
      id: user._id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(
      payload,
      JWT_SECRET_KEY, 
      { algorithm: "HS256", expiresIn: lifetime } 
    );

    console.log("User object just before JWT signing:", user);
    console.log("User role just before JWT signing:", user.role);
    console.log("JWT Token generated successfully for user:", username);

    res.cookie("token", token, {
      maxAge: lifetime,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    console.log("Token cookie set successfully for user:", username);

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        _id: user._id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
      },
    });

  } catch (error) { 
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Login failed. Please try again later." }); // 500 for server errors
  }
};

export const register = async (req, res) => {
  console.log("Registration request received at /api/auth/register");
  const { firstName, lastName, username, password, phone, addressLine1, addressLine2, gender, birthDate } = req.body;

  
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
    const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role: 'patient',
      isPatient: true,
      isActive: true,
      phone: phone || '',
      address: { line1: addressLine1 || '', line2: addressLine2 || '' },
      gender: gender || '',
      birthDate: birthDate || null,
    });

    const savedUser = await newUser.save();
    console.log("New user registered successfully:", savedUser);

    return res.status(201).json({ message: "Registration successful! Please log in." });

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Registration failed. Please try again later." });
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
import User from "../model/user.js";
import { comparePassword } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

const lifetime = "3600000";

export const login = async (req, res) => {
  console.log("Login request received at /api/auth/login");
  const { username, password } = req.body;
  console.log("Username received:", username);
  console.log("Password received (plain text - for debugging only!):", password);

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
    process.env.JWT_SECRET,
    { expiresIn: lifetime }
  );
  console.log("User object just before JWT signing:", user); // <-- ADDED: Log user object
  console.log("User role just before JWT signing:", user.role); // <-- ADDED: Log user.role
  console.log("JWT Token generated successfully for user:", username);


  res.cookie("token", token, {
    maxAge: lifetime,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  console.log("Token cookie set successfully for user:", username);
  return res.status(200).json(user);
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
import User from "../model/user.js";
import { comparePassword } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

// REMOVED: const JWT_SECRET_KEY = 'YOUR_VERY_SECRET_KEY_HERE'; // <-- HARDCODED SECRET KEY - DEVELOPMENT ONLY!
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

    // MODIFIED: Hardcoded JWT_SECRET for debugging - IMPORTANT: USE THE SAME SECRET AS IN checkToken.js
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            role: user.role, // <-- This line is intended to include role
        },
        "YOUR_SECRET_KEY_DEBUG_ONLY", // <---------------------- HARDCODED SECRET - **MUST MATCH checkToken.js**
        { expiresIn: lifetime, algorithm: 'HS256' }
    );
    console.log("User object just before JWT signing:", user);
    console.log("User role just before JWT signing:", user.role);
    console.log("JWT Token generated successfully for user:", username);

    res.cookie("token", token, { // Keep setting the cookie (GOOD!)
        maxAge: lifetime,
        httpOnly: true,
        // secure: true,       // <-- REMOVED or COMMENTED OUT for Test #1
        // sameSite: "none",   // <-- REMOVED or COMMENTED OUT for Test #1
        path: "/",
    });
    console.log("Token cookie set successfully for user:", username);

    // Modified response: Include token in JSON response body AND user data
    return res.status(200).json({
        message: "Login successful",
        token: token, // <-- ADDED: Include token in JSON response body!
        user: {      // (Optional) Include user data in response if needed
            _id: user._id,
            username: user.username,
            displayName: user.displayName,
            role: user.role,
        },
    });
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
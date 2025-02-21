// middleware/checkToken.js
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = 'YOUR_VERY_SECRET_KEY_HERE'; // <-- HARDCODED SECRET KEY - DEVELOPMENT ONLY! - MUST MATCH authController.js!

const checkToken = (req, res, next) => {
    console.log("checkToken middleware is being executed!"); // <-- ADD THIS console.log AT THE BEGINNING

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: "Invalid token - No token provided" }); // More specific message for no token
    }

    jwt.verify(token, JWT_SECRET_KEY, { algorithm: 'HS256' }, (err, decodedUser) => { // <-- ADDED: algorithm: 'HS256' option here!
        if (err) {
            console.error("JWT Verification Error:", err); // <-- ADDED: Log the specific error to server console
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
            });
            return res.status(401).json({ error: "Invalid token - Verification failed" }); // More specific message for verification failure
        }

        // Attach the decoded user information to the request object
        req.user = decodedUser; // <--- ADD THIS LINE: Attach decoded user to req.user

        next();
    });
};

export default checkToken;
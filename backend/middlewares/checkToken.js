// backend/middlewares/checkToken.js
console.log("Loading checkToken middleware module...");

import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
    console.log("Entering checkToken function body...");
    console.log("checkToken middleware is being executed!");

    // MODIFIED: Extract token from Authorization header instead of cookies
    const authHeader = req.headers.authorization; // Get Authorization header
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN" format

    if (!token) {
        return res.status(401).json({ error: "Invalid token - No token provided" });
    }

    // ADDED: Log the raw JWT token received from Authorization header
    console.log("JWT Token from Authorization Header:", token);

    // ADDED: Try to decode the token *without* verification to inspect it
    try {
        const decodedTokenInspect = jwt.decode(token, { complete: true }); // Decode WITHOUT verifying signature
        console.log("Decoded JWT Token (Inspect):", decodedTokenInspect); // Log the decoded token (headers and payload)
    } catch (decodeError) {
        console.error("JWT Decode Error (Inspect):", decodeError); // Log any decoding errors
        console.log("Could not decode token to inspect."); // Log if decode fails (less likely)
    }

    // **MODIFIED: Hardcoded JWT_SECRET for debugging - IMPORTANT: USE THE SAME SECRET IN TOKEN GENERATION**
    console.log("JWT_SECRET (HARDCODED for debugging) in checkToken (for verification):", "YOUR_SECRET_KEY_DEBUG_ONLY"); // Logging hardcoded secret

    jwt.verify(
        token,
        "YOUR_SECRET_KEY_DEBUG_ONLY", // <---------------------- HARDCODED SECRET
        { algorithm: 'HS256' },
        (err, decodedUser) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                // REMOVED: Cookie clearing - not relevant if token is in header
                return res.status(401).json({ error: "Invalid token - Verification failed" });
            }

            // Attach the decoded user information to the request object
            req.user = decodedUser;
            console.log("JWT Verification Successful! Decoded User:", decodedUser); // Log successful verification and decoded user

            next();
        }
    );
};

export default checkToken;
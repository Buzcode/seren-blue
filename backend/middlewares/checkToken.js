
// middleware/checkToken.js
console.log("Loading checkToken middleware module...");

import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
    console.log("Entering checkToken function body...");
    console.log("checkToken middleware is being executed!");

    // ADDED: Log the entire req.cookies object - THIS IS CRUCIAL!
    console.log("req.cookies object:", req.cookies);


    const { token } = req.cookies; // Try to get token from cookies

    if (!token) {
        return res.status(401).json({ error: "Invalid token - No token provided" });
    }

    // ADDED: Log the raw JWT token received from cookies
    console.log("JWT Token from cookies:", token);

    // ADDED: Try to decode the token *without* verification to inspect it
    try {
        const decodedTokenInspect = jwt.decode(token, { complete: true }); // Decode WITHOUT verifying signature
        console.log("Decoded JWT Token (Inspect):", decodedTokenInspect); // Log the decoded token (headers and payload)
    } catch (decodeError) {
        console.error("JWT Decode Error (Inspect):", decodeError); // Log any decoding errors
        console.log("Could not decode token to inspect."); // Log if decode fails (less likely)
    }


    // ADDED: Console log to check the JWT_SECRET being used for verification
    console.log("JWT_SECRET from process.env in checkToken (for verification):", process.env.JWT_SECRET);


    jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'HS256' }, (err, decodedUser) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
            });
            return res.status(401).json({ error: "Invalid token - Verification failed" });
        }

        // Attach the decoded user information to the request object
        req.user = decodedUser;
        console.log("JWT Verification Successful! Decoded User:", decodedUser); // Log successful verification and decoded user

        next();
    });
};

export default checkToken;

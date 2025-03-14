// middlewares/authorizeRole.js
import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        // **1. Check for token in Authorization header (Bearer Token)**
        const authHeader = req.headers.authorization;
        let token = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        }

        // **2. Fallback: Check for token in cookies (if you still want to support cookies)**
        if (!token && req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // **3. If no token found in header or cookies, return 401**
        if (!token) {
            console.log("authorizeRole Middleware - No token provided"); // **Enhanced Log: No token**
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        // **CRITICAL: Log JWT_SECRET_KEY value here:**
        console.log("authorizeRole Middleware - JWT_SECRET_KEY value:", process.env.JWT_SECRET);

        // **MODIFIED LINE: Encode process.env.JWT_SECRET as UTF-8 Buffer**
        const secretKeyBuffer = Buffer.from(process.env.JWT_SECRET, 'utf-8');

        try {
            const decodedToken = jwt.verify(token, secretKeyBuffer, { algorithm: 'HS256' }); // **MODIFIED LINE: Use secretKeyBuffer for verify**

            // **ENHANCED CONSOLE LOGS - ADD THESE:**
            console.log("authorizeRole Middleware - Decoded Token:", decodedToken); // Log decoded token
            console.log("authorizeRole Middleware - Decoded Token Role:", decodedToken.role); // **Log decoded token role specifically**
            console.log("authorizeRole Middleware - Allowed Roles:", allowedRoles); // **Log allowedRoles**
            console.log("authorizeRole Middleware - req.user BEFORE setting:", req.user);

            req.user = decodedToken;

            console.log("authorizeRole Middleware - req.user AFTER setting:", req.user);

            // **Modified Role Check Logic:**
            if (allowedRoles && allowedRoles.length > 0) { // **Only check roles if allowedRoles are provided**
                const roleCheckResult = allowedRoles.includes(decodedToken.role); // **Store role check result**
                console.log("authorizeRole Middleware - Role Check Result:", roleCheckResult); // **Log role check result**

                if (!roleCheckResult) {
                    console.log("authorizeRole Middleware - Role check FAILED - Forbidden"); // **Enhanced Log: Role check failed**
                    return res.status(403).json({ error: "Forbidden - Insufficient role" });
                } else {
                    console.log("authorizeRole Middleware - Role check PASSED"); // **Enhanced Log: Role check passed**
                }
            } else {
                // **If no allowedRoles are specified, allow access (just authenticate)**
                console.log("authorizeRole Middleware - No role check needed - Access allowed"); // **Enhanced Log: No role check needed**
                return next(); // **Explicitly call next() when no role check is needed**
            }

            next(); // Proceed if role check passes (or if no role check was performed)

        } catch (err) {
            console.error("authorizeRole Middleware - Token Verification Error:", err); // **Enhanced Log: Token verification error**
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
            });
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
    };
};

export default authorizeRole;
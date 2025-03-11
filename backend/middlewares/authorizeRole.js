// middlewares/authorizeRole.js
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
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // **ADD THESE CONSOLE LOGS:**
            console.log("authorizeRole Middleware - Decoded Token:", decodedToken); // Log decoded token
            console.log("authorizeRole Middleware - req.user BEFORE setting:", req.user); // Log req.user before setting

            req.user = decodedToken;

            console.log("authorizeRole Middleware - req.user AFTER setting:", req.user); // Log req.user after setting
            // **Modified Role Check Logic:**
            if (allowedRoles && allowedRoles.length > 0) { // **Only check roles if allowedRoles are provided**
                if (!allowedRoles.includes(decodedToken.role)) { // Changed to decodedToken.role
                    return res.status(403).json({ error: "Forbidden - Insufficient role" });
                }
            } else {
                // **If no allowedRoles are specified, allow access (just authenticate)**
                return next(); // **Explicitly call next() when no role check is needed**
            }

            next(); // Proceed if role check passes (or if no role check was performed)

        } catch (err) {
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
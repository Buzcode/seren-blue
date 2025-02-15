// middlewares/authorizeRole.js
import jwt from "jsonwebtoken"; // <--- MOVED TO THE VERY TOP!

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.cookies || !req.cookies.token) { // Check if token exists in cookies
        return res.status(401).json({ error: "Unauthorized - No token provided" });
      }

      const token = req.cookies.token;

      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        // decodedToken now contains the payload from your JWT (including user info)

        if (!decodedToken.role) { // Check if role is in the decoded token
          return res.status(401).json({ error: "Unauthorized - Role not found in token" });
        }

        const userRole = decodedToken.role;

        if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({ error: "Forbidden - Insufficient role" });
        }

        // If authorized, attach the decoded user information to the request object (optional but helpful)
        req.user = decodedToken; // Now you can access user info in subsequent middleware/controllers

        next(); // User is authorized, proceed
      } catch (err) {
        // JWT verification failed
        res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        return res.status(401).json({ error: "Unauthorized - Invalid token" }); // Or handle error as needed
      }
    };
  };

  export default authorizeRole;
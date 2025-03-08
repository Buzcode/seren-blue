// backend/middleware/checkToken.js
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET; // **FIXED: Load secret key from environment variable**

const checkToken = (req, res, next) => {
  console.log("checkToken middleware is being executed!");

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" }); // More standard error message
  }

  jwt.verify(
    token,
    JWT_SECRET_KEY, // **CORRECTED: Use JWT_SECRET_KEY variable here for verification**
    { algorithm: "HS256" },
    (err, decodedUser) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        res.clearCookie("token", { // Keep clearing cookie on error
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        return res
          .status(401)
          .json({ error: "Unauthorized - Invalid token" }); // More standard error message
      }

      // Attach the decoded user ID to the request object as req.userId
      req.userId = decodedUser.id; // **MODIFIED: Set req.userId to decoded user ID**
      console.log("checkToken middleware - Decoded user ID:", req.userId); // Log req.userId

      next();
    }
  );
};

export default checkToken;
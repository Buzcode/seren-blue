// middleware/checkToken.js
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "YOUR_VERY_SECRET_KEY_HERE";

const checkToken = (req, res, next) => {
  console.log("checkToken middleware is being executed!");

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Invalid token - No token provided" });
  }

  jwt.verify(
    token,
    JWT_SECRET_KEY,
    { algorithm: "HS256" },
    (err, decodedUser) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        return res
          .status(401)
          .json({ error: "Invalid token - Verification failed" });
      }

      // Attach the decoded user information to the request object
      req.user = decodedUser; // Decoded user info is attached to req.user

      // Access user ID using req.user.id (lowercase "id") - CORRECTED LINE
      const userId = req.user.id; // <-- CHANGED to req.user.id - Access user ID using "id" claim
      console.log("checkToken middleware - Decoded user ID:", userId); // <-- ADDED: Log decoded userId in checkToken

      next();
    }
  );
};

export default checkToken;
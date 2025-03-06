// backend/middleware/checkToken.js
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET; // **FIXED: Load secret key from environment variable**

const checkToken = (req, res, next) => {
  console.log("checkToken middleware is being executed!");

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Invalid token - No token provided" });
  }

  jwt.verify(
    token,
    JWT_SECRET_KEY, // **CORRECTED: Use JWT_SECRET_KEY variable here for verification**
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

      // Attach the decoded user information to the request object as req.doctor (Optional renaming for clarity)
      req.doctor = decodedUser; // **OPTIONAL: Renamed req.user to req.doctor**

      // Access doctor ID using req.doctor.id (lowercase "id") - CORRECTED LINE and OPTIONAL renaming
      const doctorId = req.doctor.id; // <-- CHANGED to req.doctor.id and using "id" claim
      console.log("checkToken middleware - Decoded doctor ID:", doctorId); // <-- ADDED: Log decoded doctorId in checkToken

      next();
    }
  );
};

export default checkToken;
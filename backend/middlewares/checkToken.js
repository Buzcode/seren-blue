// middleware/checkToken.js
import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decodedUser) => { // Changed 'user' to 'decodedUser' for clarity
    if (err) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach the decoded user information to the request object
    req.user = decodedUser; // <--- ADD THIS LINE: Attach decoded user to req.user

    next();
  });
};

export default checkToken;
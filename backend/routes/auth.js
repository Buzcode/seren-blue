import express from "express";
import { login, logout,register } from "../controller/authController.js";
import checkToken from "../middlewares/checkToken.js";
import authorizeRole from "../middlewares/authorizeRole.js"; // Import authorizeRole

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.post("/logout", checkToken, logout); // Keep checkToken for logout (ensure user is logged in to logout)

export default router;
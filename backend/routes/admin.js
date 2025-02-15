// backend/routes/admin.js
import express from "express";
import checkToken from "../middlewares/checkToken.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { createUserController } from "../controller/adminController.js"; // We will create this controller in the next step

const router = express.Router();

// Route for admins to create new users (doctors, admins)
router.post('/create-user', checkToken, authorizeRole('admin'), createUserController);

export default router;
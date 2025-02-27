// backend/routes/admin.js
import express from "express";
import checkToken from "../middlewares/checkToken.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { createUserController } from "../controller/adminController.js";

const router = express.Router();

// Route for admins to create new users (doctors, admins)
router.post('/create-user', checkToken, authorizeRole('admin'), (req, res, next) => {
    console.log("Route POST /api/admin/create-user was hit!"); // Log when route is hit
    console.log("Request Body:", req.body); // Log request body to see data being sent
    createUserController(req, res, next);
});

export default router;
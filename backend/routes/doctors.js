// backend/routes/doctors.js
import express from 'express';
import checkToken from '../middlewares/checkToken.js';
// ... import your controller function (we'll create this next) ...
import { getMyAppointmentsController } from '../controller/doctorController.js'; // Example import - adjust path if needed

const router = express.Router();

// GET /api/doctors/me/appointments - Get appointments for the logged-in doctor
router.get('/me/appointments', checkToken, getMyAppointmentsController); // Use checkToken middleware for protection

export default router;
// backend/routes/doctorDashboardRoutes.js
import express from 'express';
import doctorDashboardController from '../controller/doctorDashboardController.js'; // We'll create this controller next

const router = express.Router();

// GET doctor profile by ID (you might use doctor's user ID after login)
router.get('/doctors/:doctorId', doctorDashboardController.getDoctorProfile);

// PUT route to update doctor availability
router.put('/doctors/:doctorId/availability', doctorDashboardController.updateDoctorAvailability);

// PUT route to update doctor patient limit
router.put('/doctors/:doctorId/patientLimit', doctorDashboardController.updateDoctorPatientLimit);

export default router;
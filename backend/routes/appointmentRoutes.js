// backend/routes/appointmentRoutes.js
import express from 'express';
const router = express.Router();

// **Corrected import for authorizeRole - DEFAULT IMPORT and correct path to 'middlewares' (plural)**
import authorizeRole from '../middlewares/authorizeRole.js'; // Default import for authorizeRole and correct path to middlewares
// **Import checkToken middleware (assuming it's in the same directory as authorizeRole - adjust path if needed)**
// **Important:**  If 'checkToken' is in 'authMiddleware.js' (as in previous examples), adjust import path accordingly.
// **For now, assuming 'checkToken' is also exported from 'authorizeRole.js' (which might not be the case - adjust import if needed)**
// import { checkToken } from '../middlewares/authorizeRole.js'; // If checkToken was exported from authorizeRole.js (likely not)
import checkToken from '../middlewares/checkToken.js'; // **Assuming checkToken is in a separate 'checkToken.js' file in 'middleware' directory - ADJUST PATH IF NEEDED**


import { getMyAppointments, bookAppointment } from '../controller/appointmentController.js';

// Route to get appointments for the logged-in user (APPLY AUTHENTICATION MIDDLEWARE)
router.get('/my-appointments', checkToken, authorizeRole('patient'), getMyAppointments); // **RE-ENABLED checkToken middleware**
// router.get('/my-appointments', authorizeRole(['patient']), getMyAppointments); // Original line - Commented out authorizeRole for now

// Route to book a new appointment (You might want to add authentication middleware here as well, depending on your requirements)
router.post('/appointments', bookAppointment); // You might add middleware here too

export default router;
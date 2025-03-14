// backend/routes/ambulance.js
import express from 'express';
const router = express.Router();
import {
    createAmbulanceRequest,
    initiatePayment,
    paymentSuccessCallback,
    paymentFailCallback,
    paymentCancelCallback,
    getBookingDetails,
    // paymentIPNCallback // Uncomment if you are using IPN
} from '../controller/ambulanceController.js'; // Corrected import path
import authorizeRole from '../middlewares/authorizeRole.js';

// Endpoint 1: Submit Ambulance Request (POST /api/ambulance/request)
router.post('/request', authorizeRole(), createAmbulanceRequest);

// Endpoint 2: Initiate Payment (POST /api/ambulance/payment/initiate)
router.post('/payment/initiate', /*authorizeRole(),*/ initiatePayment); //  authorizeRole() is commented out for now

// Endpoint 3: Payment Success Callback (GET /api/ambulance/payment/success)
router.get('/payment/success', paymentSuccessCallback);

// Endpoint 4: Payment Fail Callback (GET /api/ambulance/payment/fail)
router.get('/payment/fail', paymentFailCallback);

// Endpoint 5: Payment Cancel Callback (GET /api/ambulance/payment/cancel)
router.get('/payment/cancel', paymentCancelCallback);

// **Endpoint 6: IPN URL (POST /api/ambulance/payment/ipn) - Highly Recommended for Production**
// router.post('/payment/ipn', paymentIPNCallback); // Uncomment if you are using IPN

// Endpoint 7: Get Booking Details by Booking ID (GET /api/ambulance/booking/:bookingId)
router.get('/booking/:bookingId', getBookingDetails);

export default router;
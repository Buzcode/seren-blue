// backend/routes/paymentRoutes.js
import express from 'express';
const router = express.Router();
import SSLCommerzPayment from 'sslcommerz-nodejs';
import dotenv from 'dotenv';
dotenv.config();
import authorizeRole from '../middlewares/authorizeRole.js';
import User from '../model/user.js';
import axios from 'axios';
import Appointment from '../model/Appointment.js';
import Payment from '../model/payment.js';

// **PROTECTED ROUTE:** Only authenticated users can access this route.
router.post('/initiate', authorizeRole(), async (req, res) => {
    const { doctorId, appointmentTime, amount } = req.body;
    if (!doctorId || !appointmentTime || !amount) {
        return res.status(400).json({ message: 'Missing appointment details (doctorId, appointmentTime, amount).' });
    }

    // **MODIFIED LINE: Accessing patientId using req.user?.id (no underscore)**
    const patientId = req.user?.id;
    console.log("Payment Initiate - req.user object:", req.user);
    console.log("Received appointmentTime from frontend:", appointmentTime); // Log received appointmentTime

    if (!patientId) {
        return res.status(401).json({ message: 'Patient ID not found in authenticated user context.' });
    }

    let patient;
    try {
        patient = await User.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found in database.' });
        }
    } catch (dbError) {
        console.error('Error fetching patient from database:', dbError);
        return res.status(500).json({ message: 'Failed to fetch patient details.', error: dbError });
    }

    const transactionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const data = {
        total_amount: amount,
        currency: 'BDT', // **TODO: 5. CURRENCY: Change if needed (if not BDT)**
        tran_id: transactionId,
        success_url: `${process.env.SSLCOMMERZ_DOMAIN}${process.env.SSLCOMMERZ_SUCCESS_URL}`,
        fail_url: `${process.env.SSLCOMMERZ_DOMAIN}${process.env.SSLCOMMERZ_FAIL_URL}`,
        cancel_url: `${process.env.SSLCOMMERZ_DOMAIN}${process.env.SSLCOMMERZ_CANCEL_URL}`,
        ipn_url: 'http://localhost:5001/ipn',
        product_name: 'Doctor Appointment Booking',
        product_category: 'Healthcare',
        product_profile: 'general',
        cus_name: patient.displayName || patient.username,
        cus_email: patient.username,
        cus_add1: 'N/A',
        cus_city: 'N/A',
        cus_country: 'Bangladesh',
        cus_phone: 'N/A',
        shipping_method: 'NO',
        value_a: doctorId,
        value_b: appointmentTime,
        value_c: patientId,
        value_d: 'patient-booking'
    };

    // ------------------- DATE PARSING LOGIC (Scenario A: Time String Only) -----------------------
    let parsedAppointmentTime; // Variable to hold parsed Date object
    try {
        const today = new Date(); // Assume today's date
        const timeString = appointmentTime;

        function parseTimeStringToDate(timeStr) {
            const [timePart, period] = timeStr.split(' ');
            let [hours, minutes] = timePart.split(':').map(Number);

            if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
            if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

            today.setHours(hours);
            today.setMinutes(minutes);
            today.setSeconds(0);
            today.setMilliseconds(0);
            return today; // Return the modified 'today' Date object
        }

        parsedAppointmentTime = parseTimeStringToDate(timeString);
        console.log("Parsed appointmentTime:", parsedAppointmentTime);

        if (isNaN(parsedAppointmentTime.getTime())) {
            console.error("Invalid Date object created.");
            return res.status(400).json({ message: 'Invalid appointment time format.' });
        }

    } catch (dateParsingError) {
        console.error("Error parsing appointment time:", dateParsingError);
        return res.status(400).json({ message: 'Error parsing appointment time.', error: dateParsingError });
    }
    // ------------------- END DATE PARSING LOGIC (Scenario A) -------------------


    // **MODIFIED SSLCommerz Initialization:**
    const sslcommerze = new SSLCommerzPayment({
        store_id: process.env.SSL_STORE_ID,
        store_passwd: process.env.SSL_STORE_PASSWORD,
        isSandboxMode: process.env.SSL_IS_LIVE === 'false'
    });

    sslcommerze.init_transaction(data).then(async apiResponse => { // **MODIFIED: Use init_transaction**
        let gatewayPageURL = apiResponse.GatewayPageURL;

        if (gatewayPageURL) {
            // **IMPORTANT:** Store transactionId in appointment document BEFORE redirecting to SSLCommerz
            try {
                const appointment = await Appointment.create({ // **TODO: 8a. CREATE APPOINTMENT DOCUMENT HERE or UPDATE existing one if appointment is created earlier.**
                    doctorId: doctorId,
                    patientId: patientId,
                    appointmentTime: parsedAppointmentTime, // **USE PARSED Date object here**
                    transactionId: transactionId, // Store transactionId in appointment document
                    paymentStatus: 'pending'      // Initial payment status is pending
                    // ... other appointment details you might have ...
                });
                console.log('Appointment created and transactionId stored:', appointment._id, transactionId);
            } catch (appointmentError) {
                console.error('Error creating appointment and storing transactionId:', appointmentError);
                return res.status(500).json({ message: 'Error creating appointment.', error: appointmentError });
            }


            res.json({ url: gatewayPageURL, transactionId: transactionId });
            console.log('Redirecting patient to SSLCommerz:', gatewayPageURL);
        } else {
            console.error('SSLCommerz init failed for patient booking:', apiResponse);
            res.status(500).json({ message: 'Payment initiation failed for appointment booking', error: apiResponse });
        }
    }).catch(error => {
        console.error('SSLCommerz init error:', error);
        res.status(500).json({ message: 'Payment initiation failed for appointment booking', error: error });
    });
});

// Route for SSLCommerz Success Callback - **IMPORTANT: Implement Payment Verification here**
router.post('/success', async (req, res) => {
    console.log('SSLCommerz Success Callback for Patient Booking:', req.body);

    const tranId = req.body.tran_id;
    const valId = req.body.val_id;
    const sslStoreId = process.env.SSL_STORE_ID;
    const sslStorePassword = process.env.SSL_STORE_PASSWORD;
    const sslValidationApiUrl = process.env.SSL_VALIDATION_API;

    let isPaymentVerified = false;

    try {
        const verificationResponse = await axios.get(sslValidationApiUrl, {
            params: {
                val_id: valId,
                store_id: sslStoreId,
                store_passwd: sslStorePassword,
                format: 'json'
            }
        });

        const verificationData = verificationResponse.data;

        // **TODO: 7.  CHECK SSLCommerz DOCUMENTATION for the exact response structure and success status indicator.**
        // **     Adapt the condition below to correctly check if payment is VALID according to SSLCommerz API response.**
        if (verificationData && verificationData.status === 'VALID') { // **Example condition - REPLACE with actual check**
            isPaymentVerified = true;
            console.log('SSLCommerz Payment VERIFIED successfully:', verificationData);
        } else {
            console.error('SSLCommerz Payment Verification FAILED:', verificationData);
            console.log('Verification Response Data (for debugging):', verificationData); // Log full response for debugging
        }

    } catch (verificationError) {
        console.error('Error during SSLCommerz payment verification API call:', verificationError);
        // Consider logging more details about verificationError for deeper debugging
    }

    if (isPaymentVerified) {
        try {
            // **TODO: 8b. ADJUST QUERY to find the correct appointment using transactionId.**
            const appointment = await Appointment.findOne({ transactionId: tranId }); // **Using transactionId to find appointment**

            if (appointment) {
                appointment.paymentStatus = 'paid';
                await appointment.save();
                console.log(`Appointment ${appointment._id} payment status updated to 'paid'`);

                await Payment.create({
                    userId: req.user?._id,
                    doctorId: appointment.doctorId, // Use doctorId from appointment
                    appointmentId: appointment._id,
                    amount: req.body.amount,       // **TODO: 9a. Get actual amount paid. Is it always docInfo.fees?**
                    currency: 'BDT',               // Or your currency
                    paymentGateway: 'SSLCommerz',
                    transactionId: tranId,
                    paymentStatus: 'Success',       // **TODO: 9b. Get actual status from verificationResponse if available - check docs!**
                    paymentDate: new Date(),
                    paymentMethod: 'Card',          // **TODO: 10. Get payment method from SSLCommerz if available - check docs!**
                    paymentDetails: verificationData // Store full verification response for detailed logging/debugging
                });
                console.log('Payment details stored in "payments" collection for transaction ID:', tranId);

            } else {
                console.warn('No appointment found for transaction ID:', tranId);
            }

            res.redirect('/appointment-confirmation'); // **TODO: 11. FRONTEND SUCCESS PAGE ROUTE**

        } catch (dbError) {
            console.error('Database update error after successful payment verification:', dbError);
            res.redirect('/appointment-failure'); // **TODO: 12. FRONTEND FAILURE PAGE ROUTE**
        }

    } else {
        // **Payment verification failed!**
        console.error('Payment verification failed for transaction ID:', tranId);
        res.redirect('/appointment-failure'); // **TODO: 13. FRONTEND FAILURE PAGE ROUTE**
    }
});

// Route for SSLCommerz Fail Callback
router.post('/fail', async (req, res) => {
    console.log('SSLCommerz Fail Callback for Patient Booking:', req.body);
    // **TODO: 14. HANDLE FAILED PAYMENT (SSLCommerz 'fail' callback):**
    //    - Log the failure.
    //    - Potentially update appointment status to 'payment_failed'.
    res.redirect('/appointment-failure'); // **TODO: 15. FRONTEND FAILURE PAGE ROUTE**
});

// Route for SSLCommerz Cancel Callback
router.post('/cancel', async (req, res) => {
    console.log('SSLCommerz Cancel Callback for Patient Booking:', req.body);
    // **TODO: 16. HANDLE CANCELLED PAYMENT (SSLCommerz 'cancel' callback):**
    //    - Log the cancellation.
    //    - Potentially update appointment status to 'payment_cancelled'.
    res.redirect('/appointment-cancelled'); // **TODO: 17. FRONTEND CANCELLED PAGE ROUTE**
});

export default router;
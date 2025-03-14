// backend/routes/healthCheckupPayment.js
import express from 'express';
const router = express.Router();
import axios from 'axios'; // Import axios for making HTTP requests

router.post('/initiate', async (req, res) => {
    console.log("Request Body received at /initiate:", req.body); // Log request body
    try {
        // 1. Get data from the request body, specifically for health checkup booking
        const { testDetails, centerDetails } = req.body;

        console.log("testDetails:", testDetails); // Log testDetails after parsing
        console.log("centerDetails:", centerDetails); // Log centerDetails after parsing

        // 2. Input validation - Ensure necessary details are present
        if (!testDetails || !centerDetails || !testDetails.price || !testDetails.name) {
            console.log("Validation failed!"); // Log if validation fails
            if(!testDetails) console.log("testDetails is missing");
            if(!centerDetails) console.log("centerDetails is missing");
            if(!testDetails?.price) console.log("testDetails.price is missing");
            if(!testDetails?.name) console.log("testDetails.name is missing");
            return res.status(400).json({ error: 'Missing test details, center details, test price, or test name.' });
        }

        // 3. Generate a unique transaction ID
        const transactionId = 'health_checkup_tran_' + Date.now(); // Prefix for easy identification

        // 4. Construct payment data for SSLCommerz - Specifically for health checkup
        const numericalPrice = testDetails.price.replace('BDT ', ''); // Remove "BDT " and get numerical price

        const paymentData = {
            tran_id: transactionId, // Required: Unique Transaction ID
            store_id: process.env.SSL_STORE_ID, // Required: Your SSLCommerz Store ID - Use environment variable for security
            store_passwd: process.env.SSL_STORE_PASSWORD, // Required: Your SSLCommerz Store Password - Use environment variable
            total_amount: numericalPrice, // Required: Amount from testDetails - Numerical price only
            currency: 'BDT', // Required: Currency (Bangladeshi Taka)
            success_url: 'http://localhost:5173/payment/success', // Frontend success URL - Adjust for your frontend route
            fail_url: 'http://localhost:5173/payment/fail', // Frontend fail URL - Adjust for your frontend route
            cancel_url: 'http://localhost:5173/payment/cancel', // Frontend cancel URL - Adjust for your frontend route
            ipn_url: 'http://localhost:5001/api/health-checkup-payment/ipn', //  IPN URL (for server-to-server notification, VERY IMPORTANT for real applications)
            cus_name: 'Customer Name Placeholder', // Optional: Customer Name - You can get this from user info later
            cus_email: 'customer_placeholder@example.com', // Optional: Customer Email - Get from user info
            cus_add1: 'Customer Address Placeholder', // Optional: Customer Address
            cus_city: 'Dhaka', // Optional: Customer City - Default or get from user info
            cus_country: 'Bangladesh', // Optional: Customer Country - Default
            cus_phone: '01XXXXXXXXX', // Optional: Customer Phone - Get from user info
            shipping_method: 'NO', // Optional:  Shipping method (not applicable for health checkups usually)
            product_name: testDetails.name, // Product name - Use the test name from testDetails
            product_category: 'Diagnostic Test', // Product category -  Fixed for health checkups
            product_profile: 'health-checkup', // Product profile - Fixed for health checkups
            // ... you can add more optional parameters as needed, check SSLCommerz documentation
        };

        console.log("Payment Data Payload:", paymentData); // Log Payment Data Payload

        // 5. **Make API call to SSLCommerz using axios**
        const sslCommerzApiUrl = process.env.SSL_TRANSACTION_API; // Get API URL from .env

        try {
            const response = await axios.post(sslCommerzApiUrl, paymentData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // Content-Type for form-urlencoded data
                },
                params: {  // Parameters for the request URL (if needed, in this case, for format=json)
                    format: 'json' // Request response in JSON format (if supported by SSLCommerz - check docs)
                }
            });

            console.log("SSLCommerz API Response:", response); // Log SSLCommerz API Response

            // 6. Handle SSLCommerz API response
            const sslCommerzResponseData = response.data;

            if (sslCommerzResponseData && sslCommerzResponseData.GatewayPageURL) {
                // Payment initiation SUCCESSFUL!
                // SSLCommerz responded with a GatewayPageURL - this is the URL to redirect the user to.
                const paymentUrl = sslCommerzResponseData.GatewayPageURL;
                res.json({ paymentUrl }); // Send the payment URL back to frontend
            } else {
                // Payment initiation FAILED!
                // No GatewayPageURL in response. Check SSLCommerz response for error details.
                console.error('SSLCommerz Payment Initiation Failed:', sslCommerzResponseData);
                return res.status(400).json({ error: 'Payment initiation failed', sslCommerzResponse: sslCommerzResponseData }); // Send error response to frontend
            }

        } catch (error) {
            // Error during the API call to SSLCommerz itself (e.g., network error, server error)
            console.error('Error calling SSLCommerz API:', error);
            console.error('Full Axios Error Object:', error);
            return res.status(500).json({ error: 'Error initiating payment', details: error.message }); // Send error response to frontend
        }


    } catch (error) {
        // Error in the overall /initiate route handler logic
        console.error('Payment initiation error for health checkup:', error);
        res.status(500).json({ error: 'Failed to initiate payment for health checkup.' });
    }
});

// **IMPORTANT: You need to create the IPN endpoint handler here!**
// This is where you will receive and process IPN requests from SSLCommerz.
router.post('/ipn', async (req, res) => {
    // **IMPLEMENT IPN HANDLING LOGIC HERE**
    // 1. Verify IPN message authenticity (SSLCommerz provides methods for this)
    // 2. Extract payment information from req.body (SSLCommerz will send data in the body)
    // 3. Update your database based on payment status (e.g., update "payments" collection)
    // 4. Respond to SSLCommerz with HTTP 200 OK
    console.log("Received IPN request:", req.body); // For now, just log the IPN data
    res.status(200).send('IPN Received'); // Respond with 200 OK to acknowledge IPN
});


export default router;
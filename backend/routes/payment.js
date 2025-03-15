// backend/routes/payments.js
import express from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";
import Payment from "../model/payment.js"; // Import your Payment model

const router = express.Router();

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = process.env.NODE_ENV === 'production' // Use NODE_ENV for production check

const FRONTEND_URL = process.env.ALLOWED_ORIGIN;
const BACKEND_URL = process.env.BASE_URL;

router.post("/initiate-payment", async (req, res) => {
    const { amount, customerName, customerEmail, customerPhone, doctorId, userId } = req.body;

    if (!amount || !customerName || !customerEmail || !customerPhone || !doctorId || !userId) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    const transactionId = "TXN_" + uuidv4(); // Unique Transaction IDs

    const data = {
        total_amount: amount,
        currency: "BDT",
        tran_id: transactionId,
        success_url: `${BACKEND_URL}/api/payment/success?tran_id=${transactionId}`, // Backend success URL
        fail_url: `${BACKEND_URL}/api/payment/fail?tran_id=${transactionId}`, // Backend fail URL
        cancel_url: `${BACKEND_URL}/api/payment/cancel?tran_id=${transactionId}`, // Backend cancel URL
        cus_name: customerName,
        cus_email: customerEmail,
        cus_phone: customerPhone,
        product_name: "Doctor Consultation",
        product_category: "Healthcare",
        product_profile: "general",
        shipping_method: "NO",
        multi_card_name: "",
        value_a: doctorId,    // Store doctor ID
        value_b: userId,     // Store user ID
        value_c: "Doctor Consultation Payment",
        value_d: "Additional Info",
        ipn_url: `${BACKEND_URL}/api/payment/ipn` // IPN url
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    try {
        const apiResponse = await sslcz.init(data);

        if (apiResponse?.GatewayPageURL) {
            // Store payment information in the database with initial status "pending"
            const paymentData = {
                transactionId: transactionId,
                amount: amount,
                customerName: customerName,
                customerEmail: customerEmail,
                customerPhone: customerPhone,
                doctorId: doctorId,
                userId: userId,
                paymentStatus: "pending", // Initial status
                tran_id: transactionId,
                val_id: apiResponse.val_id
            };

            const newPayment = new Payment(paymentData);
            await newPayment.save();

            res.json({ url: apiResponse.GatewayPageURL }); // Send the URL to the frontend
        } else {
            console.error("SSLCommerz initialization failed:", apiResponse);
            res.status(500).json({ error: "Payment initialization failed", details: apiResponse });
        }

    } catch (error) {
        console.error("Error initiating payment:", error);
        res.status(500).json({ error: "Payment initialization failed", details: error.message });
    }
});

// Success Route
router.get("/success", async (req, res) => {
    const tran_id = req.query.tran_id;
    try {
        const updatedPayment = await Payment.findOneAndUpdate(
            { tran_id: tran_id },
            { paymentStatus: "completed" },
            { new: true }
        );
        if(updatedPayment){
          console.log("Payment updated to completed");
          res.redirect(`${FRONTEND_URL}/payment/success?transactionId=${tran_id}`);
        } else {
            console.log("Payment not found");
            res.status(404).send("Payment Not Found")
        }
    } catch (error) {
        console.error("Error updating payment:", error);
        res.status(500).send("Internal Server Error");
    }

});

// Fail Route
router.get("/fail", async (req, res) => {
    const tran_id = req.query.tran_id;
    try {
        const updatedPayment = await Payment.findOneAndUpdate(
            { tran_id: tran_id },
            { paymentStatus: "failed" },
            { new: true }
        );
        if(updatedPayment){
          console.log("Payment updated to failed");
          res.redirect(`${FRONTEND_URL}/payment/fail?transactionId=${tran_id}`);
        } else {
            console.log("Payment not found");
            res.status(404).send("Payment Not Found")
        }
    } catch (error) {
        console.error("Error updating payment:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Cancel Route
router.get("/cancel", async (req, res) => {
    const tran_id = req.query.tran_id;
    try {
        const updatedPayment = await Payment.findOneAndUpdate(
            { tran_id: tran_id },
            { paymentStatus: "cancelled" },
            { new: true }
        );
        if(updatedPayment){
          console.log("Payment updated to cancelled");
          res.redirect(`${FRONTEND_URL}/payment/cancel?transactionId=${tran_id}`);
        } else {
            console.log("Payment not found");
            res.status(404).send("Payment Not Found")
        }
    } catch (error) {
        console.error("Error updating payment:", error);
        res.status(500).send("Internal Server Error");
    }
});

//IPN route
router.post("/ipn", async (req, res) => {

    const paymentData = req.body;

     if(paymentData && paymentData.status === 'VALID'){
        const tranId = paymentData.tran_id;
         try {
          const updatedPayment = await Payment.findOneAndUpdate(
              { tran_id: tranId },
              {
                paymentStatus: 'completed',
                card_type: paymentData.card_type,
                currency_type: paymentData.currency_type,
                store_amount: paymentData.store_amount

              },
              { new: true }
          );
          if(updatedPayment){
            console.log("Payment Updated");
            res.status(200).send("IPN Handled Successfully");
          } else {
              console.log("Payment Not Found");
              res.status(404).send("Payment Not Found")
          }

         } catch (error) {
          console.error("Error updating payment:", error);
          res.status(500).send("Internal Server Error");
         }


     } else {
        console.log("Invalid IPN Request");
        res.status(400).send("Invalid IPN Request");
     }
});

export default router;
import express from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const store_id = "seren67ae2bc688094";
const store_passwd = "YOUR_STORE_PASSWORD";
const is_live = false; // Change to true in production

router.post("/initiate-payment", async (req, res) => {
    const { amount, customerName, customerEmail, customerPhone } = req.body;

    const transactionId = "TXN_" + uuidv4(); // Unique Transaction ID

    const data = {
        total_amount: amount,
        currency: "BDT",
        tran_id: transactionId,
        success_url: "http://localhost:5001/api/payment/success",
        fail_url: "http://localhost:5001/api/payment/fail",
        cancel_url: "http://localhost:5001/api/payment/cancel",
        cus_name: customerName,
        cus_email: customerEmail,
        cus_phone: customerPhone,
        product_name: "Doctor Consultation",
        product_category: "Healthcare",
        product_profile: "general",
        shipping_method: "NO",
        multi_card_name: "",
        value_a: "custom_value_a",
        value_b: "custom_value_b",
        value_c: "custom_value_c",
        value_d: "custom_value_d"
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(apiResponse => {
        let paymentGatewayUrl = apiResponse.GatewayPageURL;
        res.json({ url: paymentGatewayUrl });
    }).catch(error => res.status(500).json({ error: "Payment initialization failed" }));
});

export default router; // Change this line
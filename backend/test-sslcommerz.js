import SSLCommerzPayment from 'sslcommerz-nodejs';
import dotenv from 'dotenv';
dotenv.config();

async function testSSLCommerz() {
    try {
        const sslcommerze = new SSLCommerzPayment({
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASSWORD,
            isSandboxMode: process.env.SSL_IS_LIVE === 'false'
        });

        console.log("SSLCommerz object created:", sslcommerze); // Log the created object

        if (typeof sslcommerze.init_transaction === 'function') { // **MODIFIED: Check for init_transaction**
            console.log("sslcommerze.init_transaction is a function - Good!");
        } else {
            console.error("ERROR: sslcommerze.init_transaction is NOT a function!");
        }

    } catch (error) {
        console.error("Error during SSLCommerz test:", error);
    }
}

testSSLCommerz();
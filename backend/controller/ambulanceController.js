import AmbulanceBooking from "../model/AmbulanceBooking.js";
import SSLCommerzPayment from "sslcommerz-lts";

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = process.env.SSL_IS_LIVE === "true";
const frontend_url = process.env.ALLOWED_ORIGIN;
const backend_url = process.env.API_BASE_URL;

export const createAmbulanceRequest = async (req, res) => {
  try {
    // Validation
    const {
      ambulanceType,
      fromLocation,
      destination,
      needDoctor,
      bookingDate,
      needRoundTrip,
      patientName,
      patientPhone,
    } = req.body;

    if (
      !ambulanceType ||
      !fromLocation ||
      !destination ||
      !patientName ||
      !patientPhone
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    const newBooking = new AmbulanceBooking({
      userId: req.user._id,
      ambulanceType,
      fromLocation,
      destination,
      needDoctor,
      bookingDate,
      needRoundTrip,
      patientName,
      patientPhone,
      bookingStatus: "pending",
      paymentStatus: "pending",
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: "Ambulance request submitted, proceed to payment.",
      bookingId: savedBooking._id,
    });
  } catch (error) {
    console.error("Error submitting ambulance request (controller):", error);
    res.status(500).json({
      message: "Failed to submit ambulance request.",
      error: error.message,
    });
  }
};

// Controller function for initiating payment
export const initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res
        .status(400)
        .json({ message: "Booking ID is required for payment." });
    }

    const booking = await AmbulanceBooking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    const ambulanceFare = 500;

    // **SSL Payment
    const data = {
      total_amount: ambulanceFare,
      currency: "BDT",
      tran_id: bookingId.toString(),
      success_url: `${backend_url}/ambulance/payment/success?bookingId=${bookingId}`,
      fail_url: `${backend_url}/ambulance/payment/fail?bookingId=${bookingId}`,
      cancel_url: `${backend_url}/ambulance/payment/cancel?bookingId=${bookingId}`,
      ipn_url: `${backend_url}/api/ambulance/payment/ipn`,
      cus_name: booking.patientName,
      cus_email: "test@example.com",
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_postcode: "1209",
      cus_country: "Bangladesh",
      cus_phone: booking.patientPhone,
      shipping_method: "NO",
      //   ship_name: "N/A",
      //   ship_add1: "N/A",
      //   ship_city: "N/A",
      //   ship_country: "N/A",
      //   ship_postcode: "N/A",
      product_name: "Ambulance Service Booking",
      product_category: "Healthcare",
      product_profile: "physical-goods",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz
      .init(data)
      .then((apiResponse) => {
        let gateway_url = apiResponse.GatewayPageURL;
        res
          .status(200)
          .json({ message: "Payment initiated.", gatewayURL: gateway_url });
      })
      .catch((error) => {
        console.error("SSLCommerz init error:", error);
        res.status(500).json({
          message: "Failed to initiate payment with SSLCommerz.",
          error: error.message,
        });
      });
  } catch (error) {
    console.error("Error initiating payment (controller):", error);
    res
      .status(500)
      .json({ message: "Failed to initiate payment.", error: error.message });
  }
};

export const paymentSuccessCallback = async (req, res) => {
  try {
    const { bookingId, tran_id, val_id } = req.query;

    if (!bookingId || !tran_id || !val_id) {
      return res
        .status(400)
        .json({ message: "Invalid payment callback parameters." });
    }

    const sslcz = new sslcommerz(store_id, store_passwd, is_live);

    sslcz.validate(val_id, tran_id, "BDT", 100).then(async (validation) => {
      if (validation && validation.status === "VALID") {
        await AmbulanceBooking.findByIdAndUpdate(bookingId, {
          paymentStatus: "paid",
          bookingStatus: "confirmed",
          paymentDetails: validation,
        });
        res.redirect(
          `${frontend_url}/ambulance/payment/success?bookingId=${bookingId}`
        );
      } else {
        await AmbulanceBooking.findByIdAndUpdate(bookingId, {
          paymentStatus: "failed",
          bookingStatus: "pending",
        });
        res.redirect(
          `${frontend_url}/ambulance/payment/fail?bookingId=${bookingId}&error=PaymentVerificationFailed`
        );
      }
    });
  } catch (error) {
    console.error("Error in payment success callback (controller):", error);
    res.status(500).json({
      message: "Payment success callback error.",
      error: error.message,
    });
  }
};

export const paymentFailCallback = async (req, res) => {
  try {
    const { bookingId } = req.query;

    await AmbulanceBooking.findByIdAndUpdate(bookingId, {
      paymentStatus: "failed",
      bookingStatus: "pending",
    });

    res.redirect(
      `${frontend_url}/ambulance/payment/fail?bookingId=${bookingId}&error=PaymentFailedByUser`
    );
  } catch (error) {
    console.error("Error in payment fail callback (controller):", error);
    res
      .status(500)
      .json({ message: "Payment fail callback error.", error: error.message });
  }
};

export const paymentCancelCallback = async (req, res) => {
  try {
    const { bookingId } = req.query;

    await AmbulanceBooking.findByIdAndUpdate(bookingId, {
      bookingStatus: "cancelled",
    });

    res.redirect(
      `${frontend_url}/ambulance/payment/cancel?bookingId=${bookingId}&error=PaymentCancelledByUser`
    );
  } catch (error) {
    console.error("Error in payment cancel callback (controller):", error);
    res.status(500).json({
      message: "Payment cancel callback error.",
      error: error.message,
    });
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await AmbulanceBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ booking: booking }); // Send booking details wrapped in 'booking' object
  } catch (error) {
    console.error("Error fetching booking details (controller):", error);
    res.status(500).json({
      message: "Failed to fetch booking details.",
      error: error.message,
    });
  }
};

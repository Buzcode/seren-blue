const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // Reference to the Doctor model
        required: true
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment', // Reference to the Appointment model
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD' // Or 'BDT' as appropriate
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentGateway: {
        type: String,
        required: true
    },
    transactionId: {
        type: String
    },
    paymentStatus: {
        type: String,
        enum: ['Success', 'Pending', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    paymentDate: {
        type: Date
    },
    paymentDetails: {  // Store card or banking details(HASHED)
        cardType: {
            type: String,
        },
        cardNumber: {
            type: String, // Store only last 4 digits or tokenized data
        },
        cardHolderName: {
            type: String
        },
        expiryDate: {
            type: String,
        },
    },
    invoiceNumber: {
        type: String
    },
    description: {
        type: String
    },
    otp: {
      type: String  // Hashed OTP
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
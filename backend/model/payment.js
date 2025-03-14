// backend/models/Payment.js (ES Modules syntax)
import mongoose from 'mongoose';
const { Schema } = mongoose; // Destructure Schema for cleaner code

const paymentSchema = new Schema({ // Use Schema instead of mongoose.Schema
    userId: {
        type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId
        ref: 'User',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
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

export default Payment; // Change to export default for ES Modules
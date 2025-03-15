<<<<<<< Updated upstream
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
=======
// backend/models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
>>>>>>> Stashed changes
    },
    amount: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',  // Assuming you have a Doctor model
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    },
      tran_id: {
        type: String,
        required: true
    },
    val_id: {
        type: String,
    },
    card_type: {
        type: String,
    },
    currency_type: {
        type: String,
    },
    store_amount: {
        type: String,
    },

}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

<<<<<<< Updated upstream
export default Payment; // Change to export default for ES Modules
=======
export default Payment;
>>>>>>> Stashed changes

import mongoose from 'mongoose'; // Changed from require to import for ESM

const ambulanceBookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to Patient User model
    ambulanceType: String,
    fromLocation: String,
    destination: String,
    needDoctor: Boolean,
    bookingDate: Date,
    needRoundTrip: Boolean,
    patientName: String,
    patientPhone: String,
    bookingStatus: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'cancelled', 'completed'] }, // Booking status
    paymentStatus: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed'] }, // Payment status
    paymentDetails: Object, // Store payment transaction details (optional)
    bookingDateTime: { type: Date, default: Date.now }
    // Add other relevant fields as needed (e.g., booking ID, total cost, etc.)
});

const AmbulanceBooking = mongoose.model('AmbulanceBooking', ambulanceBookingSchema);

export default AmbulanceBooking; // **Modified line: Changed to export default for ESM compatibility**
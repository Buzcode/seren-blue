// backend/model/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming doctors are stored in 'Users' collection
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming patients are also stored in 'Users' collection (or create a separate 'Patients' collection)
    required: true,
  },
  appointmentTime: { // Changed field name to appointmentTime (camelCase convention)
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
  status: { // Added a 'status' field for appointment status (optional)
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled'], // Example statuses
    default: 'scheduled', // Default status is 'scheduled'
  },
  // ... add other appointment fields as needed (e.g., 'reasonForVisit', 'duration', etc.) ...
}, { timestamps: true }); // Add createdAt and updatedAt timestamps

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
import mongoose from 'mongoose';

const doctorAvailabilitySchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your users collection model is named 'User'
    required: true,
  },
  day_of_week: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  is_available: {
    type: Boolean,
    default: true, // Default to available
  },
}, {
  collection: 'doctorAvailability'
});

// Remove or comment out this line: const DoctorAvailability = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);

export default doctorAvailabilitySchema; // <-- MODIFIED: Export the SCHEMA, not the model
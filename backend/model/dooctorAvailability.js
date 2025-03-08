// backend/model/doctorAvailability.js
import mongoose from 'mongoose';

const dooctorAvailabilitySchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your user model is named 'User' and stores doctor info
    required: true,
    unique: true, // Ensure only one availability document per doctor
  },
  availability: {
    monday: { type: Boolean, default: true },
    tuesday: { type: Boolean, default: true },
    wednesday: { type: Boolean, default: true },
    thursday: { type: Boolean, default: true },
    friday: { type: Boolean, default: true },
    saturday: { type: Boolean, default: true },
    sunday: { type: Boolean, default: true },
  },
});

const DoctorAvailability = mongoose.model('DoctorAvailability', dooctorAvailabilitySchema, 'doctorAvailabilities'); // Explicit collection name

export default DoctorAvailability;
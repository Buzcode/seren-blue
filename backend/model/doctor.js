// backend/model/doctor.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  qualifications: { type: String },
  yearsOfExperience: { type: Number },
  about: { type: String },
  appointmentFee: { type: Number },
  availability: {
    monday: { type: Boolean, default: true },
    tuesday: { type: Boolean, default: true },
    wednesday: { type: Boolean, default: true },
    thursday: { type: Boolean, default: true },
    friday: { type: Boolean, default: true },
    saturday: { type: Boolean, default: true },
    sunday: { type: Boolean, default: true },
  },
  patientLimit: { type: Number, default: 10 },
  // Add fields for authentication (username/email and password)
  email: { type: String, required: true, unique: true }, // Assuming email as username
  password: { type: String, required: true }, // **Important: Hash this before storing in production!**

  // ... other doctor profile fields you might have
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
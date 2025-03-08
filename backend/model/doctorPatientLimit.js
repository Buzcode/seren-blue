// backend/model/doctorPatientLimit.js
import mongoose from 'mongoose';

const doctorPatientLimitSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your user model is named 'User'
    required: true,
    unique: true, // Ensure only one patient limit document per doctor
  },
  patientLimit: { type: Number, default: 10 },
});

const DoctorPatientLimit = mongoose.model('DoctorPatientLimit', doctorPatientLimitSchema, 'doctorPatientLimits'); // Explicit collection name

export default DoctorPatientLimit;
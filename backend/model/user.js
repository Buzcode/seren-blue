// backend/model/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { // Email will be used as username
    type: Schema.Types.String,
    required: true,
    unique: true,
    trim: true, // Trim whitespace
    lowercase: true, // Store email in lowercase
    validate: { // Optional: Add more robust email validation here if needed
      validator: validator.isEmail, // Use validator library for email validation (ensure you have 'validator' installed)
      message: 'Invalid email format',
    },
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  displayName: { // Optional display name - can be auto-generated or set by user later
    type: String,
    trim: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  role: { 
    type: String,
    enum: ['patient', 'doctor', 'admin'], 
    default: 'patient',                 
  },
  isPatient: { // Flag to indicate if user is a patient (for public signup)
    type: Boolean,
    default: false,
  },
  isActive: { // Flag to indicate if account is active (e.g., for email verification or admin deactivation)
    type: Boolean,
    default: true,
  },
  phone: { // Added phone field
    type: String,
    trim: true,
  },
  address: { // Added address object
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
  },
  gender: { // Added gender field
    type: String,
    enum: ['Male', 'Female', 'Other', ''], // Allowed gender values, include '' for "not specified"
    default: '', // Default gender is "not specified"
  },
  birthDate: { // Added birthDate field
    type: Date,
  },
}, { timestamps: true });

const User = model("User", userSchema);
export default User;
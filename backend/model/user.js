// backend/model/user.js
import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator'; // <-- CORRECTED IMPORT - ADDED validator IMPORT

const userSchema = new Schema({
  username: { // Email will be used as username
    type: Schema.Types.String,
    required: true,
    unique: true,
    trim: true, // Trim whitespace
    lowercase: true, // Store email in lowercase
    validate: { // Optional: Add more robust email validation here if needed
      validator: validator.isEmail, 
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
  displayName: { // Optional display name
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
  isPatient: { // Flag for patient users
    type: Boolean,
    default: false,
  },
  isActive: { // Flag for account activity
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
    enum: ['Male', 'Female', 'Other', ''],
    required: true,  // <--- ADDED required: true to make Gender MANDATORY in database
    default: '',
  },
  birthDate: { // Added birthDate field
    type: Date,
  },
}, { timestamps: true });

const User = model("User", userSchema);
export default User;
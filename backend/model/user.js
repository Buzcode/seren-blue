import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    trim: true,
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
  displayName: {
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
  isPatient: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    required: true,
    default: '',
  },
  birthDate: {
    type: Date,
  },
  specialization: { // ADDED: Doctor's specialization
    type: String,
    trim: true,
  },
  profilePicture: { // ADDED: Doctor's profile picture URL or path
    type: String,
    trim: true,
  },
  degree: { // ADDED: Doctor's degree
    type: String,
    trim: true,
  },
  about: { // ADDED: Doctor's about information
    type: String,
    trim: true,
  },
}, { timestamps: true });

const User = model("User", userSchema);
export default User;
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  displayName: Schema.Types.String,
  password: {
    type: Schema.Types.String,
    required: true,
  },
  role: { // <-- ADD THIS ROLE FIELD
    type: String,
    enum: ['patient', 'doctor', 'admin'], // Allowed roles: patient, doctor, admin
    default: 'patient',                 // Default role is 'patient'
  },
});

const User = model("User", userSchema);
export default User;
// backend/controller/doctorController.js

import Appointment from "../model/Appointment.js"; // <-- Import your Appointment model (adjust path if needed)

export const getMyAppointmentsController = async (req, res) => { // <-- ADDED 'export const' to export the function!
  try {
    const doctorId = req.user.userId; // Extract doctor's ID from req.user (set by checkToken middleware)

    console.log("Fetching appointments for doctor ID:", doctorId); // <-- ADDED: Logging doctorId

    // Fetch appointments from database for this doctorId
    const appointments = await Appointment.find({ doctorId: doctorId })
      .populate('patient', 'firstName lastName') // Populate patient details (adjust fields as needed)
      .sort({ appointmentTime: 1 }); // Sort appointments by time (optional)

    console.log("Appointments fetched:", appointments); // <-- ADDED: Logging fetched appointments

    res.json(appointments); // Send appointments in JSON response

  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" }); // Send 500 error response
  }
};
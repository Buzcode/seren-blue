// backend/controllers/appointmentController.js

// backend/controllers/appointmentController.js

import Appointment from '../model/Appointment.js'; // Corrected import path to model directory
import Doctor from '../model/doctor.js';       // Corrected import path to model directory
import User from '../model/user.js';           // Corrected import path to model director  

// Function to get appointments for the logged-in user
export const getMyAppointments = async (req, res) => { // Changed exports. to export const
  try {
    if (!req.user || !req.user._id) { // **CHECK IF req.user AND req.user._id are defined**
      return res.status(401).json({ success: false, message: "Unauthorized - User not authenticated" }); // Return 401 if not authenticated
    }
    const userId = req.user._id; // Assuming you have user authentication and access userId from req.user

    const appointments = await Appointment.find({ patientId: userId }) // Changed to patientId to match your schema
      .populate('doctorId', 'name specialty') // Populate doctorId to get doctor's name and specialty
      .sort({ appointmentTime: 1 }); // Sort appointments by time

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ success: false, message: "Failed to fetch appointments" });
  }
};

// Function to book a new appointment
export const bookAppointment = async (req, res) => { // Changed exports. to export const
  try {
    const { doctorId, appointmentTime, notes } = req.body;
    const patientId = req.user._id; // Assuming logged-in user is the patient

    // **Important Validation:**
    // You should add more robust validation here in a real application
    if (!doctorId || !appointmentTime || !patientId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if the doctor and patient exist (optional but recommended)
    const doctor = await Doctor.findById(doctorId);
    const patient = await User.findById(patientId); // Assuming users are both doctors and patients
    if (!doctor || !patient) {
      return res.status(404).json({ success: false, message: "Doctor or patient not found" });
    }

    const newAppointment = new Appointment({
      doctorId,
      patientId,
      appointmentTime,
      notes,
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({ // 201 Created status for successful creation
      success: true,
      data: savedAppointment,
      message: "Appointment Booked Successfully!", // Optional success message
    });

  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ success: false, message: "Failed to book appointment" });
  }
};
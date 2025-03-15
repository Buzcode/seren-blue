import Appointment from "../model/Appointment.js"; // <-- Import your Appointment model (adjust path if needed)
import User from "../model/user.js"; // Import the User model

export const getMyAppointmentsController = async (req, res) => {
  try {
    const doctorId = req.user.userId; // Extract doctor's ID from req.user (set by checkToken middleware)


  
    console.log("Fetching appointments for doctor ID:", doctorId); // <-- ADDED: Logging doctorId

    // Fetch appointments from database for this doctorId
    const appointments = await Appointment.find({ doctorId: doctorId })
      .populate({
        path: 'patient',
        select: 'firstName lastName' // Populate patient details (adjust fields as needed)
      })
      .populate({
        path: 'doctor',  // Populate the doctor field in the appointment
        model: User,       // Specify the User model
        select: '_id name speciality', // Select only the required doctor fields
      })
      .sort({ appointmentTime: 1 }); // Sort appointments by time (optional)

    console.log("Appointments fetched:", appointments); // <-- ADDED: Logging fetched appointments

    res.json(appointments); // Send appointments in JSON response

  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" }); // Send 500 error response
  }
};
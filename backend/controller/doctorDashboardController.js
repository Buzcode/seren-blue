import Doctor from '../model/doctor.js'; // Import your Doctor model
import DoctorAvailability from '../model/dooctorAvailability.js'; // Import new Availability model
import DoctorPatientLimit from '../model/doctorPatientLimit.js';   // Import new PatientLimit model
import User from '../model/user.js'; // Assuming your user model is named 'User' - adjust if different
const doctorDashboardController = {
    getDoctorProfile: async (req, res) => {
        console.log("getDoctorProfile controller function called!");
        try {
          const doctorId = req.params.doctorId;
          console.log(`doctorId received: ${doctorId}`);
    
          // Fetch doctor info from 'users' collection
          const userProfile = await User.findById(doctorId); // Fetch from User model
          console.log(`User profile found: ${userProfile}`);
    
          if (!userProfile) {
            console.log("Doctor user profile not found");
            return res.status(404).json({ message: 'Doctor user profile not found' }); // Changed message
          }
    
          // Fetch availability from DoctorAvailability collection
          const availabilityData = await DoctorAvailability.findOne({ doctorId: doctorId }); // FindOne based on doctorId
          const availability = availabilityData ? availabilityData.availability : null; // Extract availability object
    
          // Fetch patient limit from DoctorPatientLimit collection
          const patientLimitData = await DoctorPatientLimit.findOne({ doctorId: doctorId }); // FindOne based on doctorId
          const patientLimit = patientLimitData ? patientLimitData.patientLimit : null; // Extract patientLimit value
    
          const doctorProfile = { // Construct combined profile object
            _id: userProfile._id,
            username: userProfile.username,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            displayName: userProfile.displayName,
            role: userProfile.role,
            // ... include other relevant fields from userProfile ...
            availability: availability,
            patientLimit: patientLimit,
          };
    
          res.status(200).json(doctorProfile);
          console.log("Combined doctor profile sent successfully");
    
        } catch (error) {
          console.error('Error fetching doctor profile:', error);
          res.status(500).json({ message: 'Failed to fetch doctor profile', error: error.message });
        }
      },
      updateDoctorAvailability: async (req, res) => {
        try {
          const doctorId = req.params.doctorId;
          const availabilityData = req.body.availability;
    
          // Find and update, or create if not exists
          let doctorAvailability = await DoctorAvailability.findOne({ doctorId: doctorId });
    
          if (!doctorAvailability) {
            doctorAvailability = new DoctorAvailability({ doctorId: doctorId, availability: availabilityData });
          } else {
            doctorAvailability.availability = availabilityData;
          }
    
          await doctorAvailability.save();
    
          res.status(200).json({ message: 'Availability updated successfully', availability: doctorAvailability.availability }); // Send back updated availability
        } catch (error) {
          console.error('Error updating availability:', error);
          res.status(500).json({ message: 'Failed to update availability', error: error.message });
        }
      },

        updateDoctorPatientLimit: async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const patientLimit = req.body.patientLimit;

      // Find and update, or create if not exists
      let doctorPatientLimitDoc = await DoctorPatientLimit.findOne({ doctorId: doctorId });

      if (!doctorPatientLimitDoc) {
        doctorPatientLimitDoc = new DoctorPatientLimit({ doctorId: doctorId, patientLimit: patientLimit });
      } else {
        doctorPatientLimitDoc.patientLimit = patientLimit;
      }

      await doctorPatientLimitDoc.save();

      res.status(200).json({ message: 'Patient limit updated successfully', patientLimit: doctorPatientLimitDoc.patientLimit }); // Send back updated patientLimit
    } catch (error) {
      console.error('Error updating patient limit:', error);
      res.status(500).json({ message: 'Failed to update patient limit', error: error.message });
    }
  },
};

export default doctorDashboardController;
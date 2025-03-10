import Doctor from '../model/doctor.js'; // Import your Doctor model - **Note:** You might not need this import anymore
import DoctorAvailability from '../model/dooctorAvailability.js';
import DoctorPatientLimit from '../model/doctorPatientLimit.js';
import User from '../model/user.js';

const doctorDashboardController = {
    getAllDoctors: async (req, res) => { // ADDED: getAllDoctors function
        try {
            const doctors = await User.find({ role: 'doctor' })
                .select('displayName specialization profilePicture'); // Select only necessary fields

            res.status(200).json(doctors); // Send the doctors data as JSON response
        } catch (error) {
            console.error('Error fetching all doctors:', error);
            res.status(500).json({ message: 'Failed to fetch doctors', error: error.message });
        }
    },
    getDoctorProfile: async (req, res) => {
        console.log("getDoctorProfile controller function called!");
        try {
            const doctorId = req.params.doctorId;
            console.log(`doctorId received: ${doctorId}`);

            // Fetch doctor info from 'users' collection - MODIFIED to select specialization, profilePicture, degree, and about
            const userProfile = await User.findById(doctorId).select('displayName specialization profilePicture degree about'); // Fetch from User model - SELECTING degree and about now
            console.log(`User profile found: ${userProfile}`);

            if (!userProfile) {
                console.log("Doctor user profile not found");
                return res.status(404).json({ message: 'Doctor user profile not found' }); // Changed message
            }

            // Fetch availability from DoctorAvailability collection
            const availabilityData = await DoctorAvailability.findOne({ doctorId: doctorId });
            const availability = availabilityData ? availabilityData.availability : null;

            // Fetch patient limit from DoctorPatientLimit collection
            const patientLimitData = await DoctorPatientLimit.findOne({ doctorId: doctorId });
            const patientLimit = patientLimitData ? patientLimitData.patientLimit : null;

            const doctorProfile = { // Construct combined profile object - MODIFIED to include availability
                _id: userProfile._id,
                username: userProfile.username,
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                displayName: userProfile.displayName,
                role: userProfile.role,
                specialization: userProfile.specialization,
                profilePicture: userProfile.profilePicture,
                degree: userProfile.degree,
                about: userProfile.about,
                availability: availability, // ADDED: availability to doctorProfile response
                patientLimit: patientLimit,
                experience: "10 Years", // Placeholder - REMOVED: Placeholder degree - Keeping experience and fees as placeholder for now
                fees: 1000, // Placeholder - REMOVED: Placeholder about - Keeping experience and fees as placeholder for now
            };

            res.status(200).json(doctorProfile);
            console.log("Combined doctor profile sent successfully");

        } catch (error) {
            console.error('Error fetching doctor profile:', error); // Keep basic error log
            console.error('Full error object:', error);
            console.error('Error message:', error.message);
            if (error.stack) {
                console.error('Error stack trace:', error.stack);
            }
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
import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import doctorAvailabilitySchema from '../model/DoctorAvailability.js';
import checkToken from '../middlewares/checkToken.js'; // <-- IMPORT checkToken middleware

const DoctorAvailability = mongoose.model('DoctorAvailability', doctorAvailabilitySchema, 'doctorAvailability');

// GET doctor's availability - **Apply checkToken middleware**
router.get('/availability', checkToken, async (req, res) => { // <-- Apply checkToken middleware here
  try {
    // **Get doctorId from req.doctor.id (from checkToken middleware):**
    const doctorId = req.doctor.id; // <-- Get doctorId from req.doctor.id

    const availability = await DoctorAvailability.find({ doctor_id: doctorId });

    if (availability && availability.length > 0) {
      res.json(availability);
    } else {
      res.status(404).json({ message: 'Availability not found for this doctor' });
    }
  } catch (error) {
    console.error('Error fetching doctor availability:', error);
    res.status(500).json({ message: 'Failed to fetch availability', error: error.message });
  }
});

// PUT doctor's availability (for updates) - **Apply checkToken middleware**
router.put('/availability', checkToken, async (req, res) => { // <-- Apply checkToken middleware here
  try {
    console.log("Request Body received:", req.body);

    // **Get doctorId from req.doctor.id (from checkToken middleware):**
    const doctorId = req.doctor.id; // <-- Get doctorId from req.doctor.id
    const updatedAvailabilityData = req.body;

    await DoctorAvailability.deleteMany({ doctor_id: doctorId })
      .then(deleteResult => {
        console.log("deleteMany successful:", deleteResult);
      })
      .catch(deleteError => {
        console.error("Error during deleteMany:", deleteError);
        throw deleteError;
      });

    await DoctorAvailability.insertMany(updatedAvailabilityData.map(item => ({
      ...item,
      doctor_id: doctorId
    })))
      .then(insertResult => {
        console.log("insertMany successful:", insertResult);
      })
      .catch(insertError => {
        console.error("Error during insertMany:", insertError);
        throw insertError;
      });

    res.json({ message: 'Availability updated successfully' });

  } catch (error) {
    console.error('Error updating doctor availability (outer catch):');
    console.error(error);
    res.status(500).json({ message: 'Failed to update availability', error: error.message });
  }
});

// Test route (no changes needed)
router.get('/test-availability', (req, res) => {
  res.json({ message: 'Test availability endpoint is working!' });
});


export default router;
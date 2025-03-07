// reviews.js
import express from 'express';
import mongoose from 'mongoose';
import User from '../model/user.js'; // **IMPORT User model - VERY IMPORTANT!**
                                       // Adjust path if your user.js is in a different folder

const router = express.Router();

// Review Schema
const reviewSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // **MUST BE 'User' (singular, uppercase 'U') to match your model definition**
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

// GET /api/reviews - Fetch all reviews (with populated user data) - CORRECTED POPULATE SYNTAX
router.get('/', async (req, res) => {
    console.log("GET /api/reviews route hit! (with DB and User Population)");
    try {
        // **CORRECTED POPULATE SYNTAX - USING OBJECT WITH 'path' and 'select'**
        const reviews = await Review.find({})
            .populate({
                path: 'user', // Path to populate: 'user' field in Review model
                select: 'firstName lastName' // Select these fields from the User model
            });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews from DB:', error);
        res.status(500).json({ message: 'Failed to fetch reviews from database', error: error.message, detailedError: error }); // Include detailed error for debugging
    }
});

// POST /api/reviews - Submit a new review (with populated user data) - CORRECTED POPULATE SYNTAX
router.post('/', async (req, res) => {
    const { text, userId } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ message: 'Review text is required' });
    }
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required for submitting a review' });
    }

    try {
        const newReview = new Review({ text, user: userId });
        const savedReview = await newReview.save();
        // **CORRECTED POPULATE SYNTAX - USING OBJECT WITH 'path' and 'select'**
        const populatedReview = await Review.findById(savedReview._id)
            .populate({
                path: 'user', // Path to populate: 'user' field in Review model
                select: 'firstName lastName' // Select these fields from the User model
            });
        res.status(201).json(populatedReview);
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ message: 'Failed to save review', error: error.message, detailedError: error }); // Include detailed error for debugging
    }
});

export default router;
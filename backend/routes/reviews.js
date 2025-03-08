import express from 'express';
import mongoose from 'mongoose';
import User from '../model/user.js';
import checkToken from '../middlewares/checkToken.js'; // **Import checkToken middleware**

const router = express.Router();

// Review Schema - MODIFIED to include likedBy array
const reviewSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array to track users who liked
});

const Review = mongoose.model('Review', reviewSchema);

// GET /api/reviews - Fetch all reviews (with populated user data)
router.get('/', async (req, res) => {
    console.log("GET /api/reviews route hit! (with DB and User Population)");
    try {
        const reviews = await Review.find({})
            .populate({
                path: 'user',
                select: 'firstName lastName'
            });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews from DB:', error);
        res.status(500).json({ message: 'Failed to fetch reviews from database', error: error.message, detailedError: error });
    }
});

// POST /api/reviews - Submit a new review
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
        const populatedReview = await Review.findById(savedReview._id)
            .populate({
                path: 'user',
                select: 'firstName lastName'
            });
        res.status(201).json(populatedReview);
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ message: 'Failed to save review', error: error.message, detailedError: error });
    }
});

// POST /api/reviews/:reviewId/like - Like/Unlike a review (TOGGLE functionality) - MODIFIED ROUTE
router.post('/:reviewId/like', checkToken, async (req, res) => { // **Apply checkToken middleware**
    const reviewId = req.params.reviewId;
    const userId = req.userId; // **User ID from checkToken middleware**

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).send('Invalid review ID');
    }
    if (!userId) {
        return res.status(401).send('Unauthorized. User ID required to like/unlike.');
    }

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).send('Review not found');
        }

        const hasLiked = review.likedBy.includes(userId);

        let updatedReview;
        if (hasLiked) {
            // Unlike: Remove user from likedBy and decrement likes
            updatedReview = await Review.findOneAndUpdate(
                { _id: reviewId },
                { $pull: { likedBy: userId }, $inc: { likes: -1 } },
                { new: true }
            ).populate({ path: 'user', select: 'firstName lastName' }).exec();
        } else {
            // Like: Add user to likedBy and increment likes
            updatedReview = await Review.findOneAndUpdate(
                { _id: reviewId },
                { $addToSet: { likedBy: userId }, $inc: { likes: 1 } },
                { new: true }
            ).populate({ path: 'user', select: 'firstName lastName' }).exec();
        }

        if (!updatedReview) {
            return res.status(404).send('Review not found after update (unexpected)');
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        console.error("Error liking/unliking review in backend:", error);
        res.status(500).send('Error liking/unliking review');
    }
});

export default router;
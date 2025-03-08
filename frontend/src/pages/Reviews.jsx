import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState('');
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoadingReviews(true);
            setError(null);
            try {
                // Removed userId from query parameter
                const response = await fetch(`http://localhost:5001/api/reviews`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setReviews(data);
            } catch (e) {
                setError(e);
                console.error("Error fetching reviews:", e);
            } finally {
                setLoadingReviews(false);
            }
        };
        fetchReviews();
    }, [user]); // Re-fetch reviews when user context changes

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        if (newReviewText.trim() !== '') {
            const currentUserId = user?._id;

            if (!currentUserId) {
                alert("You must be logged in to leave a review.");
                return;
            }

            try {
                const response = await fetch('/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: newReviewText, userId: currentUserId }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const newReviewFromServer = await response.json();
                setReviews([newReviewFromServer, ...reviews]);
                setNewReviewText('');
            } catch (e) {
                setError(e);
                console.error("Error submitting review:", e);
            }
        }
    };

    const handleLike = async (reviewId) => {
        const currentUserId = user?._id; // Get current user ID
        if (!currentUserId) {
            alert("You must be logged in to like a review.");
            return;
        }

        try {
            // Removed userId from request body
            const response = await fetch(`/api/reviews/${reviewId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ userId: currentUserId }), // REMOVED
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedReviewFromServer = await response.json();

            const updatedReviews = reviews.map(review => {
                if (review._id === reviewId) {
                    return updatedReviewFromServer;
                }
                return review;
            });
            setReviews(updatedReviews);

        } catch (e) {
            setError(e);
            console.error("Error liking review:", e);
            alert("Failed to like review. Please try again.");
        }
    };

    if (loadingReviews) {
        return <p>Loading reviews...</p>;
    }

    if (error) {
        return <p>Error loading reviews: {error.message}</p>;
    }

    return (
        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-4">Customer Reviews</h1>

            {/* Review Submission Form */}
            <div className="mb-6 p-4 border rounded">
                <h2 className="text-lg font-semibold mb-2">Leave a Review</h2>
                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2">
                    <textarea
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        rows="4"
                        className="border p-2 rounded w-full"
                    />
                    <button type="submit" className="bg-primary text-black py-2 px-4 rounded font-semibold hover:bg-primary-dark">
                        Submit Review
                    </button>
                </form>
            </div>

            {/* Display Reviews */}
            <div>
                <h2 className="text-lg font-semibold mb-2">What others are saying</h2>
                {reviews.length === 0 && !loadingReviews && !error ? (
                    <p>No reviews yet. Be the first to review!</p>
                ) : (
                    <ul className="space-y-4">
                        {reviews.map(review => (
                            <li key={review._id} className="bg-white p-4 rounded shadow">
                                <p className="text-gray-800">{review.text}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="text-sm text-gray-600">
                                        {review.user ? `${review.user.firstName} ${review.user.lastName}` : 'Anonymous User'}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleLike(review._id)}
                                            className="text-gray-500 hover:text-red-500 focus:outline-none"
                                        >
                                            {/* Calculate likedByMe here */}
                                            {review.likedBy && user && review.likedBy.includes(user._id) ? (
                                                <AiFillHeart className="h-5 w-5 text-red-500" />
                                            ) : (
                                                <AiOutlineHeart className="h-5 w-5" />
                                            )}
                                        </button>
                                        <span className="text-sm text-gray-700">{review.likes}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Reviews;
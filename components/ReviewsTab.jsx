'use client';

import React from 'react';
import MuiRating from '@mui/material/Rating';
import RatingSummary from './RatingSummary';

function ReviewsTab({ product, userRating, setUserRating, comment, setComment, handleReviewSubmit, reviewLoading }) {
    return (
        <div className="reviews-container">
            <h3>Customer Reviews</h3>
            {product.reviews && product.reviews.length > 0 && (
                <RatingSummary reviews={product.reviews} />
            )}
            {product.reviews && product.reviews.length > 0 ? (
                <div className="reviews-section">
                    {product.reviews.map((review, index) => (
                        <div className="review-item" key={index}>
                            <div className="review-header">
                                <span className="review-name">{review.name}</span>
                                <MuiRating value={review.rating} precision={0.5} readOnly />
                            </div>
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
            )}
            <form className="review-from" onSubmit={handleReviewSubmit}>
                <h3>Write a Review</h3>
                <MuiRating
                    value={userRating}
                    onChange={(event, newValue) => {
                        setUserRating(newValue);
                    }}
                />
                <textarea
                    required
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className="review-input"
                ></textarea>
                <button disabled={reviewLoading} className="submit-review-btn">
                    {reviewLoading ? 'Submitting....' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}

export default ReviewsTab;

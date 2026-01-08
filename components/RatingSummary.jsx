'use client';

import React from 'react';
import MuiRating from '@mui/material/Rating';
import '@/componentStyles/RatingSummary.css';

function RatingSummary({ reviews }) {
    const totalReviews = reviews.length;
    const ratingCounts = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
            ratingCounts[review.rating - 1]++;
        }
    });

    return (
        <div className="rating-summary-container">
            <h3>Rating Summary</h3>
            <div className="rating-summary">
                {ratingCounts.reverse().map((count, index) => {
                    const rating = 5 - index;
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    return (
                        <div key={rating} className="rating-row">
                            <span className="rating-label">{rating} Star</span>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <span className="rating-count">{count}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RatingSummary;

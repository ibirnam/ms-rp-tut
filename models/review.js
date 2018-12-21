// models/review.js

const mongoose = require('mongoose');

const reviewScheme = new mongoose.Schema(
    {
        title: String,
        description: String,
        movieTitle: String,
        rating: Number
    }, 
    {
        timestamps: true
    }
);

const Review = mongoose.model('Review', reviewScheme);

module.exports = Review;
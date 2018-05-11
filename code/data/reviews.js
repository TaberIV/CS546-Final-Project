const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const uuid = require('uuid/v4');

async function addReview(reviewInfo) {
    if (!reviewInfo.rating)
        throw "Must provite a rating";

    let newReview = {
        _id: uuid(),
        movie: reviewInfo.movie,
        user: reviewInfo.user,
        rating: Number(reviewInfo.rating),
        text: reviewInfo.reviewText
    };
    
    let reviewCollection = await reviews();
    await reviewCollection.insertOne(newReview);

    return newReview._id;
}

async function getReviewsByMovie(movieID) {
    let reviewCollection = await reviews();
    return (await reviewCollection.find({ movie: movieID })).toArray();
}

async function getAverageRating(movieID) {
    let reviewCollection = await reviews();
    let scores = await reviewCollection.find({ movie: movieID }, {_id: 0, rating: 1}).toArray();
    
    let average = 0;
    let i = 0
    for (i = 0; i < scores.length; i++)
        average += scores[i].rating;
    average /= i;

    return average;
}

async function getReviewsByUser(userID) {
    let reviewCollection = await reviews();
    return (await reviewCollection.find({ user: userID })).toArray();
}

module.exports = {
    addReview,
    getReviewsByMovie,
    getAverageRating,
    getReviewsByUser
}
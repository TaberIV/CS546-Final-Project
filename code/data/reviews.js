const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const userData = require("../data/users");
const movieData = require("../data/movies");
const uuid = require('uuid/v4');

async function addReview(reviewInfo) {
    if (!reviewInfo.rating)
        throw "Must provite a rating";

    let newReview = {
        _id: uuid(),
        movie: reviewInfo.movie,
        user: reviewInfo.userID,
        rating: Number(reviewInfo.rating),
        text: reviewInfo.reviewText
    };
    
    let reviewCollection = await reviews();
    await reviewCollection.insertOne(newReview);

    return newReview._id;
}

async function getReviewsByMovie(movie) {
    let reviewCollection = await reviews();
    let reviewList = await reviewCollection.find({ movie }).toArray()

    for (let i = 0; i < reviewList.length; i++) {
        let user = await userData.getUserByID(reviewList[i].user);
        reviewList[i].user = user;
    }

    return reviewList;
}

async function getAverageRating(movie) {
    let reviewCollection = await reviews();
    let scores = await reviewCollection.find({ movie }).toArray();
    
    let average = 0;
    let i = 0
    for (i = 0; i < scores.length; i++)
        average += scores[i].rating;

    if (i > 0)
        average /= i;
    else
        average = "-";

    return average;
}

async function getReviewsByUser(user) {
    let reviewCollection = await mongoCollections.reviews();
    let reviewList = await reviewCollection.find({ user }).toArray();

    for (let i = 0; i < reviewList.length; i++) {
        let movie = await movieData.getMovieByID(reviewList[i].movie);
        reviewList[i].movie = movie;
    }

    return reviewList;
}

async function getReview(user, movie) {
    let reviewCollection = await mongoCollections.reviews();
    let review = await reviewCollection.findOne({ user, movie });

    return review;
}

async function updateReview(review, reviewInfo) {
    let reviewCollection = await mongoCollections.reviews();
    review.rating = Number(reviewInfo.rating);
    review.text = reviewInfo.reviewText;

    await reviewCollection.update({ _id: review._id }, review);
    let result = await reviewCollection.findOne({ _id });
    console.log(result);
}

module.exports = {
    addReview,
    getReviewsByMovie,
    getAverageRating,
    getReviewsByUser,
    getReview,
    updateReview
};
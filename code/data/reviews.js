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

async function getReviewsByMovie(movieID) {
    let reviewCollection = await reviews();
    let reviewList = await reviewCollection.find({ movie: movieID }).toArray()

    for (let i = 0; i < reviewList.length; i++) {
        let user = await userData.getUserByID(reviewList[i].user);
        reviewList[i].user = user;
    }

    return reviewList;
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
    let reviewCollection = await mongoCollections.reviews();
    let reviewList = await reviewCollection.find({ user: userID }).toArray();

    for (let i = 0; i < reviewList.length; i++) {
        let movie = await movieData.getMovieByID(reviewList[i].movie);
        reviewList[i].movie = movie;
    }

    return reviewList;
}

module.exports = {
    addReview,
    getReviewsByMovie,
    getAverageRating,
    getReviewsByUser
};
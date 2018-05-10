const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const uuid = require('uuid/v4');

async function addReview(reviewInfo) {
    // Ensure all required info is present
    if (!reviewInfo.rating)
        throw "Must provite a rating";

    console.log(reviewInfo);
    
}

module.exports = {
    addReview
}
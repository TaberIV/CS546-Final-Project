const mongodb = require("mongodb");

const movieTemp = {
	_id: "12asdf3fasdf",
	title: "Jurassic Park",
	cast: [
		"Jeff Goldblum",
		"Samuel L. Jackson"
	],
	description: "Life finds a way.",
	genres: [
		"adventure",
		"monster"
	]
}

async function getMovieByID() {
	// Mongo things
}

async function getInTheaters(numMovies) {
	// Mongo things

	// TEMP
	movies = [movieTemp, movieTemp, movieTemp, movieTemp, movieTemp];
	return movies;
}

module.exports = {
	getMovieByID,
	getInTheaters
};
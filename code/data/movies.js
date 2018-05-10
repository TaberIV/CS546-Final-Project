const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const uuid = require("uuid");

async function addMovie(movieInfo) {
	// Ensure all required info is present
	if (!movieInfo.movieTitle || movieInfo.movieTitle.trim() == "")
		throw "Must provide a movie title";
	else if (!movieInfo.releaseDate || movieInfo.releaseDate.trim() == "")
		throw "Must provide a release date";
	else if (!movieInfo.director || movieInfo.director.trim() == "")
		throw "Must provide a director";
	else if (!movieInfo.cast || movieInfo.cast.trim() == "")
		throw "Must provide cast";
	else if (!movieInfo.description || movieInfo.description.trim() == "")
		throw "Must provide a description";
	else if (!movieInfo.genre)
		throw "Must provide genres";
	else if (!movieInfo.poster || movieInfo.poster.trim() == "")
		throw "Must provide a poster";

	// Adjust info to be more usable
	if (!Array.isArray(movieInfo.genre))
		movieInfo.genre = [movieInfo.genre];
	movieInfo.cast = movieInfo.cast.split("\n");

	let whereToWatch = [];
	if (movieInfo.inTheaters) {
		whereToWatch.push("In Theaters");
		movieInfo.inTheaters = true;
	}
	if (movieInfo.AmazonPrimeVideo)
		whereToWatch.push("Amazon Prime Video");
	if (movieInfo.Hulu)
		whereToWatch.push("Hulu");
	if (movieInfo.Netflix)
		whereToWatch.push("Netflix");
	
	if (whereToWatch.length == 0)
		whereToWatch.push("Unavailable");

	let newMovie = {
		_id: uuid.v4(),
		title: movieInfo.movieTitle,
		releaseDate: movieInfo.releaseDate,
		director: movieInfo.director,
		inTheaters: movieInfo.inTheaters,
		whereToWatch: whereToWatch,
		cast: movieInfo.cast,
		description: movieInfo.description,
		genres: movieInfo.genre,
		poster: movieInfo.poster
	}

	let movieCollection = await movies();
	await movieCollection.insertOne(newMovie);

	return newMovie._id;
}

//Gets the movie by its given ID
async function getMovieByID(_id) {
	try {
		if (!_id || typeof _id !== "string")
			throw "_id must be a non-empty string";

		let movieCollection = await movies();
		return await movieCollection.findOne({
			_id: _id
		});
	} catch (e) {
		throw e;
	}
}


async function searchMovies(searchInfo) {
	try {
		if (!searchInfo || typeof searchInfo !== "string")
			return [];

		searchInfo = searchInfo.toLowerCase();
		let regEx = new RegExp('.*' + searchInfo + '.*', 'i');
		console.log(regEx);
		let movieCollection = await movies();
		let searchResults = await movieCollection.find(
		{
			title: regEx
		}).toArray();
		//console.log(searchResults);
		return searchResults;
	} catch (e) {
		throw e;
	}
}

//Gets an array of all movies
async function getAllMovies() {
	try {
		let movieCollection = await movies();
		return await movieCollection.find({}).toArray();
	} catch (e) {
		throw e;
	}
}

//Gets all the movies that are currently in theaters
async function getInTheaters() {
	try {
		let movieCollection = await movies();
		let movieList = await (await movieCollection.find({
			inTheaters: true
		}).toArray());

		return movieList;
	} catch (e) {
		throw e;
	}
}

//Gets all recommended movies associated 
async function getRecommendedMovies(movieID) {
	try {
		let movieCollection = await movies();

		let recommendedMovies = [];

		//Array of all movies
		let allMovies = await getAllMovies();

		//The movie we want to find recommendations for
		let currentMovie = await getMovieByID(movieID);

		let genreIntersection = [];

		//Iterate through all movies
		allMovies.forEach(function (element) {
			genreIntersection = [];
			//Intersect genre arrays of both movies
			genreIntersection = element.genres.filter(function (n) {
				return currentMovie.genres.indexOf(n) !== -1;
			});
			if (genreIntersection.length > 0 && element.title !== currentMovie.title) {
				recommendedMovies.push(element);
			}
			//If greater than 1, recommend it
		});

		return recommendedMovies;
	} catch (e) {
		throw e;
	}
}

//Gets the number of top rated movies as an array
async function getTopMovies(numMovies) {
	let topMovies = [];
	for (let i = 0; i < movieArray.length; i++) {
		if (topMovies.length === 0) {
			topMovies.push(movieArray[i]);
		}
	}

	let rating = getAverageRating(movieArray[i]);
	if (topMovies.length < numMovies || rating > topMovies[numMovies - 1]) {
		for (let j = 0; j < topMovies.length; j++) {
			if (rating < getAverageRating(topMovies[j])) {
				topMovies.splice(j, 0, movieArray[i]);
				break;
			}
		}
		if (topMovies.length > numMovies) {
			topMovies.splice(numMovies, 1);
		}
	}
	return topMovies;
}

module.exports = {
	addMovie,
	getMovieByID,
	getInTheaters,
	getRecommendedMovies,
	getTopMovies,
	searchMovies
};
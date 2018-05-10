const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const uuid = require("uuid");

async function addMovie(title, releaseDate, director, inTheaters, AmazonPrimeVideo, Hulu, Netflix, cast, description, genres, poster) {
	try {
		if (!title || title.trim() == "")
			throw "Must provide a movie title";
		else if (!releaseDate || releaseDate.trim() == "")
			throw "Must provide a release date";
		else if (!director || director.trim() == "")
			throw "Must provide a director";

		else if (!cast || cast.trim() == "")
			throw "Must provide cast";
		else if (!description || description.trim() == "")
			throw "Must provide a description";
		else if (!genres)
			throw "Must provide genres";
		else if (!poster || poster.trim() == "")
			throw "Must provide a poster";

		if(!Array.isArray(genres)){
			genres = [genres];
		}
		cast = cast.split("\n");

		let whereToWatch = [];
		if(inTheaters == true){
			whereToWatch.push("In Theaters");
		}
		if(AmazonPrimeVideo == true){
			whereToWatch.push("Amazon Prime Video");
		}
		if(Hulu == true){
			whereToWatch.push("Hulu");
		}
		if(Netflix == true){
			whereToWatch.push("Netflix");
		}
		if(!whereToWatch.length){
			whereToWatch.push("Unavailable");
		}
		let movieCollection = await movies();
		let newMovie = {
			_id: uuid.v4(),
			title: title,
			releaseDate: releaseDate,
			director: director,
			inTheaters: inTheaters,
			whereToWatch: whereToWatch,
			cast: cast,
			description: description,
			genres: genres,
			poster: poster
		}

		await movieCollection.insertOne(newMovie);

		return newMovie._id;
	} catch (e) {
		throw e;
	}
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

//Gets all the movies that are currently in theaters
async function getInTheaters() {
	try {
		let movieCollection = await movies();
		let movieList = await (await movieCollection.find({ inTheaters: true }).toArray());

		return movieList;
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
	getTopMovies
};
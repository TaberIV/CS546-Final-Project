const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const uuid = require("uuid");

// const movieArray = [
// 	{
// 		_id: "12asdf3fasdf",
// 		title: "Jurassic Park",
// 		inTheaters: true,
// 		reviews: [
// 			'jhbugvyghjn'
// 		],
// 		cast: [
// 			"Jeff Goldblum",
// 			"Samuel L. Jackson"
// 		],
// 		description: "Life finds a way.",
// 		genres: [
// 			"adventure",
// 			"monster"
// 		],
// 		link: "",
// 		poster: "/images/JurassicParkPoster.jpg",
// 		releaseDate: "6/11/1993"
// 	},
// 	{
// 		_id: "quedv2eufyv",
// 		title: "Warriors",
// 		inTheaters: true,
// 		reviews: [
// 			'weijbdweiubfe'
// 		],
// 		cast: [
// 			"Steve Urkel",
// 			"Adam Sandler"
// 		],
// 		description: "Poster on Gae's wall.",
// 		genres: [
// 			"adventure",
// 			"monster"
// 		],
// 		link: "",
// 		poster: "/images/WarriorsPoster.jpg",
// 		releaseDate: "13/42/20XX"
// 	}
// ]

async function addMovie(title, inTheaters, cast, description, genres, poster){
	try{
		if(!title || title.trim() == "")
			throw "Must provide a movie title";
		else if(!cast || cast.trim() == "")
			throw "Must provide cast";
		else if(!description || description.trim() == "")
			throw "Must provide a description";
		else if(!genres || genres.trim() == "")
			throw "Must provide genres";
		else if(!poster || poster.trim() == "")
			throw "Must provide a poster";

		let movieCollection = await movies();
		let newMovie = {
			_id :  uuid.v4(),
			title: title,
			inTheaters: inTheaters,
			cast: cast,
			description: description,
			genres: genres,
			poster: poster
		}

		return await movieCollection.insertOne(newMovie);
	} catch (e){
		throw e;
	}
}

//Gets the movie by its given ID
async function getMovieByID(_id) {
	try{
		if(!_id || typeof _id !== "string")
			throw "_id must be a non-empty string";

		let movieCollection = await movies();
		return await movieCollection.findOne({ _id: _id });
	} catch (e){
		throw e;
	}
}

//Gets all the movies that are currently in theaters
async function getInTheaters() {
	try{
		let movieCollection = await movies();
		let movieList = await (await movieCollection.find({ inTheaters: true }).toArray());
		
		return movieList;
	} catch(e){
		throw e;
	}
}

//Gets the number of top rated movies as an array
async function getTopMovies(numMovies){
	var topMovies = [];
	for(var i = 0; i < movieArray.length; i++){
		if(topMovies.length === 0){
			topMovies.push(movieArray[i]);
		}
	}
	var rating = getAverageRating(movieArray[i]);
	if(topMovies.length < numMovies || rating > topMovies[numMovies - 1]){
		for(var j = 0; j < topMovies.length; j++){
				if(rating < getAverageRating(topMovies[j])){
				topMovies.splice(j, 0, movieArray[i]);
				break;
			}
		}
		if(topMovies.length > numMovies){
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
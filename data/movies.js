const mongodb = require("mongodb");

const movieArray = [
	{
		_id: "12asdf3fasdf",
		title: "Jurassic Park",
		inTheaters: true,
		reviews: [
		'jhbugvyghjn'
		],
		cast: [
			"Jeff Goldblum",
			"Samuel L. Jackson"
		],
		description: "Life finds a way.",
		genres: [
			"adventure",
			"monster"
		],
		link: "movies/JurrasicPark",
		poster: "images/JurassicParkPoster.jpg"
	},
	{
		_id: "quedv2eufyv",
		title: "Warriors",
		inTheaters: true,
		reviews: [
			'weijbdweiubfe'
		],
		cast: [
			"Steve Urkel",
			"Adam Sandler"
		],
		description: "Poster on Gae's wall.",
		genres: [
			"adventure",
			"monster"
		],
		link: "movies/Warriors",
		poster: "images/WarriorsPoster.jpg"
	}
]

//Gets the movie by its given ID
async function getMovieByID(_id) {
	// Mongo things
	if(_id == null || typeof _id !== "string"){
		throw "_id must be a non-empty string";
	}
	for(var i = 0; i < movieArray.length;i++){
		if(_id == movieArray[i]._id){
			return movieArray[i];
		}
	}
	return undefined;
}

//Gets all the movies that are currently in theaters
async function getInTheaters() {
	var moviesInTheaters = [];
	for(var i = 0; i < movieArray.length;i++){
		if(movieArray[i].inTheaters === true){
			moviesInTheaters.push(movieArray[i]);
		}
	}
	// Mongo things

	// TEMP
	return moviesInTheaters;
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
	getMovieByID,
	getInTheaters,
	getTopMovies
};
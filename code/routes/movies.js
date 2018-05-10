const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies");


router.get("/:id", async (req, res) => {
	try {
		let id = req.params.id;
		let movie = await movieData.getMovieByID(id);
<<<<<<< HEAD
		let recommendedMovies = await movieData.getRecommendedMovies(id);
		var data = {
			movie,
			recommendedMovies
=======
		let data = {
			movie
>>>>>>> 4579366ddb59728fe2b4b4b0a2581a579360abf9
		};

		res.render("movie", data);
	} catch (e) {
		let errorNum = 404;
		let data = {
			errorNum: errorNum,
			description: "the movie is not in the database"
		}
		res.status(errorNum).render("error", data);
	}
});


module.exports = router;
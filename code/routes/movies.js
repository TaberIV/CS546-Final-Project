const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/:id", async (req, res) => {
	let user = await getUserFromCookie(req);

	try {
		let id = req.params.id;
		let movie = await movieData.getMovieByID(id);
		let recommendedMovies = await movieData.getRecommendedMovies(id);
		var data = {
			user,
			movie,
			recommendedMovies
		};

		res.render("movie", data);
	} catch (e) {
		let errorNum = 404;
		let data = {
			user,
			errorNum: errorNum,
			description: "the movie is not in the database"
		}
		res.status(errorNum).render("error", data);
	}
});


module.exports = router;
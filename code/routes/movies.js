const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies");
const reviewData = require("../data/reviews");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/:_id", async (req, res) => {
	let user = await getUserFromCookie(req);

	try {
		let _id = req.params._id;
		let movie = await movieData.getMovieByID(_id);
		movie.averageRating = await reviewData.getAverageRating(movie._id);
		
		let reviews = await reviewData.getReviewsByMovie(_id);

		let recommendedMovies = await movieData.getRecommendedMovies(_id);
		
		var data = {
			user,
			movie,
			reviews,
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
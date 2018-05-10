const express = require("express");
const router = express.Router();
const movieData = require("../data/movies");

router.get("/", async (req, res) => {
	try {
		let searchInfo = req.params.query;
		let searchResults = await movieData.searchMovies(searchInfo);
		var data = {
			searchResults
		};

		res.render("search", data);
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
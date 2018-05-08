const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies")

router.get("/:id", async (req, res) => {
	try {
		let id = req.params.id;
		let movie = await movieData.getMovieByID(id);
		var data = {
			movie
		};

		res.render("movie", data);
	} catch (e) {
		console.log(e);
		var errorNum = 404;
		var data = {
			errorNum: errorNum,
			description: "the movie is not in the database"
		}
		res.status(errorNum).render("error", data);
	}
});


module.exports = router;
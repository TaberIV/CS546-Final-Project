const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies")

router.get("/:id", async (req, res) => {
	try{
		let movie = getMovieByID(req.params.id);
		res.render("movie", movie);
	}
	catch (e) {
		var errorNUm = 404;
		var data = {
			errorNum: errorNum,
			description: "the movie is not in the database"
		}
		res.status(errorNum).render("error", data);
	}
});


module.exports = router;
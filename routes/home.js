const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies")

router.get("/", async (req, res) => {
	var authenticated;
	try {
		var authenticated = await userData.getUserBySessionID(req.cookies.AuthCookie) !== undefined;
	} catch (e) {
		authenticated = false;
	}

	if (authenticated)
		res.redirect('/private');
	else {
		var numMovies = 10;
		var data = {
			inTheaters: movieData.getInTheaters(numMovies)
		};
		res.render('index', data);
	}
});

module.exports = router;
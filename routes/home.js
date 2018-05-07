const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies")

router.get("/", async (req, res) => {
	var user;
	try {
		user = await userData.getUserBySessionID(req.cookies.AuthCookie);
	} catch (e) {
		user = undefined;
	}

	var numMovies = 10;
	var data = {
		user,
		inTheaters: await movieData.getInTheaters(numMovies),
		trending: await movieData.getInTheaters(numMovies)
	};
	res.render('index', data);
});

module.exports = router;
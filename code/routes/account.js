const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies");

router.get("/", async (req, res) => {
	const AuthCookie = req.cookies.AuthCookie;
	var user = await userData.getUserBySessionID(AuthCookie);

	if (user) {
		data = {
			user,
			title: "User Info",
		}

		res.render("account", data);
	} else {
		var errorNum = 403;
		var data = {
			errorNum: errorNum,
			description: "User is not logged in."
		}
		res.status(errorNum).render("error", data);
	}
});

router.get("/createMovie", async (req, res) => {
	res.render("movieCreation");
});

router.post("/createMovie", async (req, res) => {

	try {
		//console.log(req.params);
		let id = await movieData.addMovie(req.body.movieTitle, true, req.body.cast, req.body.description, req.body.genre, "/images/donovan.jpg");
		console.log(id);
		res.redirect("/movies/"+id);
	} catch(e) {
		var data = {
			error: e
		}
		res.render("movieCreation", data);
	}

});

module.exports = router;
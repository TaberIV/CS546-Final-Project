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
	const AuthCookie = req.cookies.AuthCookie;
	let user = await userData.getUserBySessionID(AuthCookie);
	if (user) {
		res.render("movieCreation");
	}
	else {
		let errorNum = 403;
		let data = {
			errorNum: errorNum,
			description: "User is not logged in."
		}
		res.status(errorNum).render("error", data);
	}
});

router.post("/createMovie", async (req, res) => {

	try {
		let title = req.body.movieTitle;
		let releaseDate = req.body.releaseDate;
		let director = req.body.director;
		let inTheaters = false;
		let AmazonPrimeVideo = false;
		let Hulu = false;
		let Netflix = false;
		if(req.body.inTheaters == "inTheaters"){
			inTheaters = true;
		}
		
		if(req.body.AmazonPrimeVideo == "AmazonPrimeVideo"){
			AmazonPrimeVideo = true;
		}
		
		if(req.body.Hulu == "Hulu"){
			Hulu = true;
		}
		
		if(req.body.Netflix == "Netflix"){
			Netflix = true;
		}
		
		let cast = req.body.cast;
		let description = req.body.description;
		let genre = req.body.genre;
		let poster = "/images/donovan.jpg"
		let id = await movieData.addMovie(title, releaseDate, director, inTheaters, AmazonPrimeVideo, Hulu, Netflix, cast, description, genre, poster);
		res.redirect("/movies/"+id);
	} catch(e) {
		var data = {
			error: e
		}
		res.render("movieCreation", data);
	}

});

module.exports = router;
const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

function noUserError(res) {
	let errorNum = 403;

	let data = {
		errorNum: errorNum,
		description: "User is not logged in."
	};

	res.status(errorNum).render("error", data);
}

router.get("/", async (req, res) => {
	let user = await getUserFromCookie(req);
	
	if (user) {
		data = {
			user,
			title: "User Info",
		}

		res.render("account", data);
	} else {
		noUserError(res);
	}
});

router.get("/createMovie", async (req, res) => {
	let user = await getUserFromCookie(req);
	if (user)
		res.render("movieCreation", { user });
	else
		res.render("movieCreation", data);
});

router.post("/createMovie", async (req, res) => {
	let user = await getUserFromCookie(req);

	if (user) {
		let movieInfo = req.body;
		movieInfo.poster = "/images/donovan.jpg";

		try {
			let id = await movieData.addMovie(movieInfo);
			res.redirect("/movies/"+id);
		} catch(e) {
			let data = { error: e };
			res.render("movieCreation", data);
		}
	} else {
		noUserError(res);
	}
});

module.exports = router;
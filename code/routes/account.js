const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies");
const reviewData = require("../data/reviews");
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
		reviews = await reviewData.getReviewsByUser(user._id);

		favorites = [];
		for (let i = 0; i < reviews.length; i++) {
			if (reviews[i].rating == 4)
				favorites.push(reviews[i].movie);
		}

		data = {
			user,
			reviews,
			favorites
		}

		res.render("account", data);
	} else {
		noUserError(res);
	}
});

router.get("/createMovie", async (req, res) => {
	let user = await getUserFromCookie(req);

	res.render("movieCreation", { user });
});

router.post("/createMovie", async (req, res) => {
	let user = await getUserFromCookie(req);

	if (user) {
		let movieInfo = req.body;
		movieInfo.poster = "/images/placeholder.jpg";
		try {
			let id = await movieData.addMovie(movieInfo);
			res.redirect("/movies/" + id);
		} catch(e) {
			let data = { user, error: e };
			res.render("movieCreation", data);
		}
	} else {
		noUserError(res);
	}
});

router.post("/createReview", async (req, res) => {
	let user = await getUserFromCookie(req);
	
	// Get id of movie
	let prevURL = req.headers.referer;

	if (prevURL[prevURL.length - 1] == '/')
		prevURL = prevURL.substr(0, prevURL.length - 1);

	let movieID = prevURL.substr(prevURL.lastIndexOf('/') + 1);

	// Create review and refesh page
	if (user) {
		let reviewInfo = req.body;
		reviewInfo.movie = movieID;
		reviewInfo.userID = user._id;

		let data = {};
		try {
			let id = await reviewData.addReview(reviewInfo);
			res.redirect("/movies/" + movieID);
		} catch(e) {
			res.redirect("/movies/" + movieID);
		}
	} else {
		noUserError(res);
	}
});

module.exports = router;
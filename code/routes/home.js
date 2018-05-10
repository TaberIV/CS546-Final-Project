const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies")

router.get("/", async (req, res) => {
	let user;
	try {
		user = await userData.getUserBySessionID(req.cookies.AuthCookie);
	} catch (e) {
		user = undefined;
	}

	let data = {
		user,
		inTheaters: await movieData.getInTheaters()
	};
	res.render('home', data);
});

module.exports = router;
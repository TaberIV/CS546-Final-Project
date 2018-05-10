const express = require("express");
const router = express.Router();
const movieData = require("../data/movies")
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/", async (req, res) => {
	let user = await getUserFromCookie(req);

	let data = {
		user,
		inTheaters: await movieData.getInTheaters()
	};
	res.render('home', data);
});

module.exports = router;
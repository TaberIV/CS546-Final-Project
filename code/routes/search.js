const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/", async (req, res) => {
	let user = await getUserFromCookie(req);

	try {
		let searchInfo = req.query['query'];
		let searchResults = await movieData.searchMovies(searchInfo);
		var data = {
			searchResults,
			user
		};

		res.render("search", data);
	} catch (e) {
		let errorNum = 404;
		let data = {
			errorNum: errorNum,
			description: e
		}
		res.status(errorNum).render("error", data);
	}
});


module.exports = router;
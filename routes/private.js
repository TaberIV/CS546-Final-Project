const express = require("express");
const router = express.Router();
const userData = require("../data/users");

router.get("/", async (req, res) => {
	const AuthCookie = req.cookies.AuthCookie;
	var user = await userData.getUserBySessionID(AuthCookie);
	var authenticated = user !== undefined;

	if (authenticated) {
		data = {
			title: "User Info",
			user: user
		}

		res.render("private", data);
	} else {
		var data = {
			title: "Error: 403",
			description: "User is not logged in."
		}
		res.status(403).render("error", data);
	}
});

module.exports = router;
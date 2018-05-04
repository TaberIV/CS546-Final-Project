const express = require("express");
const router = express.Router();
const userData = require("../data/users");

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
		var data = { title: "Home" };
		res.render('index', data);
	}
});

module.exports = router;
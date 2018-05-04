const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const uuid = require('uuid/v4');

router.get("/", async (req, res) => {
	var data = { title: "Login" };
	res.render("login", data);
});

router.post("/", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	
	var error_message = "Incorrect username/password."
	var authenticated = false;
	try {
		authenticated = await userData.checkCredentials(username, password);
	} catch (e) {
		error_message = "Empty username/password."
	}

	if (authenticated) {
		// Create cookie
		var sID = uuid();
		res.cookie("AuthCookie", sID);
		userData.addUserSessionID(username, sID);

		res.redirect("/private");
	} else {
		var data = {
			title: "Home",
			error: error_message
		}
		res.render("login", data);
	}
});

module.exports = router;
const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const uuid = require('uuid/v4');

router.get("/", async (req, res) => {
	res.render("login");
});

router.post("/", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	var error_message = "Account with that username already exists";
	var user = undefined;
	try {
		userCreated = await userData.createUser(username, password);
	} catch (e) {
		console.log(e);
		error_message = "Empty username/password."
	}

	if (userCreated) {
		// Create cookie
		var sID = uuid();
		res.cookie("AuthCookie", sID);
		userData.addUserSessionID(username, sID);

		res.redirect("/private");
	} else {
		var data = {
			error: error_message
		}
		res.render("login", data);
	}

	return true;
});

module.exports = router;
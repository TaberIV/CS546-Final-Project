const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const uuid = require('uuid/v4');

router.get("/", async (req, res) => {
	const AuthCookie = req.cookies.AuthCookie;
	let user;
	try {
		user = await userData.getUserBySessionID(AuthCookie);
	} catch (e) {
		user = undefined;
	}

	// Redirect to /account if already logged in
	if (user) {
		res.redirect("/account");
	} else {
		res.render("login");
	}
});

router.post("/", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	let error_message = "Incorrect username/password."
	let user = undefined;

	try {
		user = await userData.loginUser(username, password);
	} catch (e) {
		error_message = "Empty username/password."
	}

	if (user) {
		// Create cookie
		let sID = uuid();
		res.cookie("AuthCookie", sID);
		userData.addUserSessionID(user.username, sID);

		res.redirect("/account");
	} else {
		let data = {
			error: error_message
		}
		res.render("login", data);
	}
});

module.exports = router;
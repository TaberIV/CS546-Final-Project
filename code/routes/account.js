const express = require("express");
const router = express.Router();
const userData = require("../data/users");

router.get("/", async (req, res) => {
	const AuthCookie = req.cookies.AuthCookie;
	let user = await userData.getUserBySessionID(AuthCookie);
	
	if (user) {
		data = {
			user,
			title: "User Info",
		}

		res.render("account", data);
	} else {
		let errorNum = 403;
		let data = {
			errorNum: errorNum,
			description: "User is not logged in."
		}
		res.status(errorNum).render("error", data);
	}
});

module.exports = router;
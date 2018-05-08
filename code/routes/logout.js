const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.cookie("AuthCookie", "", {
		expires: new Date()
	});
	res.clearCookie("AuthCookie");

	res.render("logout");
});

module.exports = router;
const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const movieData = require("../data/movies")

router.get("/", async (req, res) => {
	res.redirect("/");
});

// router.get("/create/")


module.exports = router;
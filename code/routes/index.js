const homeRoute = require("./home");
const loginRoute = require("./login");
const signUpRoute = require("./signup");
const accountRoute = require("./account");
const logoutRoute = require("./logout");
const moviesRoute = require("./movies");

const userData = require("../data/users");

function constructorMethod(app) {
	app.use("/", homeRoute);
	app.use("/login", loginRoute);
	app.use("/signup", signUpRoute);
	app.use("/account", accountRoute);
	app.use("/logout", logoutRoute);
	app.use("/movies", moviesRoute);

	app.use("*", async (req, res) => {
		var user;
		try {
			user = await userData.getUserBySessionID(req.cookies.AuthCookie);
		} catch (e) {
			user = undefined;
		}

		var errorNum = 404;
		var data = {
			user,
			errorNum: errorNum,
			description: "Page not found."
		}
		res.status(errorNum).render("error", data);
	});
};

module.exports = constructorMethod;
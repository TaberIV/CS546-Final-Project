const homeRoute = require("./home");
const loginRoute = require("./login");
const signUpRoute = require("./signup");
const accountRoute = require("./account");
const logoutRoute = require("./logout");
const moviesRoute = require("./movies");
const searchRoute = require("./search");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

function constructorMethod(app) {
	app.use("/", homeRoute);
	app.use("/login", loginRoute);
	app.use("/signup", signUpRoute);
	app.use("/account", accountRoute);
	app.use("/logout", logoutRoute);
	app.use("/movies", moviesRoute);
	app.use("/search", searchRoute);

	app.use("*", async (req, res) => {
		let user = await getUserFromCookie(req);

		let errorNum = 404;
		let data = {
			user,
			errorNum: errorNum,
			description: "Page not found."
		}
		res.status(errorNum).render("error", data);
	});
};

module.exports = constructorMethod;
/***************************************
 * CS546 Lab10
 * Author: E. Taber McFarlin
 * 
 * I pledge my Honor that I have abided
 * by the Stevens Honor System.
***************************************/

// Imports
const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');

// Config app
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
configRoutes(app);

app.listen(3000, () => {
	console.log("Server launched...");
	console.log("Routes running Movie Review Site on http://localhost:3000");
});

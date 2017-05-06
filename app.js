var express = require("express");
var app = express();

var mongoose = require("mongoose");
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Route
app.get("/", function(req, res) {
	res.send("Hello world");
});

// Listen and serve web app
app.listen(3000, "localhost", function(req, res) {
	console.log("Server has started..");
});
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var mediaserver = require("mediaserver");

app.get("/", function(req, res) {
	var html = fs.readFileSync("./index.html", "utf8");
	console.log("Index wird versendet!");
	res.send(html);
});

app.get("/stream", function(req, res) {
	mediaserver.pipe(req, res, "1.mp3");
});

var server = app.listen(3000, function () {
	
});
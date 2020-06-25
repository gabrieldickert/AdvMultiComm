const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mediaserver = require("mediaserver");

/*
app.get("/", function(req, res) {
	var html = fs.readFileSync("./index.html", "utf8");
	console.log("Index wird versendet!");
	res.send(html);
});*/

app.get("/files", function(req,res) {
	fs.readdir('music/', function (err, files) {
		if (err) {
			console.error("Could not list the directory.", err);
			process.exit(1);
		}
		var string = "";
		files.forEach(function (file, index) {
			string += file+"|";
		});
		res.send(string.slice(0, -1));
	});
});

app.get("/stream/:song", function(req, res) {
	mediaserver.pipe(req, res, 'music/'+req.params.song);
});

const server = app.listen(3000, function () {
	console.log("Server running on Port 3000!");
});
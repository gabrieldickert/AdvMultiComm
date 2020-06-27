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

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

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

//Room Info
var room_info = [];

app.get("/rooms", function(req, res) {
	res.send(JSON.stringify(room_info));
});

app.post("/rooms", function(req, res) {
	if(typeof req.body.name !== "undefined")
	{
		for(let i=0; i<room_info.length; i++)
		{
			if(room_info[0] == req.body.name) return;
		}
		room_info.push([req.body.name, req.body.info]);
	}
	res.send("1");
});

//Websocket
const WebsocketServer = require('websocket').server;

var rooms = [];

var music = [];

const wsServer = new WebsocketServer({ httpServer: server });

wsServer.on('request', function(request) {
	const c = request.accept(null, request.origin);
	c.on('message', function(message) {
		const x = message.utf8Data.split("|"); //example: c|channelID (to enter) ~ a|channelID|msg (to send msg)
		const cID = parseInt(x[1]);
		switch(x[0]) {
			case 'c': {
				if(rooms.length < cID+1) rooms.push([c]);
				else rooms[cID].push(c);
				c.sendUTF('<Willkommen in Raum ' + cID);
				break; 
			}
			case 'a': {
				for(var i=0; i<rooms[cID].length; i++) {
					rooms[cID][i].sendUTF("<"+x[2]);
				}
				break;
			}
			case 'p': {
				music[cID] = [x[2],x[3],+new Date()];
				for(var i=0; i<rooms[cID].length; i++) {
					rooms[cID][i].sendUTF(">"+x[2]+"|"+x[3]);
				}
				break;
			}
			case 's': {
				if(music.length <= cID) return;
				c.sendUTF("%"+music[cID][0]+"|"+music[cID][1]+"|"+Math.round(((+new Date())-music[cID][2])/1000));
				break;
			}
		}
	});
	
	c.on('close', function(reasonCode, description) {
		console.log("Client discconected! (Reason: " + reasonCode + ")");
	});
});
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mediaserver = require("mediaserver");


app.get('/', function (req, res) {
  res.send('hello world')
});

/*
 app.get("/", function(req, res) {
 var html = fs.readFileSync("./index.html", "utf8");
 console.log("Index wird versendet!");
 res.send(html);
 });*/

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

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





app.get("/files", function (req, res) {
    fs.readdir('music/', function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }
        var string = "";
        files.forEach(function (file, index) {
            string += file + "|";
        });
        res.send(string.slice(0, -1));
    });
});




app.get("/stream/:song", function (req, res) {
    mediaserver.pipe(req, res, 'music/' + req.params.song);
});

const https = require('https');

const key = fs.readFileSync('C:/Certbot/archive/ai-robot.ddns.net/privkey1.pem');
const cert = fs.readFileSync('C:/Certbot/archive/ai-robot.ddns.net/cert1.pem');
const options = {
  key: key,
  cert: cert
};
const server = https.createServer(options, app);

server.listen(3000, () => {
	console.log("Server running on Port 3000!");
});


//Room Info
var room_info = [];

app.get("/rooms", function (req, res) {
    res.send(JSON.stringify(room_info));
});

app.post("/rooms", function (req, res) {
    if (typeof req.body.name !== "undefined")
    {
        for (let i = 0; i < room_info.length; i++)
        {
            if (room_info[0] == req.body.name)
                return;
        }
        room_info.push([req.body.name, req.body.info]);
    }
    res.send("1");
});

//Websocket
const WebsocketServer = require('websocket').server;

const wsServer = new WebsocketServer({httpServer: server});


var rooms = [];

var music = [];

wsServer.on('request', function (request) {
    const c = request.accept(null, request.origin);
    c.on('message', function (message) {
        const x = message.utf8Data.split("|"); //example: c|channelID (to enter) ~ a|channelID|msg (to send msg)
        const cID = parseInt(x[1]);
        switch (x[0]) {
            case 'c':
            {
                if (rooms.length < cID + 1) {
                    rooms.push([c]);
                    c.sendUTF('3Willkommen in Raum ' + cID);
                } else {
                    rooms[cID].push(c);
                    c.sendUTF('0Willkommen in Raum ' + cID);
                }
                break;
            }
            case 'a':
            {
                for (var i = 0; i < rooms[cID].length; i++) {
                    rooms[cID][i].sendUTF("0" + x[2]);
                }
                break;
            }
            case 'p':
            {
                music[cID] = [x[2], x[3], +new Date()];
                for (var i = 0; i < rooms[cID].length; i++) {
                    rooms[cID][i].sendUTF("1" + x[2] + "|" + x[3]);
                }
                break;
            }
            case 's':
            {
                if (music.length <= cID)
                    return;
                c.sendUTF("2" + music[cID][0] + "|" + music[cID][1] + "|" + Math.round(((+new Date()) - music[cID][2]) / 1000));
                break;
            }
			case 'v': {
				for (var i = 0; i < rooms[cID].length; i++) {
                    rooms[cID][i].sendUTF("4" + x[2]);
                }
                break;
			}
			case 'w': {
				for (var i = 0; i < rooms[cID].length; i++) {
                    rooms[cID][i].sendUTF("5" + x[2]);
                }
                break;
			}
			case 'z': {
				for (var i = 0; i < rooms[cID].length; i++) {
                    rooms[cID][i].sendUTF("6");
                }
                break;
			}
        }
    });

    c.on('close', function (reasonCode, description) {
        console.log("Client discconected! (Reason: " + reasonCode + ")");
    });
});

const mic_server = https.createServer(options, app);

mic_server.listen(3001, () => {
	console.log("Mic-Server running on Port 3001!");
});

var mic_rooms = [];
var mic_data = [];
var current_room = null;

const mic_ws = new WebsocketServer({httpServer: mic_server});
//mic_ws.binaryType = "arraybuffer";
mic_ws.on('request', function (request) {
    const c = request.accept(null, request.origin);
    c.on('message', function (message) {
        //    const x = message.utf8Data.split("|"); //example: c|channelID (to enter) ~ a|channelID|msg (to send msg)
        // const cID = parseInt(x[0]);

        var buf = message['binaryData'];
        if (typeof buf !== 'undefined') {
            
            //c.send(current_room);
            c.send(buf);
        } else {


            let x = message.utf8Data.split("|");
			console.log(x);
            let room_id = x[1];


            switch (x[0]) {
                case 'c': {
                    if (!mic_rooms.includes(room_id)) {
                        mic_rooms.push(room_id);
                    }
                    break;
				}
                case 'b': {
                    current_room = mic_rooms[x[1]];
					break;
				}
            }

            console.log("Error:" +current_room);
        }
    })
});



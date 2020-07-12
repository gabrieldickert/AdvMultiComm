const channelID = parseInt(getParam("id"));

function con_up(x,v) {
    

	document.getElementById("s"+x).innerHTML = v;
}

document.getElementById("chat").onkeydown = function(e) {
	if(e.keyCode == 13)
	{
		if(document.getElementById("chat").value.length == 0) return;
		websocket.send("a|"+channelID+"|"+encodeURI(escapeHtml(document.getElementById("chat").value)));
		document.getElementById("chat").value = '';
	}
};

function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}
var websocket = new WebSocket("ws://"+window.location.host+":3000"); 
websocket.onopen = function(ev) {
	document.getElementById("oIcon").src = "img/online.png";
	websocket.send("c|"+channelID);
	websocket.send("s|"+channelID);
};
websocket.onclose = websocket.onerror = function(ev) {
	document.getElementById("oIcon").src = "img/offline.png";
	document.cookie = '';
	console.log("Error: "+ev);
};
websocket.onmessage = function(ev) {
	const c = parseInt(ev.data.charAt(0));
	if(c==3) {
		var splits = ev.data.split(" ");
		setCookie("Admin", parseInt(splits[splits.length-1]));
	}
	var data = ev.data.substr(1,ev.data.length);
	switch(c)
	{
		case 0: case 3: {
			document.getElementById("chat-box").innerHTML += "<b>"+getStamp()+"</b>&nbsp;"+decodeURI(data)+"<hr>";
			$('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
			break;
		}
		case 1: {
			var tmp = data.split("|");
			playSong(tmp[0], tmp[1], false);
			break;
		}
		case 2: {
			var tmp = data.split("|");
			playSong(tmp[0], tmp[1], false, tmp[2]);
			break;
		}
	}
};

function syncPlayer(name,p) {
	websocket.send("p|"+channelID+"|"+name+"|"+((p!=-1)?(Playlist[p][0]):-1));
}


function getStamp()
{
	var d = new Date();
	var h = d.getHours();
	if(h < 10) h = "0"+h;
	var min = d.getMinutes();
	if(min < 10) min = "0"+min;
	var sec = d.getSeconds();
	if(sec < 10) sec = "0"+sec;
	return h+":"+min+":"+sec;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (365*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getParam(param) {
	var url = new URL(window.location.href);
	return url.searchParams.get(param);
}

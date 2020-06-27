const channelID = parseInt(window.location.href.split("=")[1]);

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
};
websocket.onclose = websocket.onerror = function(ev) {
	document.getElementById("oIcon").src = "img/offline.png";
	console.log("Error: "+ev);
};
websocket.onmessage = function(ev) {
	document.getElementById("chat-box").innerHTML += "<b>"+getStamp()+"</b>&nbsp;"+decodeURI(ev.data)+"<hr>";
	$('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
};
function getStamp()
{
	var d = new Date();
	var h = d.getHours();
	if(h.length == 1) h = "0"+h;
	var min = d.getMinutes();
	if(min.length == 1) min = "0"+min;
	var sec = d.getSeconds();
	if(sec.length == 1) sec = "0"+sec;
	return h+":"+min+":"+sec;
}
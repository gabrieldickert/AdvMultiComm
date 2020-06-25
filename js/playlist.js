var playlist_add, playlist_title, inner_playlist,player,info;
var Playlist=[];
window.onload = function() {
	playlist_add = document.getElementById("playlist_add");
	playlist_title = document.getElementById("playlist_title");
	inner_playlist = document.getElementById("inner_playlist");
	player = document.getElementById("player");
	info = document.getElementById("song_info");
	
	playlist_title.onkeydown = function(e) {
		if(e.keyCode == 13) add_playlist();
	};
	playlist_add.onclick = add_playlist;
	
	loadPlaylist();
	showPlaylist();
};

function playPlaylist(p) {
	if(Playlist[p][1].length == 0) return alert("Noch keinen Song hinzugefügt!");
	playSong(Playlist[p][1][0],p);
}
function playNextSong(old,p) {
	let i=getPlaylistIndex(old,p);
	if(i==-1 || Playlist[p][1].length == 0) return 0;
	if(i == Playlist[p][1].length-1) {
		playSong(Playlist[p][1][0],p);
	} else {
		playSong(Playlist[p][1][i+1],p);
	}
	return 1;
}

function playSong(name,p=-1) {
	player.src = "http://"+window.location.hostname+":3000/stream/"+name;
	player.play();
	if(p == -1) info.innerHTML = name;
	else {
		info.innerHTML = "Playlist: "+Playlist[p][0]+" - "+name;
		player.onended = function() {
			playNextSong(name,p);
		};
	}
	info.style.display = "block";
}
function addFinalSong(name, i) {
	Playlist[i][1].push(name);
	$('#addSongModal').modal('hide');
	savePlaylist();
}
function addSong(name) {
	document.getElementById("addSongModalLabel").innerHTML = 'Song (<b>'+name+'</b>) welcher Playlist hinzufügen?';
	
	var string = "<table>";
	for(let i=0; i<Playlist.length; i++)
	{
		string += "<tr><td onclick='addFinalSong(\""+name+"\","+i+");'>"+Playlist[i][0]+"</td></tr>";
	}
	document.getElementById("addSongBody").innerHTML = string+"</table>";
	
	$('#addSongModal').modal('show');
}

function showPlaylist() {
	if(Playlist.length == 0) {
		inner_playlist.innerHTML = "- Noch keine vorhanden.";
		return;
	}
	var string = "<table>";
	for(let i=0; i<Playlist.length; i++)
	{
		string += "<tr><td onclick='detailPlaylist("+i+");' style='width:70%;'>"+Playlist[i][0]+'</td><td><i onclick="playPlaylist('+i+');" class="fa fa-play play"></i></td><td><i onclick="del_playlist('+i+');" class="fa fa-minus minus"></i></td></tr>';
	}
	inner_playlist.innerHTML = string+"</table>";
}


function detailPlaylist(x) {
	document.getElementById("detailModalLabel").innerHTML = "Playlist: "+Playlist[x][0];
	
	$('#detailModal').modal('show');
	
	var string = "- Noch kein Song hinzugefügt!";
	if(Playlist[x][1].length != 0)
	{
	
		string = "<table>";
		for(let i=0; i<Playlist[x][1].length; i++)
		{
			string += "<tr><td style='width:70%;'>"+Playlist[x][1][i]+'</td><td><i onclick="playSong(\''+Playlist[x][1][i]+'\','+x+');" class="fa fa-play play"></i></td><td><i onclick="del_song('+x+','+i+');" class="fa fa-minus minus"></i></td></tr>';
		}
		string += "</table>";
	}
	document.getElementById("detailPlaylist").innerHTML = string;
}

function del_song(x,i) {
	Playlist[x][1].splice(i, 1);
	detailPlaylist(x);
	savePlaylist();
}
/**
	Save & Load Playlists
*/
function savePlaylist() {
	localStorage.setItem("Playlist", JSON.stringify(Playlist));
}
function del_playlist(i) {
	Playlist.splice(i, 1);
	savePlaylist();
	showPlaylist();
}
function loadPlaylist() {
	var list = localStorage.getItem("Playlist");
	if(list != null) Playlist = JSON.parse(localStorage.getItem("Playlist"));
}
function add_playlist() {
	if(playlist_title.value.length == 0) return alert("Bitte füllen Sie das Feld aus!");
	
	for(let i=0; i<Playlist.length; i++)
	{
		if(Playlist[i][0] == playlist_title.value) return alert("Eine Playlist mit diesem Namen existiert bereits!");
	}
	
	Playlist.push([playlist_title.value,[]]);
	
	playlist_title.value = '';
	
	
	$('#playlistModal').modal('hide');
	
	showPlaylist();
	
	savePlaylist();
}
function getPlaylistIndex(name,p) {
	for(let i=0; i<Playlist[p][1].length; i++)
	{
		if(Playlist[p][1][i] == name) return i;
	}
	return -1;
}
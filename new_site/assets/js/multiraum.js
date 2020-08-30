var raum_name, raum_beschreibung, cards;

window.onload = function() {
	raum_name = document.getElementById('raum_name');
	raum_beschreibung = document.getElementById('raum_beschreibung');
	cards = document.getElementById('cards');
	refresh_rooms();
};

function createRoom() {
	if(raum_name.value.length == 0 || raum_beschreibung.value.length == 0)
	{
		alert("Bitte füllen Sie alle Felder aus!");
		return;
	}
	$.ajax({
		type: "POST",
		url: 'http://'+window.location.hostname+':3000/rooms',
		data: JSON.stringify( { name: raum_name.value, info: raum_beschreibung.value } ),
		contentType: "application/json; charset=utf-8",
		dataType: "json"
	}).done(function() {
		raum_name.value = '';
		raum_beschreibung.value = '';
		refresh_rooms();
	});
}

function refresh_rooms() {
	$.ajax({
		type: "GET",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		url: 'http://'+window.location.hostname+':3000/rooms',
		success: function(data) {
			var infos = JSON.parse(data);
			cards.innerHTML = '';
			for(let i=0; i<infos.length; i++)
			{
				addCard(infos[i][0], infos[i][1], i);
			}
		}
	});
}

function addCard(name, title, x) {
	cards.innerHTML += '<div class="card" style="width: 18rem;"> \
<img class="card-img-top" src="img/note.png" height="250px" alt="Card image cap"> \
  <div class="card-body"> \
    <h5 class="card-title">'+name+'</h5>\
    <p class="card-text">'+title+'</p>\
    <a href="room.php?id='+x+'" class="btn btn-primary">Raum betreten</a>\
  </div>\
</div>';
}
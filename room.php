<?php
	header('Access-Control-Allow-Origin: *');

	if(!isset($_GET["id"]))
	{
		echo "<script>window.location.href='multi.php';</script>";
		exit; 
	}

	require_once('include/stuff.php');
	
	$project = 'AdvMultiComm';
?>	
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php echo $project; ?></title>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/room.css" rel="stylesheet">
</head>
<body>
<header>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
	<a class="navbar-brand" href="index.php"><?php echo $project; ?></a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
	  <span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
	  <ul class="navbar-nav">
		<li class="nav-item">
		  <a class="nav-link" href="index.php">Home</a>
		</li>
		<li class="nav-item">
		  <a class="nav-link" href="multi.php">Multiraum</a>
		</li>
	  </ul>
	</div>
  </nav>
</header>

<div class="playlist">
<img src="img/yellow.png" id="oIcon" class="online-icon" alt="icon">
<h3>Chat</h3>
<hr>
<div id="chat-box">

</div>
<hr>
<div class="form-group" style="margin-bottom:-30px;">
<input type="text" class="form-control" id="chat" placeholder="Nachricht">
</div>
</div>

<main role="main" class="container text-center">
<audio id="player" style="margin-left:auto;margin-right:auto;display:block;" 
  controls
  src="-" 
  crossorigin="anonymous"
  type="audio/mp3" 
>
Ihr Browser kann dieses Tondokument nicht wiedergeben.
</audio>
<p class="text-center" id="song_info" style="margin-top:30px;margin-bottom:-10px;font-weight:bold;display:none;">Playlist: abc - bird3.mp3</p>
<hr>
<button id="init-btn">Start WEB-Audio-API</button>
<table class="music_control">
<tr><td><b>Volume:</b></td><td><input id="volume_slider"type="range" step="1"  min="1" max="100" value="50" class="slider"></td><td id="s0">50</td></tr>
<tr><td><b>Panning:</b></td><td><input type="range" step="1" oninput="con_up(1,this.value);" onchange="con_up(1,this.value);" min="1" max="100" value="50" class="slider"></td><td id="s1">50</td></tr>
<tr><td><b>LowPassFilter:</b></td><td><input type="range" step="1" oninput="con_up(2,this.value);" onchange="con_up(2,this.value);" min="1" max="100" value="50" class="slider"></td><td id="s2">50</td></tr>
<tr><td><b>HighPassFilter:</b></td><td><input type="range" step="1" oninput="con_up(3,this.value);" onchange="con_up(3,this.value);" min="1" max="100" value="50" class="slider"></td><td id="s3">50</td></tr>
</table>

</main>

<div class="song_list">
<h3>Playlist</h3>
<hr>
<div id="inner_playlist"></div>
</div>


<div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="detailModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="detailModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="detailPlaylist">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
      </div>
    </div>
  </div>
</div>

<?php echo getFooter($project); ?>
<script src="js/room.js"></script>
<script src="js/playlist.js"></script>
<script src="js/audio.js"></script>
</body>
</html>
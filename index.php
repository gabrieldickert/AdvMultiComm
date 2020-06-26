<?php
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
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/main.css" rel="stylesheet">
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
		<li class="nav-item active">
		  <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
		</li>
		<li class="nav-item">
		  <a class="nav-link" href="multi.php">Multiraum</a>
		</li>
	  </ul>
	</div>
  </nav>
</header>
<div class="playlist">
<h3>Playlist</h3>
<hr>
<div id="inner_playlist"></div>
<i class="fa fa-plus plus" data-toggle="modal" data-target="#playlistModal"></i>
</div>
<main role="main" class="container">
<?php
	$music = explode("|",file_get_contents("http://".$_SERVER['SERVER_NAME'].":3000/files"));
	
	$string = '<table class="table"><thead class="thead-dark"><tr><th>Song - Name</th><th>Abspielen</th><th>Playlist</th></tr></thead>';
	for($i=0; $i<count($music); $i++)
	{
		$string .= '<tr><td>'.$music[$i].'</td><td><i onclick="playSong(\''.$music[$i].'\');" class="fa fa-play play"></i></td><td><i onclick="addSong(\''.$music[$i].'\');" class="fa fa-plus play"></i></td></tr>';
	}
	
	echo $string.'</table>';
?>
<br><br>
<audio id="player" style="margin-left:auto;margin-right:auto;display:block;" 
  controls
  src="-" 
  type="audio/mp3" 
>
Ihr Browser kann dieses Tondokument nicht wiedergeben.
</audio>
<p class="text-center" id="song_info" style="margin-top:30px;margin-bottom:-10px;font-weight:bold;display:none;">Playlist: abc - bird3.mp3</p>
</main>

<div class="modal fade" id="playlistModal" tabindex="-1" role="dialog" aria-labelledby="playlistModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="playlistModalLabel">Playlist hinzufügen</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
			<input type="text" id="playlist_title" placeholder="Playlist Name" class="form-control">
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
        <button type="button" class="btn btn-primary bgBlue" id="playlist_add">Hinzufügen</button>
      </div>
    </div>
  </div>
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

<div class="modal fade" id="addSongModal" tabindex="-1" role="dialog" aria-labelledby="addSongModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addSongModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="addSongBody">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
      </div>
    </div>
  </div>
</div>

<?php echo getFooter($project); ?>
<script src="js/playlist.js"></script>
</body>
</html>
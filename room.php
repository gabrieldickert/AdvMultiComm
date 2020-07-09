
<?php
require_once('include/stuff.php');

$project = 'AdvMultiComm';
?>	
<html>
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
            <audio  id="player" style="margin-left:auto;margin-right:auto;display:block;" 
                    controls
                    src="-" 
                    crossorigin="anonymous"
                    type="audio/mp3" 
                    hidden=""
                    >
                Ihr Browser kann dieses Tondokument nicht wiedergeben.
            </audio>




            <canvas id="audio_visual_player" width="300px" height="400px" style="margin-bottom:30px;">

            </canvas>

            <div class="container" style="background-color:#007bff;border-radius:5px;">
                <div class="row">
                    <div class="col-md-1"><button id="audio-control-play-btn" style="background:rgba(0,0,0,0);border:0px;"><i class="fa fa-play"></i></button></div>
                    <div class="col-md-2" id="audio-time-informs" style="color:white;margin-top:3.5px;">--:--</div>
                    <div class="col-md-4"><canvas id="audio-time-progress-bar"  height="10" style="height:10px;margin-top:8.5px;"></canvas></div>
                    <div class="col-md-3"><button id="audio-control-mute-btn" style="background:rgba(0,0,0,0);border:0px;"><i class="fa fa-volume-up"></i></button></div>
					<div class="col-md-2"><button id="mic-btn" style="background:rgba(0,0,0,0);border:0px;"><i class="fa fa-microphone-slash"></i></button></div>
                </div>
            </div>
			<audio id="mic-player" autoplay muted></audio>
            <p class="text-center" id="song_info" style="margin-top:30px;margin-bottom:-10px;font-weight:bold;display:none;">Playlist: abc - bird3.mp3</p>
            <button id="nerd-stats-btn" style="margin-left:540px;margin-top:10px;" data-toggle="modal" data-target="#nerdstatsmodal" class="btn btn-info">Statistics for Nerds</button>
            <hr>
            <button id="init-btn" style="display:none;">Start WEB-Audio-API</button>
            <table class="music_control">
                <tr><td><b>Volume:</b></td><td><input id="volume_slider"type="range" step="1"  min="1" max="100" value="50" class="slider"></td><td id="s0">50%</td></tr>
                <tr><td><b>Panning:</b></td><td><input id="panner_slider"type="range" step="0.01"  min="-1" max="1" value="0" class="slider"></td><td id="s1">0</td></tr>

                <tr><td> <b>BiQuadFilter:</b>
                    <td id ="filter">
                        <select id ="BiQuadFilter" placeholder="BiQuadFilter">
                            <option value="lowfrequency">Low Frequency</option>
                            <option value="highfrequency" >High Frequency</option>
                            <option value="off" selected>Off</option>  
                        </select>
                    </td>
                    <td id="bars">
                        <select id="waves" placeholder="waves">
                            <option value="sinewave">Sinewave</option>
                            <option value="frequencybars" >Frequency bars</option>
                            <option value="off" selected>Off</option>  
                        </select>
                    </td>
                    <!--<td>
                      <input type="range" step="1" oninput= onchange="con_up(2,this.value);">
                    </td>-->

                </tr>
              
              <tr><td><b>Convolver</b>
    </td>
    <td id="hf">
      <select id="property">
                  <option value="reverb">Reverb Effect</option>
                  <option value="disablenormal" >Disable Normalization</option>
                  <option value="off" selected>Off</option>  
      </select>
            <td id ="convolver">
                <select id ="convolverwave" placeholder="">
                      <option value="sinewave">Sinewave</option>
                      <option value="frequencybars" >Frequency bars</option>
                      <option value="off" selected>Off</option>  
                </select>
            </td>
                <!--<td>
                  -<input type="range" step="1" oninput="con_up(3,this.value);" onchange="con_up(3,this.value)
                </td>-->
    
    </tr>
    <tr>
      <td>
        <b>Oscillator_wave</b>
      </td>
      <td>
        <input id="Oscillator_wave"type="range" step="0.1"  min="20" max="1000" value="440" class="slider">  
      </td>
      <td>
        <input type="text" id="freq" value="440" disabled>     
      </td>
      <td><input type="button" value="start" id="start"></td>
      <td></td>
    </tr>


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



        <!-- Stats for Nerds !-->
        <div class="modal fade" id="nerdstatsmodal" tabindex="-1" role="dialog" aria-labelledby="detailModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="detailModalLabel">Statistics</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="">
                        <table id="detailaudio-tbl">
                            <tbody>

                            </tbody>
                        </table>
                        <table id="byte-tbl">
                            <tbody></tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
                    </div>
                </div>
            </div>
        </div>


		<audio id="player2"></audio>

        <?php echo getFooter($project); ?>
		<script src="js/playBytes.js"></script>
        <script src="js/room.js"></script>
        <script src="js/playlist.js"></script>
        <script src="js/audio.js"></script>
		<script>
		setTimeout(function() {
			document.getElementById("init-btn").click();
			console.log("Clicked!");
		},150);
		</script>
    </body>

</html>
<?php include_once './php/includes/head.php'; ?>
<body>
    <div class="header2 bg-success-gradiant">
        <div >
            <?php include_once './php/includes/navbar.php'; ?>
        </div>
    </div>
    <!--Site Content goes here -->

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class=playlist">
                    <i class="fa fa-plus plus" style=""data-toggle="modal" data-target="#playlistModal"><span>New Playlist</span></i>
                    <h3 class="text-center">Playlist</h3>
                    <hr>
                    <div id="inner_playlist"></div>
                </div>
            </div>
                    <audio id="player" style="margin-left:auto;margin-right:auto;display:block;" controls="" src="http://localhost:3000/stream/car Sound.mp3" type="audio/mp3">
                Ihr Browser kann dieses Tondokument nicht wiedergeben.
            </audio>

        </div>
     


        <div class="container py-5">

            <div class="row">
                <div class="col-lg-8 mx-auto">
                    
                    <h3 class="text-center">Music-Katalog</h3>

                    <!-- List group-->
                    <ul class="list-group shadow">

                        <?php
                        $music = explode("|", file_get_contents("http://" . $_SERVER['SERVER_NAME'] . ":3000/files"));

                        //  $string = '<table class="table"><thead class="thead-dark"><tr><th>Song - Name</th><th>Abspielen</th><th>Playlist</th></tr></thead>';
                        for ($i = 0; $i < count($music); $i++) {
                            //$string .= '<tr><td>' . $music[$i] . '</td><td><i onclick="playSong(\'' . $music[$i] . '\');" class="fa fa-play play"></i></td><td><i onclick="addSong(\'' . $music[$i] . '\');" class="fa fa-plus play"></i></td></tr>';
                            ?>
                            <!-- list group item-->
                            <li class="list-group-item">
                                <!-- Full Page Intro -->
                                <div class="view">
                                    <!-- Mask & flexbox options-->
                                    <div class="mask gradient-card align-items-center">
                                        <!-- Content -->
                                        <div class="container d-flex justify-content-center my-4">
                                            <div id="mobile-box">
                                                <!-- Card -->
                                                <div class="music-card">
                                                    <!-- Card image -->
                                                    <div class="view">
                                                        <img class="card-img-top" src="https://www.hs-fulda.de/fileadmin/_processed_/0/1/csm_01_Blatt_RGB-300_2e46d80bf8.jpg"
                                                             alt="Card image cap">
                                                        <a href="https://bachataurban.com/" target="_blank">
                                                            <div class="mask gradient-card"></div>
                                                        </a>
                                                    </div>
                                                    <!-- Card content -->
                                                    <div class="card-body text-center">
                                                        <div class="row">
                                                            <div class="col-md-10">  <h5 class="h5 font-weight-bold"><a href="https://bachataurban.com/" target="_blank"><?= $music[$i] ?></a></h5></div>
                                                            <div class="col-md-2">  <button type="button" class="btn btn-success" onclick='addSong("<?php echo $music[$i]?>");'> <i  class="fa fa-plus play"></i></button></div>
                                                        </div>

      <!--<p class="mb-0"></p>-->

                                                        <audio id="music" controls="" preload="true">
                                                            <source src="<?php echo("http://" . $_SERVER['SERVER_NAME'] . ":3000/stream/".$music[$i]."");?> ">
                                                        </audio>
                                                        <!--<div id="audioplayer">
                                                            <i id="pButton" class="fas fa-play"></i>
                                                            <div id="timeline">
                                                                <div id="playhead"></div>
                                                            </div>
                                                        </div>-->

                                                    </div>
                                                </div>

                                                <!-- Card -->
                                            </div>
                                        </div>
                                        <!-- Content -->
                                    </div>
                                    <!-- Mask & flexbox options-->
                                </div>
                            </li>
                            <!-- End -->

                            <!-- list group item-->
                            <!-- <li class="list-group-item">
                            <!-- Custom content
                            <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                              <div class="media-body order-2 order-lg-1">
                                <h5 class="mt-0 font-weight-bold mb-2">Awesome product</h5>
                                <p class="font-italic text-muted mb-0 small">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.</p>
                                <div class="d-flex align-items-center justify-content-between mt-1">
                                  <h6 class="font-weight-bold my-2">$99.00</h6>
                                  <ul class="list-inline small">
                                    <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                  </ul>
                                </div>
                              </div><img src="https://res.cloudinary.com/mhmd/image/upload/v1556485077/shoes-3_rk25rt.jpg" alt="Generic placeholder image" width="200" class="ml-lg-5 order-1 order-lg-2">
                            </div>
                            <!-- End -->
                            </li>

                        <?php }
                        ?>
                    </ul>
                    <!-- End -->
                </div>
            </div>
        </div>
    </div>





<?php include_once './php/includes/footer.php'; ?>
</body>

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
<?php include_once './php/includes/scripts.php'; ?>
<script src="assets/js/playlist.js"></script>


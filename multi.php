<?php
	header('Access-Control-Allow-Origin: *');


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
		<li class="nav-item">
		  <a class="nav-link" href="index.php">Home</a>
		</li>
		<li class="nav-item active">
		  <a class="nav-link" href="multi.php">Multiraum <span class="sr-only">(current)</span></a>
		</li>
	  </ul>
	</div>
  </nav>
</header>

<main role="main" class="container text-center">
<h2>Räume</h2>
<hr>
<div id="cards">

</div>
<hr>
<i class="fa fa-plus" style="background-color:#51a9ff; float:right; margin-top:-10px;margin-right:-20px;" data-toggle="modal" data-target="#roomModal"></i>
</main>

<div class="modal fade" id="roomModal" tabindex="-1" role="dialog" aria-labelledby="roomModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Raum Erstellen</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<div class="form-group">
        <input type="text" placeholder="Raum Name" maxlength="20" id="raum_name" class="form-control">
		</div>
		<div class="form-group">
        <input type="text" placeholder="Raum Beschreibung" id="raum_beschreibung" class="form-control">
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
		<button type="button" class="btn btn-primary" onclick="createRoom();" data-dismiss="modal">Erstellen</button>
      </div>
    </div>
  </div>
</div>

<?php echo getFooter($project); ?>
<script src="js/multiraum.js"></script>
</body>
</html>
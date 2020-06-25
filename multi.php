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

<main role="main" class="container">

</main>

<?php echo getFooter($project); ?>
</body>
</html>
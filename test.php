<?php
header('Access-Control-Allow-Origin: *');


require_once('include/stuff.php');

$project = 'AdvMultiComm';
?>	
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
        <audio id="player" controls></audio>
       
        
        <button id='mic'>Mic</button>
    </body>
    
    <script src='js/microphone.js'></script>
    
    
</html>
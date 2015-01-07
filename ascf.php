<?php
    //for adding/editing the card format
	$data = file_get_contents("php://input");
	$data = json_decode($data);
	$sdata = json_encode($data, JSON_PRETTY_PRINT); //sdata should be JSON now
	$file = fopen("./dat/cards.json", 'w');
	fwrite($file, $sdata);
	fclose($file);
?>
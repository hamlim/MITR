<?php
    //a simple script to handle editing cards
	$data = file_get_contents("php://input");
	$data = json_decode($data);
	$sdata = json_encode($data, JSON_PRETTY_PRINT); //sdata should be JSON now
	
	$file = fopen("./data/cards.json", 'w');
	fwrite($file, $sdata);
	fclose($file);
	
?>
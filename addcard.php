<?php
    //this script is a background add card functionality handler
    //someone will call this script when someone clicks submit on the form with the new card data
    
	$data = file_get_contents("php://input");
	$data = json_decode($data);
	$sdata = json_encode($data, JSON_PRETTY_PRINT); //sdata should be JSON now
	
	$file = fopen("./data/cards.json", 'w');
	fwrite($file, $sdata);
	fclose($file);
	
    
    
?>
<?php
	$data = file_get_contents("php://input");
	$data = json_decode($data);
	$sdata = serialize($data);
	
	$file = fopen("./data/users.txt", 'w');
	fwrite($file, $sdata);
	fclose($file);
	
?>
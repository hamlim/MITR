<?php
	$data = file_get_contents("php://input");
	$file = fopen("./data/users1.txt", 'w');
	fwrite($file, $data);
	fclose($file);
	
?>
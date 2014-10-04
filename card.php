<?php
    require_once 'cbreeze.php';
    require 'config.php';
    
	try {
		// Create connection to database
		$db = new cbreeze($config);
	} catch(Exception $e) {
		if($config['debug'] == 'on') {
			array_push($error,'ERROR: ' . $e->getmessage());
		}
	}
    
    class card {
        
    }
?>
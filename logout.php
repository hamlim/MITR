<?php
	session_start();
	setcookie(session_name(),'',time() - 72000);
	session_unset();
	session_destroy();
	header('Location: app.php');
?>

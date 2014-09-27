<?php
  //Here is the bulk of the sign-in/sign-up page. Here we will render the the user the opportunity to 
  //  do either action. Note that the idea as of now is to build this modularly so that we can make
  //  a single page and simply render each php file as needed. This might change in the future.
  
	require_once 'cbreeze.php';
	require 'config.php';

	// if (session_status() == PHP_SESSION_NONE) {
		session_start();
    // }
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    	header("location:./app.php");
    }

    $error = array();
	try {
		// Create connection to database
		$db = new cbreeze($config);
	} catch(Exception $e) {
		if($config['debug'] == 'on') {
			array_push($error,'ERROR: ' . $e->getmessage());
		}
	}
	//now we handle the first case in that the user is signing in not signing up.
	if (isset($_POST['login']) && $_POST['login'] == 'Login') {
		$uname = $_POST['email'];
		$pass = $_POST['pass'];
		try{
			//verify the user
			//verifyUser(username, password) returns either true or false
			$login = $db->verifyUser($email, $pass);
			//getUserByName(username) returns a user object from mysql tables
		} catch(Exception $e) {
			if($config['debug'] == 'on') {
				array_push($error,'ERROR: ' . $e->getmessage());
			}
		}
		
		if (isset($login) && $login == true){
			try {
				$user = $db->getUserByEmail($email);
				// echo var_dump($user);
				$_SESSION['email'] = $user['email'];
				$_SESSION['name']     = $user['name'];
				$_SESSION['loggedin'] = true;
			} catch(Exception $e) {
				if($config['debug'] == 'on') {
					array_push($error,'ERROR: ' . $e->getmessage());
				}
			}
		}
		else {
			// echo "Incorrect Username or Password!";
			array_push($error,"Incorrect Username or Password!");
		}
	} else if ($_POST['pass'] != $_POST['verify_pass']){
				$msg = "Passwords must match.";
    }

	if(isset($_SESSION['email'])) {
		header('Location: app.php');
		exit();
	}

?>



<!--HTML codes for logging in-->
<!doctype html>
<html>
<head>
  <title>Login</title>
</head>
<body>
  <?php if (isset($_SESSION['email'])): ?>
  <h1>Welcome, <?php echo htmlentities($_SESSION['email']) ?></h1>
  <form method="post" action="login.php">
    <input name="logout" type="submit" value="Logout" />
  </form>
  <?php else: ?>
  <h1>Login</h1>
  <?php if (isset($err)) echo "<p>$err</p>" ?>
  <form method="post" action="login.php">
    <label for="username">Email: </label><input type="email" name="email" />
    <label for="pass">Password: </label><input type="password" name="password" />
    <input name="login" type="submit" value="Login" />
  </form>
  <?php endif; ?>
</body>
</html>


<?php
session_start();

// Connect to the database
try {
  $dbname = 'cbreeze';
  $user = 'root';
  $pass = '';
  $dbconn = new PDO('mysql:host=?;dbname='.$dbname, $user, $pass);
}
catch (Exception $e) {
  echo "Error: " . $e->getMessage();
}


// Check login
if (isset($_POST['login']) && $_POST['login'] == 'Login') {

// validate user, setup session variables and check to see if an admin here
    $salt_stmt = $dbconn->prepare('SELECT salt FROM Users WHERE username=:username');
    $salt_stmt->execute(array(':username' => $_POST['username']));
    $res = $salt_stmt->fetch();
    $salt = ($res) ? $res['salt'] : '';
    $salted = hash('sha256', $salt . $_POST['pass']);


    $login_stmt = $dbconn->prepare('SELECT username, uid, isAdmin FROM Users WHERE username=:username AND password=:password');
    $login_stmt->execute(array(':username' => $_POST['username'], ':password' => $salted));
  
    if ($user = $login_stmt->fetch()) {
      $_SESSION['username'] = $user['username'];
      $_SESSION['uid'] = $user['uid'];
      $_SESSION['isAdmin'] = $user['isAdmin'];
    }

    // only for admin
    if ($user['isAdmin']==true) {
      header('Location: registerNewusers.php');
      exit();
    }
  } else {
    if (ini_get("session.use_cookies")) {
      $params = session_get_cookie_params();
      setcookie(session_name(), '', time() - 72000,
          $params["path"], $params["domain"],
          $params["secure"], $params["httponly"]
      );
    }
  session_destroy();
    $err = 'Incorrect username or password.';
  }



// Logout
if (isset($_SESSION['username']) && isset($_POST['logout']) && $_POST['logout'] == 'Logout') {
// end your session here
  $err = 'You have been logged out.';
}

?>


<!--HTML codes for logging in-->
<!doctype html>
<html>
<head>
  <title>Login</title>
</head>
<body>
  <?php if (isset($_SESSION['username'])): ?>
  <h1>Welcome, <?php echo htmlentities($_SESSION['username']) ?></h1>
  <form method="post" action="login.php">
    <input name="logout" type="submit" value="Logout" />
  </form>
  <?php else: ?>
  <h1>Login</h1>
  <?php if (isset($err)) echo "<p>$err</p>" ?>
  <form method="post" action="login.php">
    <label for="username">Username: </label><input type="text" name="username" />
    <label for="pass">Password: </label><input type="password" name="password" />
    <input name="login" type="submit" value="Login" />
  </form>
  <?php endif; ?>
</body>
</html>
<?php
//session_start();
//
//// Connect to the database
//try {
//  $dbname = 'hamlim_cbreeze'; //these are examples used on matt's local server
//  $user = 'hamlim_root'; //example
//  $pass = 'rootroot'; //example
//  $dbconn = new PDO('mysql:host=localhost;dbname='.$dbname, $user, $pass);
//}
//catch (Exception $e) {
//  echo "Error: " . $e->getMessage();
//}
//
//
//// Check login
//if (isset($_POST['login']) && $_POST['login'] == 'Login') {
//
//// validate user, setup session variables and check to see if an admin here
//    $salt_stmt = $dbconn->prepare('SELECT salt FROM Users WHERE email=:email');
//    $salt_stmt->execute(array(':email' => $_POST['email']));
//    $res = $salt_stmt->fetch();
//    $salt = ($res) ? $res['salt'] : '';
//    $salted = hash('sha256', $salt . $_POST['pass']);
//
//
//    $login_stmt = $dbconn->prepare('SELECT email, uid, isAdmin FROM Users WHERE email=:email AND password=:password');
//    $login_stmt->execute(array(':email' => $_POST['email'], ':password' => $salted));
//  
//    if ($user = $login_stmt->fetch()) {
//      $_SESSION['email'] = $user['email'];
//      $_SESSION['uid'] = $user['uid'];
//      $_SESSION['isAdmin'] = $user['isAdmin'];
//    }
//
//    // only for admin
//    if ($user['isAdmin']==true) {
//      header('Location: settings.php');
//      exit();
//    }
//  } else {
////    if (ini_get("session.use_cookies")) {
////      $params = session_get_cookie_params();
////      setcookie(session_name(), '', time() - 72000,
////          $params["path"], $params["domain"],
////          $params["secure"], $params["httponly"]
////      );
////    }
//    //session_destroy();
//    $err = 'Incorrect email or password.';
//  }
//
//
//
//// Logout
////if (isset($_SESSION['email']) && isset($_POST['logout']) && $_POST['logout'] == 'Logout') {
//// end your session here
////  $err = 'You have been logged out.';
////}

?>


<!--HTML codes for logging in-->
<!doctype html>
<html>
<head>
  <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Login</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
  <!--links to stylesheets-->
  <link rel="stylesheet" href="uikit-2.10.0/css/uikit.css" />
  <link rel="stylesheet" href="styles/custom.css">
  <!--link to js-->
  <script src="js/custom.js" type="text/javascript"></script>
  <script src="uikit-2.10.0/js/uikit.min.js" type="text/javascript"></script>
  <script src="js/users.js"></script>
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
    <label for="username">Email: </label><input type="email" id="email" name="email" />
    <label for="pass">Password: </label><input type="password" id="pass" name="password" />
    <input name="login" type="submit" value="Login" />
  </form>
  <script>
    var useremail = $("#email").val();
    var password = $("#pass").val();
  </script>
  <script src="js/users.js"></script>
  <?php endif; ?>
</body>
</html>

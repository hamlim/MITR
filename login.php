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



<!--
<!doctype html>
<html>
<head>
  <title>Login</title>
</head>
<body>
  <//?php if (isset($_SESSION['username'])): ?>
  <h1>Welcome, <//?php echo htmlentities($_SESSION['username']) ?></h1>
  <form method="post" action="login_secure_auth.php">
    <input name="logout" type="submit" value="Logout" />
  </form>
  <//?php else: ?>
  <h1>Login</h1>
  <//?php if (isset($err)) echo "<p>$err</p>" ?>
  <form method="post" action="login_secure_auth.php">
    <label for="username">Username: </label><input type="text" name="username" />
    <label for="pass">Password: </label><input type="password" name="pass" />
    <input name="login" type="submit" value="Login" />
  </form>
  <//?php endif; ?>
</body>
</html>


<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Login</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
    <body>

        <div class="header-container">
            <header class="wrapper clearfix">
                <h1 class="title">h1.title</h1>
                <nav>
                    <ul>
                        <li><a href="#">nav ul li a</a></li>
                        <li><a href="#">nav ul li a</a></li>
                        <li><a href="#">nav ul li a</a></li>
                    </ul>
                </nav>
            </header>
        </div>

        <div class="main-container">
            <div class="main wrapper clearfix">

                <article>
                    <header>
                        <h1>article header h1</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sodales urna non odio egestas tempor. Nunc vel vehicula ante. Etiam bibendum iaculis libero, eget molestie nisl pharetra in. In semper consequat est, eu porta velit mollis nec.</p>
                    </header>
                    <section>
                        <h2>article section h2</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sodales urna non odio egestas tempor. Nunc vel vehicula ante. Etiam bibendum iaculis libero, eget molestie nisl pharetra in. In semper consequat est, eu porta velit mollis nec. Curabitur posuere enim eget turpis feugiat tempor. Etiam ullamcorper lorem dapibus velit suscipit ultrices. Proin in est sed erat facilisis pharetra.</p>
                    </section>
                    <section>
                        <h2>article section h2</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sodales urna non odio egestas tempor. Nunc vel vehicula ante. Etiam bibendum iaculis libero, eget molestie nisl pharetra in. In semper consequat est, eu porta velit mollis nec. Curabitur posuere enim eget turpis feugiat tempor. Etiam ullamcorper lorem dapibus velit suscipit ultrices. Proin in est sed erat facilisis pharetra.</p>
                    </section>
                    <footer>
                        <h3>article footer h3</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sodales urna non odio egestas tempor. Nunc vel vehicula ante. Etiam bibendum iaculis libero, eget molestie nisl pharetra in. In semper consequat est, eu porta velit mollis nec. Curabitur posuere enim eget turpis feugiat tempor.</p>
                    </footer>
                </article>

                <aside>
                    <h3>aside</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sodales urna non odio egestas tempor. Nunc vel vehicula ante. Etiam bibendum iaculis libero, eget molestie nisl pharetra in. In semper consequat est, eu porta velit mollis nec. Curabitur posuere enim eget turpis feugiat tempor. Etiam ullamcorper lorem dapibus velit suscipit ultrices.</p>
                </aside>

            </div> <!-- #main -- >
        </div> <!-- #main-container -- >

        <div class="footer-container">
            <footer class="wrapper">
                <h3>footer</h3>
            </footer>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.0.min.js"><\/script>')</script>

        <script src="js/main.js"></script>
    </body>
</html>
--!>

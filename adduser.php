<?php
    //a simple page to add the root user to the database
    
    require_once "config.php";
    require_once "cbreeze.php";

    
    try {
        require "config.php";
        $db = new cbreeze($config);
        echo "DB connection established ";
        echo "\n";
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
    
    //now we want to add a root user, so we call addUser(root);
    $useremail = "root";
    $pass = "seamonkey";
    $name = "root";
    $admin = 1;
    if ($db->addUser($useremail, $pass, $admin)){
        //it worked and the root user is added
        $_SESSION['email'] = "root";
        $_SESSION['password'] = "seamonkey";
        $_SESSION['name'] = "root";
        $_SESSION['admin'] = true;
        header("location: app.php");
    } else {
        echo "Error, user not added. ";
    }
    

?>
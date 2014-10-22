<?php
    //a simple page to add the root user to the database
    
    require_once "config.php";
    require_once "cbreeze.php";

    
    try {
        require "config.php";
        $db = new cbreeze($config);
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
    
    //now we want to add a root user, so we call addUser(root);
    $useremail = "root";
    if ($db->addUser($useremail)){
        //it worked and the root user is added
        header("location:./app.php");
        $_SESSION['email'] = 'root';
        $_SESSION['password'] = 'seamonkey';
    } else {
        echo "Error, user not added.";
    }
    

    //now call $db->functionname to call it
?>
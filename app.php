<?php
	//started of with some html5boilerplate from html5boilerplate.com
    require_once "config.php";
    require_once "cbreeze.php";
	include "header.php";

    try {
        require "config.php";
        $db = new cbreeze($config);
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
	///* login page */
	//include "login.php";
?>

<!DOCTYPE html>
<html class="no-js">
    <head>
        <!--link to latest jquery-->
        <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Application</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        <!--links to stylesheets-->
        <link rel="stylesheet" href="uikit-2.10.0/css/uikit.css" />
        <link rel="stylesheet" href="styles/custom.css">
        <!--link to js-->
        <script src="js/custom.js" type="text/javascript"></script>
        <script src="uikit-2.10.0/js/uikit.min.js" type="text/javascript"></script>
    </head>
    <body onload="columns();">
    
    	<!--IF not logging in-->
        <?php //if (!isset($_SESSION['username'])):
            //it should work when we have users in the database
            //exit();
        ?>

        <!--ELSE-->
        <?php //else: ?>
    
        <!--start columns-->
        <ul id = "columnslist">
            <li class = "column" id = "col1">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column" id = "col2">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column" id = "col3">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column" id = "col4">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column" id = "col5">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                    <li class = "card"><div class = "cardheader"><p class = "cardpriority">1<span class = "cardtitle">Title</span></p></div></div></li>
                </ul>
            </li>
        </ul>
        
        <!--END IF-->
        <?php //endif; ?>

        <script src="js/main.js"></script>
    </body>
</html>

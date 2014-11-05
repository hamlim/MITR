<?php
	//started of with some html5boilerplate from html5boilerplate.com
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
        <title>C-Breeze</title>
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
    <body onload="columns('#262626', '#CFCFCF', 5);">
    
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
                <ul class = "cardlist connected list">
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">1<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">2<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">3<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">4<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column" id = "col2">
                <h2>Heading</h2>
                <ul class = "cardlist connected list">
                   <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">5<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">6<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column" id = "col3">
                <h2>Heading</h2>
                <ul class = "cardlist connected list">
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">7<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">8<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">9<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column" id = "col4">
                <h2>Heading</h2>
                <ul class = "cardlist connected list">
                   <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">10<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">11<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">12<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">13<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column" id = "col5">
                <h2>Heading</h2>
                <ul class = "cardlist connected list">
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">14<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">15<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">16<span class = "cardtitle">Title<i class = "uk-icon-pencil-square-o"></i></span></p>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        
        <!--END IF-->
        <?php //endif; ?>

        <script src="js/main.js"></script>
    </body>
</html>

<?php
	//started of with some html5boilerplate from html5boilerplate.com
	include "header.php";
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
    <body>
        <!--activity feed, yo-->
        <div id = "activityfeed">
            <ul id = "activitylist">
                <li class = "activity">Hayley made changes to <a href = "#" target = "_blank">this thing right here</a></li>
                <li class = "activity">Jessie made changes to <a href = "#" target = "_blank">that thing by the other thing</a></li>
                <li class = "activity">Chris made changes to <a href = "#" target = "_blank">that one weird thing over there</a></li>
                <li class = "activity">Wow made changes to <a href = "#" target = "_blank">this thing found here</a></li>
                <li class = "activity">Matt made changes to <a href = "#" target = "_blank">that thing waaay over there</a></li>
            </ul>
        </div>
        <!--start columns-->
        <ul id = "columnslist">
            <li class = "column">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                </ul>
            </li>
            <!--new column-->
            <li class = "column">
                <h2>Heading</h2>
                <ul class = "cardlist">
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                    <li class = "card">Yo</li>
                </ul>
            </li>
        </ul>

        <script src="js/main.js"></script>
    </body>
</html>
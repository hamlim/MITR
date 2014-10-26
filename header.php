<?php
    require_once "config.php";
    require_once "cbreeze.php";

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
        <!--links to js-->
        <script src="js/custom.js" type="text/javascript"></script>
        <script src="js/appjs.js" type="text/javascript"></script>
        <script src="uikit-2.10.0/js/uikit.min.js" type="text/javascript"></script>
    </head>
    <body>
        <nav class="uk-navbar" id = "navyo">
            <a href = "app.php"><img src = "styles/pics/C-Quip_header.png"></a>
            <div class="uk-navbar-flip">
                <ul class="uk-navbar-nav">
                    <li><button onclick="ajxAddCard();"><i class="uk-icon-plus"></i>Add Card</button></li>

                    <!--dropdown, yo-->
                    <li class="uk-parent" data-uk-dropdown><a href><i class="uk-icon-list-ul"></i>Activity Feed</a>
                        <div class="uk-dropdown uk-dropdown-navbar-af" id = "activityfeed">
                            <ul>
                                <li class = "activity">Hayley made changes to <a href = "#" target = "_blank">this thing right here</a></li>
                                <li class = "activity">Jessie made changes to <a href = "#" target = "_blank">that thing by the other thing</a></li>
                                <li class = "activity">Chris made changes to <a href = "#" target = "_blank">that one weird thing over there</a></li>
                                <li class = "activity">Wow made changes to <a href = "#" target = "_blank">this thing found here</a></li>
                                <li class = "activity">Matt made changes to <a href = "#" target = "_blank">that thing waaay over there</a></li>
                            </ul>
                        </div>  
                    </li>                     





                    <li class="uk-parent" data-uk-dropdown><a href><i class="uk-icon-chevron-down"></i>Username</a>
                        <div class="uk-dropdown uk-dropdown-navbar">
                            <ul class = "uk-nav uk-nav-navbar">
                                <li><a href="settings.php">Settings</a></li>
<!--                                <li><a href="#">Blah</a></li>-->
                                <li><a href="#">Log Out</a></li>
                            </ul>
                        </div>  
                    </li>  
                </ul>
            </div>
        </nav>



    </body>
</html>


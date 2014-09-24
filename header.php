<!DOCTYPE html>
<html class="no-js">
    <head>
        <script src="http://code.jquery.com/jquery-latest.min.js"
        type="text/javascript"></script>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Application</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>

        <link rel="stylesheet" href="uikit-2.10.0/css/uikit.min.css" />
        <link rel="stylesheet" href="styles/custom.css">
        <script src="uikit-2.10.0/js/uikit.min.js"></script>


    </head>
    <body>
    <!--
        <div id = "header" class = >
            <a href = "app.php"><img src = "styles/pics/C-Quip_header.png"></a>
            <a href = "#">Recent Activity</a>
            <a href = "#">AcctName</a>
        </div>
    -->
        <nav class="uk-navbar" id = "navyo">
            <a href = "app.php"><img src = "styles/pics/C-Quip_header.png"></a>
            <div class="uk-navbar-flip">
                <ul class="uk-navbar-nav">
                    <li><a href="#">Activity Feed</a></li>
                     <li class="uk-parent" data-uk-dropdown><a href>Username</a>
                        <div class="uk-dropdown uk-dropdown-navbar">
                            <ul class = "uk-nav uk-nav-navbar">
                                <li><a href="#">Settings</a></li>
                                <li><a href="#">Blah</a></li>
                                <li><a href="#">Log Out</a></li>
                            </ul>
                        </div>  
                    </li>  
                </ul>
            </div>
        </nav>



    </body>
</html>


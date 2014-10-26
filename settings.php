<?php
    //started of with some html5boilerplate from html5boilerplate.com
    include "header.php";
?>


<!DOCTYPE html>
<html class="no-js" style="height:100%;">
    <head>
        <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Settings</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="uikit-2.10.0/css/uikit.css" />
        <link rel="stylesheet" href="styles/custom.css" />

        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        <script src="js/custom.js" type="text/javascript"></script>
        <script src="uikit-2.10.0/js/uikit.min.js" type="text/javascript"></script>
    </head>
    <body style="height: 100%;">
        <div class ="settingsContent">
            <div class = "settingsName">
                <img src="http://www.ihd-wallpapers.com/wp-content/uploads/2014/08/Grumpy_cat_wallpapers.jpg" style = "width:100px;height:100px" />
                <div>Christopher Renus</div>
            </div>
            <!--<ul class="uk-tab uk-tab-grid uk-tab-bottom" data-uk-tab>
                <li class="uk-width-1-3"><a href="">...</a></li>
            </ul>-->
            <div>
                <form class="uk-form-horizontal" >
                    <fieldset class="settings">
                        <h1>Account settings</h1>
                        <div class="uk-form-row">
                            <label class="uk-form-label" for="">Username:</label>
                            <input type="text" placeholder="Username">
                            <span class="uk-form-help-inline"></span>
                        </div>
                        <div class="uk-form-row">
                            <label class="uk-form-label" for="">Password:</label>
                            <input type="text" placeholder="Current">
                        </div>
                        <div class="uk-form-row">
                            <label class="uk-form-label" for=""></label>
                            <input type="text" placeholder="New Password">
                        </div>
                        <div class="uk-form-row">
                            <label class="uk-form-label" for=""></label>
                            <input type="text" placeholder="Confirm Password">
                        </div>
                        <div class="uk-form-row">
                            <label class="uk-form-label" for="">Color Scheme:</label>
                            <div class="uk-button-dropdown" data-uk-dropdown>

                                <button class="uk-button">...</button>

                                <!-- This is the dropdown -->
                                <div class="uk-dropdown uk-dropdown-small">
                                    <ul class="uk-nav uk-nav-dropdown">
                                        <li><a href="#" id="color1"></a></li>
                                        <li><a href="#" id="color2"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button class="uk-button uk-button-large button">Save Changes</button>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div class="footer-container">
                <footer class="wrapper">
                    <h3></h3>
                </footer>
            </div>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.0.min.js"><\/script>')</script>

        <script src="js/main.js"></script>
    </body>
</html>
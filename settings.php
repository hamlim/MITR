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
            <div class="settings">
                <ul class="uk-tab" data-uk-tab>
                    <li class="tab uk-active"><a href="#accountSettings">Account</a></li>
                    <li class="tab"><a href="#adminSettings">Admin</a></li>
                </ul>

                <ul id="settings-tabs" class="uk-switcher">
                    <li id="accountSettings" class="tab-content uk-active"><form class="uk-form-horizontal" >
                        <fieldset>
                            <h1>Account settings</h1>
                            <div class="uk-form-row">
                                <label class="uk-form-label" for="">Set Name:</label>
                                <input type="text" placeholder="John Philips">
                                <span class="uk-form-help-inline"></span>
                            </div>
                            <div class="uk-form-row">
                                <label class="uk-form-label" for="">Password:</label>
                                <input type="password" placeholder="Current">
                            </div>
                            <div class="uk-form-row">
                                <label class="uk-form-label" for=""></label>
                                <input type="password" placeholder="New Password">
                            </div>
                            <div class="uk-form-row">
                                <label class="uk-form-label" for=""></label>
                                <input type="password" placeholder="Confirm new Password">
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
                    </form></li>

                    <li id="adminSettings" class="tab-content"><form>
                        <fieldset>
                            <h1>Admin Settings</h1>
                            <div class="uk-form-row">
                                <label class="uk-form-label" for="">Add Users:</label>
                                <input type="email" placeholder="employee1@gmail.com">
                                <button type="submit" class="uk-button uk-button-large button" formmethod="post" >Add user</button>
                            </div>
                            <div class="uk-form-row">
                                <label class="uk-form-label" for="">Delete User:</label>
                                <input type="email" placeholder="oldteammember@domain.tld">
                                <button type="submit" class="uk-button uk-button-large button" formmethod="post">Remove user</button>
                            </div>
                            <div class="uk-form-row">
                                <button type="button" class="uk-button uk-button-large button" id="make-card-format" >Make Card Format</button>
                            </div>
                            <div class="uk-form-row">
                                <label class="uk-form-label" for="">Add Column:</label>
                                <input type="text" placeholder="column name">
                                <input type="number" placeholder="Column order (small is left side of screen)" min="0">
                                <button type="submit" class="uk-button uk-button-large button" formmethod="post">Add Column</button>
                            </div>
                        </fieldset>
                    </form></li>
                </ul>

            </div>

            <div class="footer-container">
                <footer class="wrapper">
                    <h3></h3>
                </footer>
            </div>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.0.min.js"><\/script>')</script>

        <script src="js/main.js"> 
        </script>
    </body>
</html>
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
        <link rel="stylesheet" href="uikit-2.10.0/css/uikit.min.css" />
        <link rel="stylesheet" href="styles/custom.css">
        <!--links to js-->
        <script src="js/custom.js" type="text/javascript"></script>
        <script src="js/appjs.js" type="text/javascript"></script>
        <script src="uikit-2.10.0/js/uikit.min.js" type="text/javascript"></script>
        <script>
            var logstat = localStorage.getItem("loggedin");
            if (logstat != null) {
                var user = localStorage.getItem("currentuser");
                var userobj = JSON.parse(user);
                var name = userobj["username"];
                var colorcode = userobj["columncolor"];
                var isadmin = userobj["isAdmin"];
                if (isadmin == 1){
                    var admin = true;
                } else {
                    var admin = false;
                }
            } else {
                window.location.href = "./login.html";
            }
        </script>
    </head>
    <body>
        <nav class="uk-navbar" id = "navyo">
            <a href = "app.php"><img src = "styles/pics/C-Quip_header.png"></a>
            <div class="uk-navbar-flip">
                <ul class="uk-navbar-nav">
                    <li><a onclick="ajxAddCard();"><i class="uk-icon-plus"></i>Add Card</a></li>

<!--
                    dropdown, yo
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
-->





                    <li class="uk-parent" data-uk-dropdown><a id="username" href><i class="uk-icon-chevron-down"></i>Username</a>
                        <div class="uk-dropdown uk-dropdown-navbar">
                            <ul class = "uk-nav uk-nav-navbar">
                                <li><a href="#settingsModal" data-uk-modal>Settings</a></li>
                                    <div id="settingsModal" class="uk-modal">
                                    <div class="settings uk-modal-dialog">
                                        <a class="uk-modal-close uk-close"></a>
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
                                                        <select>
                                                            <option><div><a href id="color1"></a></div></option>
                                                            <option><div><a href id="color2"></a></div></option>
                                                        </select>
                                                        <div id="colorBox"></div>
                                                        <!--
                                                        <div class="uk-button-dropdown" data-uk-dropdown>

                                                            <button class="uk-button">...</button>

                                                            <!-- This is the dropdown -->
                                                            <!--
                                                            <div class="uk-dropdown uk-dropdown-small">
                                                                <ul class="uk-nav uk-nav-dropdown">
                                                                    <li><a href id="color1"></a></li>
                                                                    <li><a href id="color2"></a></li>
                                                                </ul>
                                                            </div>-->
                                                        <!--</div>-->
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
                                                        <button type="submit" class="uk-button button" formmethod="post" >Add user</button>
                                                    </div>
                                                    <div class="uk-form-row">
                                                        <label class="uk-form-label" for="">Delete User:</label>
                                                        <input type="email" placeholder="oldteammember@domain.tld">
                                                        <button type="submit" class="uk-button button" formmethod="post">Remove user</button>
                                                    </div>
                                                    <div class="uk-form-row">
                                                        <button type="button" class="uk-button button" id="make-card-format" >Make Card Format</button>
                                                    </div>
                                                    <div class="uk-form-row">
                                                        <label class="uk-form-label" for="">Add Column:</label>
                                                        <input type="text" placeholder="column name">
                                                        <input type="number" placeholder="Column order (small is left side of screen)" min="0">
                                                        <button type="submit" class="uk-button button" formmethod="post">Add Column</button>
                                                    </div>
                                                </fieldset>
                                            </form></li>
                                        </ul>

                                    </div>
                                </div>
                            <!--<li><a href="#">Blah</a></li>-->
                                <li><a href="#" onclick="logout();">Log Out</a></li>
                            </ul>
                        </div>  
                    </li>  
                </ul>
            </div>
        </nav>

    <script type="text/javascript">
        var unelem = document.getElementById("username");
        unelem.innerHTML = name;
        
        function logout(){
            localStorage.removeItem("currentuser");
            localStorage.removeItem("loggedin");
            window.location.href = "./login.html";
        }
    </script>

    </body>
</html>


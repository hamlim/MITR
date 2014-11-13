<?php
	//started of with some html5boilerplate from html5boilerplate.com
	include "header.html";
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
        <script src="uikit-2.10.0/js/uikit.min.js" type="text/javascript"></script>
    </head>
    <body>
    
        <!--start columns -->
        <ul id = "columnslist">
            <!--
            <li class = "column" id = "col1">
                <h2 id="coltitle1">Heading</h2>
                <ul class = "cardlist connected list">
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">1<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">2<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">3<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">4<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                </ul>
            </li>
            <!--new column
            <li class = "column" id = "col2">
                <h2 id="coltitle2">Heading</h2>
                <ul class = "cardlist connected list">
                   <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">5<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>                        
                       </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">6<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                </ul>
            </li>
            <!--new column
            <li class = "column" id = "col3">
                <h2 id="coltitle3">Heading</h2>
                <ul class = "cardlist connected list">
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">7<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">8<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">9<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                </ul>
            </li>
            <!--new column
            <li class = "column" id = "col4">
                <h2 id="coltitle4">Heading</h2>
                <ul class = "cardlist connected list">
                   <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">10<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">11<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">12<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">13<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                </ul>
            </li>
            <!--new column
            <li class = "column" id = "col5">
                <h2 id="coltitle5">Heading</h2>
                <ul class = "cardlist connected list">
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">14<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">15<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                    <li class = "card">
                        <div class = "cardheader">
                            <p class = "cardpriority">16<span class = "cardtitle">Title<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
                        </div>
                    </li>
                </ul>
            </li>
            -->
            <?php include "editcardmodal.html"; ?>
        </ul>
        <script type="text/javascript" src="js/makecols.js"></script>
        <script src="js/custom.js" type="text/javascript"></script>
        <script>
            //colorcode is the name of the background colors
            console.log(colors);
            console.log(colorcode);
            for(i=0; i<colors.length; i++){
                if(colors[i].name == colorcode){
                    var start = colors[i].first;
                    var end = colors[i].last;
                }
            }
            if(start == undefined){
                var end = "#CFCFCF";
                var start = "#262626";
            }
            //columndata = JSON of columns
            if (columndata != undefined){
                var count = 0;
                for( i=0; i<columndata.length; i++){
                    count = count + 1;
                }
            }
            if(count == undefined){
                var count = 5;
            }
            columns(start, end, count);
        </script>
        <script src="js/main.js"></script>
    </body>
</html>

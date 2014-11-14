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
            //popupmodal(cardID)
            function popupmodal(cardID){
                for(i=0; i<carddata.length; i++){
                    if(cardID == carddata[i]["info"].cardID){
                        //now we construct the card content
                        var zoomcard = carddata[i];
                        var cardinfo = "<div><ul>";
                        //Card name
                        //priority
                        //card color code
                        //stf fields
                        //ltf fields
                        //date fields
                        var cna = "<li id='card-name'>Card name: <code>"+ zoomcard["info"].cardname + "</code></li>";
                        var cpr = "<li id='card-priority'>Card priority: <code>"+ zoomcard["info"].cardpriority + "</code></li>";
                        var cco = "<li id='card-colorcode'>Card color code: <code>" + zoomcard["info"].cardcolorcode + "</code></li>";
                        var stf = "<li id='card-stf-fields'><ul>";
                        for(j=0; j<zoomcard["stf-fields"].length; j++){
                            stf += "<li id='card-stf-field'>" + zoomcard["stf-fields"][j].fieldname + ": <code>"+zoomcard["stf-fields"][j].fielddata + "</code></li>";
                        }
                        stf += "</ul></li>";
                        var ltf = "<li id='card-ltf-fields'><ul>";
                        for(k=0; k<zoomcard["ltf-fields"].length; k++){
                            ltf += "<li id='card-ltf-field'>"+zoomcard["ltf-fields"][k].fieldname + ": <code>"+zoomcard["ltf-fields"][k].fielddata+"</code></li>";
                        }
                        ltf += "</ul></li>";
                        var dat = "<li id='card-date-fields'><ul>";
                        for(m=0; m<zoomcard["date-fields"].length; m++){
                            var unix_timestamp = zoomcard["date-fields"][m].fielddata;
                            var date = new Date(unix_timestamp*1000);
                            // hours part from the timestamp
                            var hours = date.getHours();
                            // minutes part from the timestamp
                            var minutes = "0" + date.getMinutes();
                            // seconds part from the timestamp
                            var seconds = "0" + date.getSeconds();

                            // will display time in 10:30:23 format
                            var datet = hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
                            dat += "<li id='card-date-field'>"+zoomcard["date-fields"][m].fieldname + ": <code>"+datet+"</code></li>";
                        }
                        dat += "</ul></li>";
                        cardinfo += cna+cpr+cco+stf+ltf+dat+"</ul></div>";
                        var zccontent = "<div class='zoom-card'>";
                        zccontent += "<ul class='uk-tab'><li>Card Information</li></ul>";
                        zccontent += "<ul id='card-tabs'>";
                        zccontent += "<li id='cardinfo'>"+cardinfo+"</li></ul>";
                        
                        
                        //now we launch the card viewer itself
                        vex.open({
                            content: zccontent,
                            afterOpen: function($vexContent) {
//                                return $vexContent.append($el);
                            },
                            afterClose: function() {
                                return console.log('Card Closed');
                            }
                        });
                    }
                }
            }
            function popupaction(cardID){
               for(i=0; i<carddata.length; i++){
                    if(cardID == carddata[i]["info"].cardID){
                        //now we construct the card content
                        var zoomcard = carddata[i];
                        var cardactivities = "<div><ul>";
                        //activities
                        for(l=(zoomcard["activities"].length - 1); l>=0; l--){
                            var unix_timestamp = zoomcard["activities"][l].timestamp;
                            var date = new Date(unix_timestamp*1000);
                            // hours part from the timestamp
                            var hours = date.getHours();
                            // minutes part from the timestamp
                            var minutes = "0" + date.getMinutes();
                            // seconds part from the timestamp
                            var seconds = "0" + date.getSeconds();

                            // will display time in 10:30:23 format
                            var datet = hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
                            cardactivities += "<li id='card-activity'>"+zoomcard["activities"][l].username+" "+ zoomcard["activities"][l].actiontype;
                            if(!(zoomcard["activities"][l].actiontype == "Edited this Card") && !(zoomcard["activities"][l].actiontype == "Made this Card")){
                                cardactivities += " with: <code>"+zoomcard["activities"][l].newdata+"</code> at "+datet+"</li>";
                            }
                        }
                        cardactivities += "</ul></div>";
                        
                        var actioncontent = "<div class='zoom-card'>";
                        actioncontent += "<ul class='uk-tab'><li>Card Activities</li></ul>";
                        actioncontent += "<ul id='card-tabs'>";
                        actioncontent += "<li id='cardactivities'>"+cardactivities+"</li></ul>";
                        
                        //now we launch the card viewer itself
                        vex.open({
                            content: actioncontent,
                            afterOpen: function($vexContent) {
//                                return $vexContent.append($el);
                            },
                            afterClose: function() {
                                return console.log('Card Closed');
                            }
                        });
                    }
                } 
            }
        </script>
        <script src="js/main.js"></script>
    </body>
</html>

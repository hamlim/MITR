/*
makecols.js
Functions/uses: Render columns and cards on the page
Only to be run on page load/reload

*/

//columndata = JSON of columns

//first sort the columns by their order
var colu = columndata.sort(function(a,b){return (a.columnorder - b.columnorder);});
//var car = carddata.sort(function(a, b){return (a["info"].cardpriority - b["info"].cardpriority);});
//console.log for testing
//make an array of column names
var columnnames = [];
for(i=0; i<columndata.length; i++){
    columnnames.push(columndata[i]["columnname"]);
}
//testing
//grab the column body element (holds all columns in it)
var colbody = document.getElementById("columnslist");

//parlor trick code, not actually meant to work
//var h2s = colbody.getElementsByTagName("h2");
//
//for(i=0; i<columnnames.length; i++){
//    h2s[i].innerHTML = columnnames[i];
//}
//end parlor trick code

//this is the format of each column in the colbody element
//<!--new column-->
//            <li class = "column" id = "COLUMNORDER">
//                <h2>Heading</h2>
//                <ul class="cardlist connected list">
//                   <li class="card">
//                        <div class="cardheader">
//                            <p class="cardpriority">PRIORITY<span class="cardtitle">CARDNAME<a href="#editCardModal" data-uk-modal><i class="uk-icon-pencil-square-o"></i></a></span></p>
//                        </div>
//                    </li>
//                    <li class="card">
//                        <div class="cardheader">
//                            <p class="cardpriority">PRIORITY<span class="cardtitle">CARDNAME<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
//                        </div>
//                    </li>
//                    <li class="card">
//                        <div class="cardheader">
//                            <p class = "cardpriority">PRIORITY<span class = "cardtitle">CARDNAME<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
//                        </div>
//                    </li>
//                    <li class = "card">
//                        <div class = "cardheader">
//                            <p class = "cardpriority">PRIORITY<span class = "cardtitle">CARDNAME<a href ="#editCardModal" data-uk-modal><i class = "uk-icon-pencil-square-o"></i></a></span></p>
//                        </div>
//                    </li>
//                </ul>
//            </li>

//now we make the html content from the column lists
//we also need the cards
//colu is the array of order-sorted columns
//
console.log(carddata);
if(carddata == undefined || carddata == null){
    var carddata = {};
}
//console.log(carddata);

var alldata = [];
for(i=0; i<colu.length; i++){ //iterate through columns
    var cards = [];
    for(j=0; j<carddata.length; j++){ //iterate through cards
        if(carddata[j]["info"]["columnID"] == colu[i]["columnID"]){
//            console.log(carddata[j]);
            //the card belongs in the column
            //we need to format the card properly
            var id = carddata[j]["info"]["cardID"];
            var na = carddata[j]["info"].cardname;
            var pri = carddata[j]["info"]["cardpriority"];
            var color = carddata[j]["info"]["cardcolorcode"];
            //iterate though ltf fields, stf fields, date fields and add to html
            carddata[j]["stf-fields"].length > 0
            var field = carddata[j]["stf-fields"][0];
            //field is the first short text field
            var fieldname = field["fieldname"];
            var fielddata = field["fielddata"];
            var card = {
                id: id,
                name: na,
                priority: pri,
                color: color,
                pfn: fieldname,
                pfd: fielddata
            };
            var darkblue = {
                name: "Dark blue",
                hex: "#2962ff", // blue accent-4
                materialname: "blue accent-4"
            };
            var green = {
                name: "Green",
                hex: "#00c853", // green accent-4
                materialname: "green accent-4"
            };
            var grey = {
                name: "Grey",
                hex: "#607d8b", // blue-grey
                materialname: "blue-grey"
            };
            var lightblue = {
                name: "Light blue",
                hex: "#0091ea", // light-blue accent-4
                materialname: "light-blue accent-4"
            };
            var pink = {
                name: "Pink",
                hex: "#c51162", // pink accent-4
                materialname: "pink accent-4"
            };
            var purple = {
                name: "Purple",
                hex: "#aa00ff", // purple accent-4
                materialname: "purple accent-4"
            };
            var red = {
                name: "Red",
                hex: "#d50000", // red accent-4
                materialname: "red accent-4"
            };
            var yellow = {
                name: "Yellow",
                hex: "#ffd600", // yellow accent-4
                materialname: "yellow accent-4"
            };
            //activity color
            var activity = {
                name: "Action",
                hex: "#cddc39", // lime in material colors
                materialname: "lime"
            }
            var cccs = [darkblue, green, grey, lightblue, pink, purple, red, yellow];
//            console.log(cccs);
            for(x=0; x<cccs.length; x++){
                if(cccs[x].name == color){
//                    console.log(cccs[x]);
                    var cardtext = "<li class='' data-cbreeze-cardid='"+id+"'><div class='row'><div class='col s12'><div class=''><div class='card "+cccs[x].materialname+"'><div class='card-content white-text'><div class='center col s12'><span class='card-title'><div class='col s2'>"+pri+"</div><div class='col s8'>"+na+"</div><div class='col s2'><a href='#' class='btn-flat' onclick='popupeditcard("+id+")'><i class='mdi-editor-border-color'></i></a></div></span></div><p>[WHAT GOES HERE?]</p></div><div class='card-action center'><a href='#card"+id+"' onclick='popupmodal("+id+");'>Card Information</a><a href='#actions' data-cbreeze-card-ID-"+id+" onclick='popupaction("+id+");'>Activites</a></div></div></div></div></div></li>";
                    //var cardtext = "<li class='card' data-cbreeze-cardid='"+id+"'><div class='cardheader'><a href='#editCardModal' id='edit-card-icon' onclick='popupeditcard("+id+")' ><i class='uk-icon-pencil-square-o'></i></a><p class='cardpriority' style='background-color:" + cccs[x].hex + " '>"+pri+"<span class='cardtitle'>"+na+"</span></p></div><a href='#card"+id+"' onclick='popupmodal("+id+");'><div class='cardprvcontent'></div>Card Information</a><br/><a href='#actions' data-cbreeze-card-ID-"+id+" onclick='popupaction("+id+");'>Activites</a></li>";
                }
            }
//            console.log(cardtext);
            cards.push(cardtext);
        }
    }
    var columnstart = "<li class='column' id=col"+colu[i].columnorder+" data-cbreeze-columnID='"+colu[i].columnID+"'><h2>"+colu[i].columnname +"</h2><ul class='cardlist connected list'>";
    var string ="";
    for(o=0; o<cards.length; o++){
        string += cards[o];
    }
    var column = columnstart + string + "</ul></li>"
    alldata.push(column);
}

//var content;
//for(i=0; i<alldata.length; i++){
//    content += alldata[i];
//}
//colbody.innerHTML += content;
colbody.innerHTML += alldata.join();

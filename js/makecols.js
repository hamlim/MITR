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
console.log(carddata);

var alldata = [];
for(i=0; i<colu.length; i++){ //iterate through columns
    var cards = [];
    for(j=0; j<carddata.length; j++){ //iterate through cards
        if(carddata[j]["info"]["columnID"] == colu[i]["columnID"]){
            console.log(carddata[j]);
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
            console.log(color);
            var darkblue = {
                name: "Darkblue",
                hex: "#4a5e77"
            };
            var green = {
                name: "Green",
                hex: "#bae756"
            };
            var grey = {
                name: "Grey",
                hex: "#5f5f5f"
            };
            var lightblue = {
                name: "Lightblue",
                hex: "#4ecdc4"
            };
            var pink = {
                name: "Pink",
                hex: "#ff6b6b"
            };
            var purple = {
                name: "Purple",
                hex: "#9970a8"
            };
            var red = {
                name: "Red",
                hex: "#c54d57"
            };
            var yellow = {
                name: "Yellow",
                hex: "#f5ef65"
            };
            var cccs = [darkblue, green, grey, lightblue, pink, purple, red, yellow];
            console.log(cccs);
            for(x=0; x<cccs.length; x++){
                if(cccs[x].name == color){
                    console.log(cccs[x]);
                    var cardtext = "<li class='card' data-cbreeze-cardid='"+id+"'><div class='cardheader'><p class='cardpriority' style='background-color:" + cccs[x].hex + " '>"+pri+"<span class='cardtitle'>"+na+"<a href='#editCardModal' id='edit-card-icon' onclick='popupeditcard("+id+")' ><i class='uk-icon-pencil-square-o'></i></a></span></p></div><a href='#card"+id+"' onclick='popupmodal("+id+");'><div class='cardprvcontent'>Card Information</a><br/><a href='#actions' data-cbreeze-card-ID-"+id+" onclick='popupaction("+id+");'>Activites</a></li>";
                }
            }
            console.log(cardtext);
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

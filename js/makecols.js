//columndata = JSON of columns

//first sort the columns by their order
var colu = columndata.sort(function(a,b){return (a.columnorder - b.columnorder);});
//console.log for testing
console.log(colu);
//make an array of column names
var columnnames = [];
for(i=0; i<columndata.length; i++){
    columnnames.push(columndata[i]["columnname"]);
}
//testing
console.log(columnnames);
//grab the column body element (holds all columns in it)
var colbody = document.getElementById("columnslist");

//parlor trick code, not actually meant to work
var h2s = colbody.getElementsByTagName("h2");

for(i=0; i<columnnames.length; i++){
    h2s[i].innerHTML = columnnames[i];
}
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
var alldata = [];
for(i=0; i<colu.length; i++){ //iterate through columns
    var cards = [];
    for(j=0; j<carddata.length; j++){ //iterate through cards
        if(carddata[j]["info"]["columnID"] == colu[i]["columnID"]){
            //the card belongs in the column
            //we need to format the card properly
            var na = carddata[j]["info"]["cardname"];
            var pri = carddata[j]["info"]["cardpriority"];
            var colorcode = carddata[j]["info"]["cardcolorcode"];
            //iterate though ltf fields, stf fields, date fields and add to html
            carddata[j]["stf-fields"].length > 0
            var field = carddata[j]["stf-fields"][0];
            //field is the first short text field
            var fieldname = field["fieldname"];
            var fielddata = field["fielddata"];
            var card = {
                name: na,
                priority: pri,
                color: colorcode,
                pfn: fieldname,
                pfd: fielddata
            }
            var cardtext = "<li class='card'><div class='cardheader'><p class='cardpriority'>"+pri+"<span class='cardtitle'>"+na;
            cardtext += "<a href='#editCardModal' data-uk-modal><i class='uk-icon-pencil-square-o'></i></a></span></p></div>";
            cardtext += "<div class='cardprvcontent'>"+fieldname+" : " + fielddata + "</li>";
            cards.push(cardtext);
            //following code for getting all the contents of the card
//            for(k=0; k<carddata[j]["ltf-fields"].length; k++){
//                
//            }
//            for(l=0; l<carddata[j]["stf-fields"].length; l++){
//                
//            }
//            for(m=0; m<carddata[j]["date-fields"].length; m++){
//                
//            }
        }
    }
    var columnstart = "<li class='column' id=col"+colu[i].columnorder+"><h2>"+colu[i].columnname +"</h2><ul class='cardlist connected list'>";
    var string ="";
    console.log("column " + i + cards);
    for(o=0; o<cards.length; o++){
        string += cards[o];
    }
    var column = columnstart + string + "</ul></li>"
    alldata.push(column);
}
console.log(alldata);
colbody.innerHTML += alldata.join();

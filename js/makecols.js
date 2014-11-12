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


//now we make the html content from the column lists
//we also need the cards
//colu is the array of order-sorted columns
//
for(i=0; i<colu.length; i++){ //iterate through columns
    for(j=0; j<carddata.length; j++){ //iterate through cards
        if(carddata[j]["info"]["columnID"] == colu[i]["columnID"]){
            //the card belongs in the column
            //we need to format the card properly
            var name = carddata[j]["info"]["name"];
            var priority = carddata[j]["info"]["priority"];
            var color = carddata[j]["info"]["colorcode"];
            //iterate though ltf fields, stf fields, date fields and add to html
            
        }
    }
}

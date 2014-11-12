//columndata = JSON of columns

var columnnames = [];
for(i=0; i<columndata.length; i++){
    columnnames.push(columndata[i]["columnname"]);
}
console.log(columnnames);

var colbody = document.getElementById("columnslist");

var h2s = colbody.getElementsByTagName("h2");

for(i=0; i<columnnames.length; i++){
    h2s[i].innerHTML = columnnames[i];
}
var cols = document.getElementById("")


//now we make the html content from the column lists
//we also need the cards
//
//for(i=0; i<columndata.length; i++){
//    for(j=0; j<carddata.length; j++){
//        if(carddata[j]["info"]["columnID"] == 
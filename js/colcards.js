//first we need to get all the columns
var colrequest = new XMLHttpRequest;
var columns;
colrequest.onreadystatechange = function() {
    if (colrequest.readyState == 4){
        var res = colrequest.responseText;
        checkcontent(columns, res);
    }
}
var colfile = "./data/columns.json";
colrequest.open("GET", colfile, false);
colrequest.send();

function checkcontent(columns, data){
    localStorage.setItem("columns", data);
    var column = JSON.parse(data);
    columns = column;
};

var cardrequest = new XMLHttpRequest;
var cards;
cardrequest.onreadystatechange = function(){
    if(cardrequest.readyState == 4){
        var res = cardrequest.responseText;
        checkcardcontent(cards, res);
    }
}
var cardfile = "./data/cards.json";
cardrequest.open("GET", cardfile, false);
cardrequest.send();

function checkcardcontent(cards, data){
    localStorage.setItem("cards", data);
    var card = JSON.parse(data);
    cards = card;
};

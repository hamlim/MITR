//first we need to get all the columns
var colrequest = new XMLHttpRequest;
var columns;
colrequest.onreadystatechange = function() {
    if (colrequest.readyState == 4){
        var res = colrequest.responseText;
        checkcontent(columns, res);
    }
}
colrequest.open("GET", "./data/columns.txt", false);
colrequest.send();

function checkcontent(columns, data){
    console.log("Column Data: ");
    console.log(data);
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
cardrequest.open("GET", "./data/cards.txt", false);
cardrequest.send();

function checkcardcontent(cards, data){
    console.log("Card data: " + data);
    localStorage.setItem("cards", data);
    var card = JSON.parse(data);
    cards = card;
};

//first we need to get all the columns
var columnsa;
var cards;
function loaddata(){
    var colrequest = new XMLHttpRequest;
    colrequest.onreadystatechange = function() {
        if (colrequest.readyState == 4){
            var res = colrequest.responseText;
            checkcontent(columnsa, res);
        }
    }
    var colfile = "./data/columns.json";
    colrequest.open("GET", colfile, false);
    colrequest.send();

    function checkcontent(columnsa, data){
        localStorage.setItem("columns", data);
        var column = JSON.parse(data);
        console.log(column);
        columnsa = column;
    }

    var cardrequest = new XMLHttpRequest;
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
        console.log(card);
        cards = card;
    }
}
loaddata();
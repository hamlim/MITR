//The first thing to do is to get from the server the list of cards
//initialize the card request
var cardrequest = new XMLHttpRequest;
//handle the request for the card data
cardrequest.onreadystatechange = function() {
    if (cardrequest.readyState == 4) {
        console.log(cardrequest.responseText);
        var obj = JSON.parse(cardrequest.responseText);
        //now we have all the cards in the system
        
        
    }
}
//make the request
cardrequest.open("GET", "./cards.txt", true);
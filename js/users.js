//The first thing to do is to get from the server the list of cards



//initialize the card request
var userrequest = new XMLHttpRequest;
//handle the request for the card data
userrequest.onreadystatechange = function() {
    if (userrequest.readyState == 4) {
        console.log(userrequest.responseText);
        //now we have all the cards in the system
        /*
        obj = {
            {
                "name": "matt hamlin",
                "ID" : 1,
                "email" : "hamlim@outlook.com",
                "columncolor" : "red",
                "Admin" : 0
            },
            { ... }, { ... } ...
            };
        
        */
        checkuser(userrequest.responseText);
        
    }
}
//make the request
userrequest.open("GET", "./users.txt", false);
var currentuser;
//function to handle the data and check for login.php
function checkuser(data, useremail, currentuser){
    //data is the requestText string
    var users = JSON.parse(data);
    for(i=0; i<users.length; i++){
        if( users[i]["email"] == useremail){
            
        }
    }
}
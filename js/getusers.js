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
        var res = userrequest.responseText;
        checkuser(res);
        
    }
}
//make the request
userrequest.open("GET", "./users.txt", false);

//function to handle the data and check for login.php
var currentuser = function checkuser(data, useremail, password){
    //data is the requestText string
    var users = JSON.parse(data);
    for(i=0; i<users.length; i++){
        if( users[i]["email"] == useremail && users[i]["password"] == password){
            return users[i];
        } else {
            return "ERROR";
        }
    }
};

//currentuser is either the array representing the user
//    or  currentuser is a string representing the error
if ( currentuser != "ERROR" ){
    //ok the user is logged in
    var userstring = JSON.stringify(currentuser);
    localStorage.setItem("currentuser", userstring);
    localStorage.setItem("loggedin", "true");
    window.location.href = "./app.php";
} else {
    alert("User email not in the database!");
    window.location.href = "./login.php";
}

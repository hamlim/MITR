// script to be called by login.html


//The first thing to do is to get from the server the list of cards

submitbtn.click(function() {
    var currentuser;
    //initialize the card request
    var userrequest = new XMLHttpRequest;
    //handle the request for the card data
    userrequest.onreadystatechange = function() {
        if (userrequest.readyState == 4) {
            //now we have all the users in the system
            //refer to formatting.js for formats of JSON docs
            var res = userrequest.responseText;
            checkuser(currentuser, res, useremail, password);

        }
    }
    //make the request
    userrequest.open("GET", "./data/users.json", false);

    //function to handle the data and check for login.php
    function checkuser(currentuser, data, email, pass){
        //data is the requestText string
        var users = JSON.parse(data);
        for(i=0; i<users.length; i++){
            if( users[i]["email"] == email && users[i]["password"] == pass){
                currentuser = users[i];
            } else {
                currentuser = "ERROR";
            }
        }
    };
    //------------------------------------------
    //COLUMNS
    //------------------------------------------
    //first we need to get all the columns
    var colrequest = new XMLHttpRequest;
    var columns;
    colrequest.onreadystatechange = function() {
        if (colrequest.readyState == 4){
            var resp = colrequest.responseText;
            checkcontent(columns, resp);
        }
    }
    colrequest.open("GET", "./data/columns.json", false);

    function checkcontent(columns, data){
        localStorage.setItem("columns", colstring);
        var column = JSON.parse(data);
        columns = column;
    };
    
    //------------------------------------------

    //currentuser is either the array representing the user
    //    or  currentuser is a string representing the error
    if ( currentuser != "ERROR" ){
        //ok the user is logged in
        var userstring = JSON.stringify(currentuser);
        localStorage.setItem("currentuser", userstring);
        localStorage.setItem("loggedin", "true");
        window.location.href = "./app.php";
    } else {
        alert("User email or password not correct!");
//        window.location.href = "./login.php";
    }
});
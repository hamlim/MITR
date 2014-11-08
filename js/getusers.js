//The first thing to do is to get from the server the list of cards

submitbtn.click(function() {
    var currentuser;
    alert("submit clicked");
    alert(password);
    alert(useremail);
    //initialize the card request
    var userrequest = new XMLHttpRequest;
    //handle the request for the card data
    userrequest.onreadystatechange = function() {
        if (userrequest.readyState == 4) {
            console.log(userrequest.responseText);
            alert("hi");
            //now we have all the users in the system
            //refer to formatting.js for formats of JSON docs
            var res = userrequest.responseText;
            checkuser(currentuser, res, useremail, password);

        }
    }
    //make the request
    userrequest.open("GET", "./data/users.txt", false);

    //function to handle the data and check for login.php
    function checkuser(currentuser, data, email, pass){
        //data is the requestText string
        alert(data);
        console.log("Data: ");
        console.log(data);
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
            alert(colrequest.responseText);
            var resp = colrequest.responseText;
            alert("Res: " + resp);
            checkcontent(columns, resp);
        }
    }
    colrequest.open("GET", "./data/columns.txt", false);

    function checkcontent(columns, data){
        console.log("data: ");
        console.log(data);
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
        alert(userstring);
        localStorage.setItem("currentuser", userstring);
        alert("yes");
        localStorage.setItem("loggedin", "true");
        window.location.href = "./app.php";
    } else {
        alert("User email not in the database!");
//        window.location.href = "./login.php";
    }
});
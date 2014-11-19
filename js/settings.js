//a simple script file to handle all settings options
//----------------------------------
// General Settings
//----------------------------------

$("#general-settings-btn").click(function(){
    //the general settings button is clicked
    var usernameelem = document.getElementById('username');
    var oldpasselem = document.getElementById('oldpass');
    var newpasselem = document.getElementById('newpass');
    var newpassconfelem = document.getElementById('newpassconf');
    var username = usernameelem.value;
    var oldpass = oldpasselem.value;
    var newpass = newpasselem.value;
    var newpassconf = newpassconfelem.value;
    //userobj is the current user as JSON
    if(username != null || username != undefined){
        //username set/updated
        userobj["username"] = username;
    }
    if((oldpass != null || oldpass != undefined) && oldpass.length != 0){
        if(newpass != null || newpass != undefined){
            if(newpassconf != null || newpassconf != undefined){
                if(userobj["password"] == oldpass){
                    if(newpass.length == 0 && newpassconf.length == 0){
                        alert("No password entered!");
                    } else if(newpass == newpassconf && oldpass == userobj["password"]){
                        userobj["password"] = newpass;
                    } else {
                        alert("New passwords do not match!");
                    }
                } 
                else {
                    alert("Please enter the same password in Confirm Password field!");
                }
            }
        }
    } else {
        userobj.password = userobj.password;
    }
    //color change
    for(i=0; i<colors.length; i++){
        if($("#colorSelect :selected").text() == colors[i].name){
            //new color is selected
            //columncolor
            userobj["columncolor"] = colors[i].name;
            columns(colors[i].first, colors[i].last, count);
        }
    }
    //now we have an updated userobj, first we want to update the currentuser in localStorage
    localStorage.removeItem("currentuser");
    userobjstring = JSON.stringify(userobj);
    localStorage.setItem("currentuser", userobjstring);
    user = userobj;
    //now we want to send the updated user obj string to the db
    //first we need to update all the users
    var getalluserstoup = new XMLHttpRequest;
    var alus;
    getalluserstoup.onreadystatechange = function() {
        if (getalluserstoup.readyState == 4){
            var res = getalluserstoup.responseText;
            alus = updateusers(res);
        }
    }
    getalluserstoup.open("GET", "./data/users.json", false);
    getalluserstoup.send();
    function updateusers(data){
        var resjson = JSON.parse(data);
        var allusers;
        for(k=0; k<resjson.length; k++){
            if(resjson[k].userID == userobj.userID){
                resjson[k] = userobj; //overwrite old data with new
            }
        }
        allusers = resjson; //set updated users to alus var
        return allusers;
    }
    var setuserup = new XMLHttpRequest; //make a new request to update the content of users.txt
    setuserup.open("POST", "./generalsettings.php", true);
    setuserup.setRequestHeader("Content-Type", "application/json");
    var aluserstring = JSON.stringify(alus); //turn the JSON into a string
    setuserup.send(aluserstring);
});




//----------------------------------
//  Admin Settings
//----------------------------------
//add user functionality
$("#admin-add-user").click(function(){
    var useremailelem = document.getElementById("admin-add-email");
    var useradminstatuselem = document.getElementById("admin-add-admin");
    var useremail = useremailelem.value;
    var useradminstatus = useradminstatuselem.checked;
    //create a user object then add it to the users
    var newuser = {};
    newuser["useremail"] = useremail;
    newuser["password"] = "seamonkey";
    if(useradminstatus){
        newuser["isAdmin"] = 1;
    } else {
        newuser["isAdmin"] = 0;
    }
    //get all users
    var gau = new XMLHttpRequest;
    var gau_data;
    gau.onreadystatechange = function() {
        if (gau.readyState == 4){
            var res = gau.responseText;
            gau_data = gauusers(res);
        }
    }
    gau.open("GET", "./data/users.json", false);
    gau.send();
    function gauusers(data){
        var resdata = JSON.parse(data);
        var allusers;
        allusers = resjson; //set updated users to alus var
        return allusers;
    }
    //gau_data = all users
    gau_data.push(newuser);
    //now we send gau_data to the server -> asu.php
    var upload = new XMLHttpRequest; //make a new request to update the content of users.txt
    upload.open("POST", "./asu.php", true);
    upload.setRequestHeader("Content-Type", "application/json");
    var gau_string = JSON.stringify(gau_data); //turn the JSON into a string
    upload.send(gau_string);
});
//remove user funtionality
$("#admin-remove-user").click(function() {
    var ruseremeilelem = document.getElementById("admin-remove-email");
    var ruseremeailconfelem = document.getElementById("admin-remove-email-conf");
    var ruseremail = ruseremeilelem.value;
    var ruseremailconf = ruseremeailconfelem.value;
    //make sure the two emails are the same value
    
});
//add column functionality
$("#admin-add-column").click(function() {
    var columnnameelem = document.getElementById("admin-add-column-name");
//    var columnorderelem = document.getElementById("admin-add-column-order");
    var columnname = columnnameelem.value;
//    var columnorder = columnorderelem.value;
    //add column to list of columns based on the order
    //note keeping column order as an extensible feature
    
});


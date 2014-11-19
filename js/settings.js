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
    if(localStorage["currentuser"] != null || localStorage["currentuser"] != undefined){
        console.log("currentuser not properly deleted");
    }
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
        console.log(user);
        var allusers;
        for(k=0; k<resjson.length; k++){
            if(resjson[k].userID == userobj.userID){
                resjson[k] = userobj; //overwrite old data with new
            }
        }
        allusers = resjson; //set updated users to alus var
        return allusers;
    }
    console.log(userobj);
    console.log("ALUS: ");
    console.log(alus);
    var setuserup = new XMLHttpRequest; //make a new request to update the content of users.txt
    setuserup.open("POST", "./generalsettings.php", true);
    setuserup.setRequestHeader("Content-Type", "application/json");
    var aluserstring = JSON.stringify(alus); //turn the JSON into a string
    setuserup.send(aluserstring);
});




//----------------------------------
//  Admin Settings
//----------------------------------
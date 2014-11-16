//a simple script file to handle all settings options
//----------------------------------
// General Settings
//----------------------------------

$("#general-settings-btn").click(function(){
    //the general settings button is clicked
    var username = document.getElementById('username').value;
    var oldpass = document.getElementById('oldpass').value;
    var newpass = document.getElementById('newpass').value;
    var newpassconf = document.getElementById('newpassconf').value;
    //userobj is the current user as JSON
    if(username != null || username != undefined){
        //username set/updated
        userobj["username"] = username;
    }
    if(oldpass != null || oldpass != undefined){
        if(newpass != null || newpass != undefined){
            if(newpassconf != null || newpassconf != undefined){
                if(newpass == newpassconf){
                    userobj["password"] = newpass;
                } else {
                    alert("New passwords do not match!");
                }
            } else {
                alert("Please enter the same password in Confirm Password field!");
            }
        }
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
    //now we want to send the updated user obj string to the db
    //first we need to update all the users
    var getalluserstoup = new XMLHttpRequest;
    var alus;
    getalluserstoup.onreadystatechange = function() {
        if (getalluserstoup.readyState == 4){
            var res = getalluserstoup.responseText;
            updateusers(alus, res);
        }
    }
    getalluserstoup.open("GET", "./data/users.txt", false);
    getalluserstoup.send();
    function updateusers(allusers, data){
        var resjson = JSON.parse(data);
        for(k=0; k<resjson.length; k++){
            if(resjson[k].userID == userobj.userID){
                resjson[k] = userobj; //overwrite old data with new
            }
        }
        allusers = resjson; //set updated users to alus var
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
//a simple script file to handle all settings options
//----------------------------------
// General Settings
//----------------------------------

$("#general-settings-btn").click(function(){
    //the general settings button is clicked
    var usernameelem = document.getElementById('username-input');
    var oldpasselem = document.getElementById('oldpass');
    var newpasselem = document.getElementById('newpass');
    var newpassconfelem = document.getElementById('newpassconf');
    var usern = usernameelem.value;
    var oldpass = oldpasselem.value;
    var newpass = newpasselem.value;
    var newpassconf = newpassconfelem.value;
    //userobj is the current user as JSON
    if(usern != "" && usern != undefined){
        //username set/updated
        userobj["username"] = usern;
        var unam = document.getElementById('username');
        unam.innerHTML += usern;
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
    setuserup.open("POST", "./asu.php", true);
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
    newuser["username"] = "";
    newuser["columncolor"] = "Blue";
    if(useradminstatus){
        newuser["isAdmin"] = 1;
    } else {
        newuser["isAdmin"] = 0;
    }
    console.log(newuser);
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
        allusers = resdata; //set updated users to alus var
        return allusers;
    }
    //gau_data = all users
//    console.log(gau_data);
    var previd = gau_data[gau_data.length - 1]["userID"];
    newuser["userID"] = previd + 1;
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
    var ruseremailconfelem = document.getElementById("admin-remove-email-conf");
    var ruseremail = ruseremeilelem.value;
    var ruseremailconf = ruseremailconfelem.value;
    //make sure the two emails are the same value
    if(ruseremail == ruseremailconf){
        //the two emails match
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
            allusers = resdata; //set updated users to alus var
            return allusers;
        }
        var newalldata = [];
        //gau_data is all users
        for(i=0; i<gau_data.length; i++){
            if(gau_data[i]["useremail"] != ruseremail){
                newalldata.push(gau_data[i]);
            }
        }
        //allnewdata does not have the old user
        //now we push this to the server to make the final edit
        //now we send gau_data to the server -> asu.php
        var upload = new XMLHttpRequest; //make a new request to update the content of users.txt
        upload.open("POST", "./asu.php", true);
        upload.setRequestHeader("Content-Type", "application/json");
        var nad_string = JSON.stringify(newalldata); //turn the JSON into a string
        upload.send(nad_string);
    }
});
//add column functionality
$("#admin-add-column").click(function() {
    var columnnameelem = document.getElementById("admin-add-column-name");
    var columnorderelem = document.getElementById("admin-add-column-order");
    var columnname = columnnameelem.value;
    var columnorder = columnorderelem.value;
    //console.log(columnorder);
    //add column to list of columns based on the order
    //note keeping column order as an extensible feature
    //columndata = JSON of columns
    //columnorder is where the column gets added
    //iterate through all columns for which there is a higher order and add 1 to that
    var colid;
    var max = 0;
    //make sure there are columns
    if(columndata == undefined || columndata == null){
        max = 0;
        var columndata = [];
        var colrequest = new XMLHttpRequest;
        var columnsa;
        colrequest.onreadystatechange = function() {
            if (colrequest.readyState == 4){
                var res = colrequest.responseText;
                checkcontent(columnsa, res);
            }
        }
        var colfile = "./data/columns.json";
        colrequest.open("GET", colfile, false);
        colrequest.send();

        function checkcontent(columns, data){
            localStorage.setItem("columns", data);
            var column = JSON.parse(data);
            columnsa = column;
            console.log(columnsa);
        }
        if(columnsa != undefined){
            columndata = columnsa;
        } else {
            columndata = [];
        }
    } 
    for(i = 0; i<columndata.length ; i++){
        console.log(columndata[i]["columnorder"]);
        if(columndata[i]["columnorder"] >= columnorder){
            columndata[i]["columnorder"] = parseInt(columndata[i]["columnorder"]) + 1;        
        }
        if(max<columndata[i]["columnID"]){
            max += 1;
        }
    }
    colid = columndata.length + 1;//max + 1;
//    var colorder;
//    var counter = 0;
//    if(columndata == undefined || columndata == null || columndata.length == 0){
//        counter = 0;
//    } else {
//        for(j=0; j<columndata.length; j++){
//            if(counter<columndata[j]["columnorder"]){
//                counter = columndata[j]["columnorder"];
//            }
//        }
//    }
//    colorder = counter + 1;
    var newcol = {};
    newcol["columnname"] = columnname;
    newcol["columnID"] = colid;
    newcol["columnorder"] = parseInt(columnorder);
    
//    localStorage.removeItem("columns");
//    console.log(columndata);
    columndata.push(newcol);
//    console.log(columndata);
    var colstring = JSON.stringify(columndata);
    localStorage.setItem("columns", colstring);
    //now push new data to the server
    var upl = new XMLHttpRequest;
    upl.open("POST", "./asc.php", true);
    upl.setRequestHeader("Content-Type", "application/json");
    upl.send(colstring);
    //done
    columndata = columnsa;
    alert("Added column: " + columnname);
    columns(start, end, count+1);
    location.reload();
//    location.reload();
});
//remove column functionality
$("#admin-remove-column").click(function() {
    var columnnameelem = document.getElementById("admin-remove-column-name");
//    var columnorderelem = document.getElementById("admin-add-column-order");
    var columnname = columnnameelem.value;
//    var columnorder = columnorderelem.value;
    //add column to list of columns based on the order
    //note keeping column order as an extensible feature
    //columndata = JSON of columns
    var rest = [];
    var colid;
    for(i=0; i<columndata.length; i++){
        if(columndata[i].columnname == columnname){
            colid = columndata[i].columnID;
        }
    }
    
    var archiveID;
    for(v=0; v<columndata.length; v++){
        if(columndata[v]["columnname"] == "Archive"){
            archiveID = columndata[v]["columnID"];
        }
    }
    console.log(archiveID);
    var hascolumns = false;
    for(i=0; i<carddata.length; i++){
        if(carddata[i]["info"].columnID == colid){
            hascolumns = true;
            carddata[i]["info"].columnID = archiveID;
        }
    }
    if(hascolumns){
        var yesno;
        vex.dialog.confirm({
            message: 'This column has some cards, are you sure you want to delete?',
            callback: function(value) {
                yesno = value;
                if(yesno){
                    for(i=0; i<columndata.length; i++){
                        if(columndata[i].columnname != columnname){
                            rest.push(columndata[i]);
                        }
                    }
                    console.log(rest);
                    for(k=0; k<rest.length; k++){
                        if(rest[k].columnID != k+1){
                            rest[k].columnID = k+1;
                        } 
                        if(rest[k].columnorder != k+1){
                            rest[k].columnorder = k+1;
                        }
                    }
                    //rest is what we save
                    localStorage.removeItem("columns");
                    var colstring = JSON.stringify(rest);
                    localStorage.setItem("columns", colstring);
                    //now push new data to the server
                    var upl = new XMLHttpRequest;
                    upl.open("POST", "./asc.php", true);
                    upl.setRequestHeader("Content-Type", "application/json");
                    upl.send(colstring);
                    //done
                    columndata = rest;
                    alert("Removed column: " + columnname);
            //        location.reload();
                }
            }
        });
    } else {
        for(i=0; i<columndata.length; i++){
            if(columndata[i].columnname != columnname){
                rest.push(columndata[i]);
            }
        }
        console.log(rest);
        for(k=0; k<rest.length; k++){
            if(rest[k].columnID != k+1){
                rest[k].columnID = k+1;
            } 
            if(rest[k].columnorder != k+1){
                rest[k].columnorder = k+1;
            }
        }
        //rest is what we save
        localStorage.removeItem("columns");
        var colstring = JSON.stringify(rest);
        localStorage.setItem("columns", colstring);
        //now push new data to the server
        var upl = new XMLHttpRequest;
        upl.open("POST", "./asc.php", true);
        upl.setRequestHeader("Content-Type", "application/json");
        upl.send(colstring);
        //done
        columndata = rest;
        alert("Removed column: " + columnname);
        location.reload();
    }
});


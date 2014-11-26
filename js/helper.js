function addAction(cardid, user, action, extrainfo){
    //cardid is the int itself
    //user is the JSON of the user ie JSON.parse(localStorage.getItem("currentuser"));
    //action is a string that is either: "Moved the card", "Edited the card", "Made the card", 
    //extrainfo is there if we need more data ie Moved card to "columnID" otherwise pass it as an empty string
    /*
    {
            "username": "Matt Hamlin",
            "actiontype": "Made this Card",
            "timestamp": 1414880770,
            "newdata": null,
            "olddata": null,
            "actionID": 1
    },
    */
    console.log("In addAction function...");
    console.log(carddata);
    
    var newact = {};
    newact["username"] = user.username;
    newact["actiontype"] = action;
    newact["olddata"] = null;
    if(action == "Moved the card"){
        var obj = [];
        obj["columnID"] = extrainfo;
        newact["newdata"] = obj;
    } else if(action == "Edited the card"){
        newact["newdata"] = null;
        //FUTURE: see edits
    } else if(action == "Made the card"){
        //made the card
        newact["newdata"] = null; //can't set it equal to the card data because it becomes circular
    } else {
        //commented on the card
        var obj = [];
        obj["comment"] = extrainfo;
        newact["newdata"] = obj;
    }
    newact["parent_actionID"] = null; //will be changed when reply works with comments
    //now we update the cards
    for(n=0; n<carddata.length; n++){
        if(carddata[n]["info"].cardID == cardid){
            //we need to get the actionid and the timestamp
            var tstamp = new Date().getTime();
            var aid=0;
            if(carddata[n]["activities"] == undefined || carddata[n]["activities"] == null){
                aid = 0;
                carddata[n]["activities"] = [];
            } else {
                for(p=0; p<carddata[n]["activities"].length; p++){
                    aid += 1;
                }
            }
            newact["actionID"] = aid+1;
            newact["timestamp"] = tstamp;
            carddata[n]["activities"].push(newact);
        }
    }
    console.log(newact);
    var carddatastring = JSON.stringify(carddata);
    localStorage.removeItem("cards");
    localStorage.setItem("cards", carddatastring);
    
    //now we push the updated stuff to the server
    var uploadactions = new XMLHttpRequest;
    uploadactions.open("POST", "./ascf.php", true);
    uploadactions.setRequestHeader("Content-Type", "application/json");
    uploadactions.send();
    console.log(carddata);
    console.log("Done with Add Action function call.");
}
//colorcode is the name of the background colors
for(i=0; i<colors.length; i++){
    if(colors[i].name == colorcode){
        var start = colors[i].first;
        var end = colors[i].last;
    }
}
if(start == undefined){
    var end = "#CFCFCF";
    var start = "#262626";
}
//columndata = JSON of columns
if (columndata != undefined){
    var count = 0;
    for( i=0; i<columndata.length; i++){
        count = count + 1;
    }
}
if(count == undefined){
    var count = 0;
}
columns(start, end, count);
//popupmodal(cardID)
function popupmodal(cardID){
    for(i=0; i<carddata.length; i++){
        if(cardID == carddata[i]["info"].cardID){
            //now we construct the card content
            var zoomcard = carddata[i];
            var cardinfo = "<div><ul>";
            //Card name
            //priority
            //card color code
            //stf fields
            //ltf fields
            //date fields
            var cna = "<li id='card-name'>Card name: <code>"+ zoomcard["info"].cardname + "</code></li>";
            var cpr = "<li id='card-priority'>Card priority: <code>"+ zoomcard["info"].cardpriority + "</code></li>";
            var cco = "<li id='card-colorcode'>Card color code: <code>" + zoomcard["info"].cardcolorcode + "</code></li>";
            var stf = "<li id='card-stf-fields'><ul>";
            for(j=0; j<zoomcard["stf-fields"].length; j++){
                stf += "<li id='card-stf-field'>" + zoomcard["stf-fields"][j].fieldname + ": <code>"+zoomcard["stf-fields"][j].fielddata + "</code></li>";
            }
            stf += "</ul></li>";
            var ltf = "<li id='card-ltf-fields'><ul>";
            for(k=0; k<zoomcard["ltf-fields"].length; k++){
                ltf += "<li id='card-ltf-field'>"+zoomcard["ltf-fields"][k].fieldname + ": <code>"+zoomcard["ltf-fields"][k].fielddata+"</code></li>";
            }
            ltf += "</ul></li>";
            var dat = "<li id='card-date-fields'><ul>";
            for(m=0; m<zoomcard["date-fields"].length; m++){
                var unix_timestamp = zoomcard["date-fields"][m].fielddata;
                var dateinfo = moment(unix_timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
                dat += "<li id='card-date-field'>"+zoomcard["date-fields"][m].fieldname + ": <code>"+dateinfo+"</code></li>";
            }
            dat += "</ul></li>";
            cardinfo += cna+cpr+cco+stf+ltf+dat+"</ul></div>";
            var zccontent = "<div class='zoom-card'>";
            zccontent += "<ul class='uk-tab'><li>Card Information</li></ul>";
            zccontent += "<ul id='card-tabs'>";
            zccontent += "<li id='cardinfo'>"+cardinfo+"</li></ul>";


            //now we launch the card viewer itself
            vex.open({
                content: zccontent,
                afterOpen: function($vexContent) {
//                                return $vexContent.append($el);
                },
                afterClose: function() {
//                    return console.log('Card Closed');
                }
            });
        }
    }
}
function popupaction(cardID){
   for(i=0; i<carddata.length; i++){
        if(cardID == carddata[i]["info"].cardID){
            //now we construct the card content
            var zoomcard = carddata[i];
            var cardactivities = "<div><ul>";
            //activities
            for(l=(zoomcard["activities"].length - 1); l>=0; l--){
                var unix_timestamp = zoomcard["activities"][l].timestamp;
                var now = moment(unix_timestamp);
                var datet = moment(now).format("dddd, MMMM Do YYYY, h:mm:ss a");
                cardactivities += "<li id='card-activity'>"+zoomcard["activities"][l].username+" "+ zoomcard["activities"][l].actiontype;
                if(!(zoomcard["activities"][l].actiontype == "Edited this Card") && !(zoomcard["activities"][l].actiontype == "Made this Card")){
                    cardactivities += " with: <code>"+zoomcard["activities"][l].newdata+"</code> at "+datet+"</li>";
                }
            }
            cardactivities += "</ul></div>";

            var actioncontent = "<div class='zoom-card'>";
            actioncontent += "<ul class='uk-tab'><li>Card Activities</li></ul>";
            actioncontent += "<ul id='card-tabs'>";
            actioncontent += "<li id='cardactivities'>"+cardactivities+"</li></ul>";
            actioncontent += "<button onclick='commenting(" + cardID + ");' class='uk-button-primary' type='button'>Comment</button>";

            //now we launch the card viewer itself
            vex.open({
                content: actioncontent,
                afterOpen: function($vexContent) {
//                                return $vexContent.append($el);
                },
                afterClose: function() {
//                    return console.log('Card Closed');
                }
            });
        }
    } 
}
function addAction(cardid, user, action, extrainfo){
    //cardid is the int itself
    //user is the JSON of the user ie JSON.parse(localStorage.getItem("currentuser"));
    //action is a string that is either: "Moved the card", "Edited the card", "Made the card"
    //extrainfo is there if we need more data ie Moved card to "columnID" otherwise pass it as an empty string
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
    } else {
        //made the card
        newact["newdata"] = null; //can't set it equal to the card data because it becomes circular
    }
    newact["parent-actionID"] = null;
    //now we update the cards
    for(n=0; n<carddata.length; n++){
        if(carddata[n]["info"].cardID == cardid){
            //we need to get the actionid and the timestamp
            var tstamp = new Date().getTime();
            var aid=0;
            for(p=0; p<carddata[n]["activities"].length; p++){
                aid += 1;
            }
            newact["actionID"] = aid+1;
            newact["timestamp"] = tstamp;
            carddata[n]["activities"].push(newact);
        }
    }
    var carddatastring = JSON.stringify(carddata);
    localStorage.removeItem("cards");
    localStorage.setItem("cards", carddatastring);
    
    //now we push the updated stuff to the server
    var uploadactions = new XMLHttpRequest;
    uploadactions.open("POST", "./ascf.php", true);
    uploadactions.setRequestHeader("Content-Type", "application/json");
    uploadactions.send();
}


function commenting(cardID) {
    vex.dialog.prompt({
        message: 'Add comment:',
        callback: function(value) {
            //generate the timestamp when the action was made:
            var tstamp = new Date().getTime();
            //value is the comment text itself
            //get the currentuser
            var currentuser = JSON.parse(localStorage.getItem("currentuser"));
            var card;
            for(i=0; i<carddata.length; i++){
                if(carddata[i]["info"].cardID == cardID){
                    card = carddata[i];
                }
            }
            var newact = {};
            newact["username"] = currentuser.username;
            newact["actiontype"] = "Commented";
            newact["timestamp"] = tstamp;
            newact["newdata"] = value;
            newact["olddata"] = null;
            var prevaid = card["activities"][card["activities"].length - 1].actionID;
            newact["actionID"] = prevaid + 1;
            newact["parent-actionID"] = null;
            card["activities"].push(newact); //add the new comment
            for(j=0; j<carddata.length; j++){
                if(cardID == carddata[j]["info"].cardID){
                    carddata[j] = card; //overwrite old card data
                }
            }
            var cardsstring = JSON.stringify(carddata);
            localStorage.removeItem("cards");
            localStorage.setItem("cards", cardsstring);
            //now we push the new card/all cards to the db
            //cards is up to date
            var up = new XMLHttpRequest; //make a new request to update the content of users.txt
            up.open("POST", "./ascf.php", true);
            up.setRequestHeader("Content-Type", "application/json");
            //turn the JSON into a string
            up.send(cardsstring);
        }
    });
}

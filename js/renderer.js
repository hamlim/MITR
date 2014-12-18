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
function popupmodal(cardID){ //card info
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
                ltf += "<li id='card-ltf-field'>"+zoomcard["ltf-fields"][k].fieldname + ": <p>"+zoomcard["ltf-fields"][k].fielddata+"</p></li>";
            }
            ltf += "</ul></li>";
            var dat = "<li id='card-date-fields'><ul>";
            for(m=0; m<zoomcard["date-fields"].length; m++){
                var unix_timestamp = zoomcard["date-fields"][m].fielddata;
                var dateinfo = moment(parseInt(unix_timestamp)).format("dddd, MMMM Do YYYY, h:mm:ss a");
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
                escapeButtonCloses: false,
                overlayClosesOnClick: false,
                css: {'word-wrap' : 'break-word'},
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

function popupaction(cardID){ //card activities
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
                if(!(zoomcard["activities"][l].actiontype == "Edited this card") && !(zoomcard["activities"][l].actiontype == "Made this card") && !(zoomcard["activities"][l].actiontype == "Moved this card") && zoomcard["activities"][l].newdata != null){
                    cardactivities += " with: <p>"+zoomcard["activities"][l].newdata.data+"</p> at "+datet+"</li>";
                    console.log("In Renderer.js");
                    console.log(zoomcard["activities"][l].newdata);
                }
                if(zoomcard["activities"][l].actiontype == "Moved this card"){
                    var meh = zoomcard["activities"][l].newdata;
                    var int = meh.data;
                    for(j=0; j<columndata.length; j++){
                        if(int == columndata[j].columnID){
                            var columnname = columndata[j].columnname;
                        }
                    }
                    cardactivities += " to: <code>"+columnname+"</code></li>";
                }
                if(zoomcard["activities"][l].actiontype == "Edited this card" || zoomcard["activities"][l].actiontype == "Made this card"){
                    cardactivities += "</li>";
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
                escapeButtonCloses: false,
                overlayClosesOnClick: false,
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
function commenting(cardID) { //handling comments
    vex.dialog.prompt({
        escapeButtonCloses: false,
        overlayClosesOnClick: false,
        message: 'Add comment:',
        callback: function(value) {
            //generate the timestamp when the action was made:
            var currentuser = JSON.parse(localStorage.getItem("currentuser"));
            addAction(cardID, currentuser, "Commented", value);
        }
    });
}

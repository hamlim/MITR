//format card.js
function popupformatcard() {
    //here we handle the vex popup modal
    //the data that the user then outputs
    //creation of the card
    //adding the card to the local storage
    //then adding the card to the server cards.json file
    //carddata is all cards
    //columndata is all columns
    //cccs is the array of card color codes
    //colors is the array of column color codes
    //first we create vars content and form
    //content is the header of the modal essentially (Make Format Card)
    //form is the actual form content stuff
    //form should consist of:
        // card name/title
        // card priority
        // card description
        //
    //pre-form content
    loaddata();
    if(carddata == undefined || carddata == null){
        if(cards != undefined || cards != null){
            var carddata = cards;
        } else {
            var carddata = [];
        }
    }
    if(columndata == undefined || columndata == null){
        if(columns != null || columns != undefined){
            columndata = columnsa;
        } else {
            columndata = [];
        }
    }
    var content = "<h1>Edit Card Format: </h1>";
    //form content
    //
    // Title of the card: <div class='uk-form-row uk-panel-primary'><label for='title'>Card Title:</label><input name='title' type='text' value=' + n + '/></div>
    // all stfs 
    // all ltfs
    // all dates
    //---------------------------------------------
    //here we begin to repeat objs
    //stfs
    var fstf = "<div class='stf-edit-content'><h3>Short text fields</h3><p>Fill only the forms that you will need, leave the rest empty!</p>";
    for(y=0; y<10; y++){
        fstf += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizestf'><input name='stfname' for='stfname' type='text' placeholder='Field Name'/><div class='vex-custom-input-wrapper'><input name='stfcont' type='text' placeholder='Example Field Data' value=''/></div></div></div><br/>";   
    }
    fstf += "</div><br/>";
    //---------------------------------------------
    //all ltfs
    var fltf = "<div class='ltf-edit-content'><h3>Long text fields</h3><p>Fill only the forms that you will need, leave the rest empty!</p>";
    for(y=0; y<10; y++){
        fltf += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizeltf'><input name='ltfname' for='ltfname' type='text' placeholder='Field Name' /><div class='vex-custom-field-wrapper'><textarea name='ltfcont' rows='4' placeholder='Example Field Data' value=''/></textarea></div></div></div><br/>";   
    }
    fltf += "</div><br/>";
    //---------------------------------------------
    //all dates
    var fdate = "<div class='date-edit-content'><h3>Date fields</h3><p>Fill only the forms that you will need, leave the rest empty!</p>";
    for(y=0; y<10; y++){
        //attempts at fixing the date format so jQuery understands it
        fdate += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizedate'><input name='datename' for='datename' type='text' placeholder='Field Name'/><div class='vex-custom-input-wrapper'><input name='datedata' type='date' value=''/></div></div></div><br/>";   
    }
    fdate += "</div><br/>";
    // now compile all parts
    var form = fstf + fltf + fdate;
    vex.dialog.open({
        message: content,
        input: form,
        callback: function(data) {
            if (data === false) {
                return ;
            } else {
                console.log(data);
                //data is all the vars that were changed
                /*
                    date is an array -> need to check if the values changed
                    ltf is an array -> need to check if the values changed/if the values are null ("") then don't overwrite
                    stf is an array -> need to check is the values are changed
                    priority is a string -> need to change it to an int
                    column -> change to input, then check if the input is a real column, if not don't move
                    colorcode -> change to input, then check if the color code is in cccs or not, if so change
                    
                */
                //the card format is being made/edited
                var cardformat = {};
                //--------------------------------------------------
                //info
                //--------------------------------------------------
                var info = {};
                //title
                info.cardname = "EXAMPLE";
                //color code
                info.cardcolorcode = "Red";
                //columnID
                info.columnID = -1; //make sure it never gets rendered
                //priority
                info.cardpriority = -1; //make sure it never gets rendered
                //cardID
                info.cardID = -1; //make sure it never gets rendered
                cardformat["info"] = info;
                //--------------------------------------------------
                //ltf-fields
                //--------------------------------------------------
                var ltfs = [];
                for(e=0; e<data.ltfname.length; e++){
                    if(data.ltfname[e] != "" || data.ltfname[e].length != 0){
                        //ok we have an ltf field
                        var ltf = {};
                        ltf.fieldname = data.ltfname[e];
                        ltf.fieldtype = "ltf";
                        ltf.fielddata = data.ltfcont[e];
                        ltfs.push(ltf);
                    }
                }
                cardformat["ltf-fields"] = ltfs;
                //--------------------------------------------------
                //stf fields
                //--------------------------------------------------
                var stfs = [];
                for(r=0; r<data.stfname.length; r++){
                    if(data.stfname[r] != "" || data.stfname[r].length != 0 && data.stfcont[r] != ""){
                        var stf = {};
                        stf.fieldname = data.stfname[r];
                        stf.fieldtype = "stf";
                        stf.fielddata = data.stfcont[r];
                        stfs.push(stf);
                    }
                }
                cardformat["stf-fields"] = stfs;
                //--------------------------------------------------
                //date fields
                //--------------------------------------------------
                var dates = [];
                for(t=0; t<data.datename.length; t++){
                    if(data.datename[t] != "" || data.datename[t].length != 0){
                        var date = {};
                        date.fieldname = data.datename[t];
                        date.fieldtype = "date";
                        var dat = moment(data.datedata[t]);
                        var unix = moment(dat).format("x");
                        date.fielddata = unix;
                        dates.push(date);
                    }
                }       
                cardformat["date-fields"] = dates;
                //initilaize activities
                var action = {};
                var actions = [];
                action.username = "EXAMPLE";
                action.actiontype = "Example";
                action.timestamp = moment().format("x");
                action.newdata = null;
                action.olddata = null;
                action.actionID = -1;
                action.parent_actionID = null;
                actions.push(action);
                cardformat["activities"] = actions;
                //now we overwrite the stuff
                //make sure to overwrite existing example card instead of providing two or more example cards
                if(carddata.length != 0){
                    for(i=0; i<carddata.length; i++){
                        if(carddata[i].info.cardID == -1){
                            carddata[i] = cardformat;
                        }
                    }
                    carddata.push(cardformat);
                } else {
                    carddata.push(cardformat);
                }
                var cardstring = JSON.stringify(carddata);                
                //now upload the cardstring
                if(carddata != undefined || carddata != null){
                    var upload = new XMLHttpRequest;
                    upload.open("POST", "./ascf.php", true);
                    upload.setRequestHeader("Content-Type", "application/json");
                    upload.send(cardstring);
                }
                
            }
        }
    });
}

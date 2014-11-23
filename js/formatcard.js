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
    var content = "<h1>Edit Card Format: </h1>";
    //form content
    //
    // Title of the card: <div class='uk-form-row uk-panel-primary'><label for='title'>Card Title:</label><input name='title' type='text' value=' + n + '/></div>
    // all stfs 
    // all ltfs
    // all dates
    // priority
    // color code
    // columnID
    //---------------------------------------------
    //title
    
    var ftitle = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizetitle'><label for='title'>Card Title:</label><div class='vex-custom-input-wrapper'><input name='title' type='text' value='EXAMPLE' disabled/></div></div></div><br/>";
    //---------------------------------------------
    //priority
    var fpri = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizepriority'><label for='priority'>Card Priority:</label><div class='vex-custom-input-wrapper'><input name='priority' type='number' min=1 value='1'/></div></div></div><br/>";
    //---------------------------------------------
    //color codes
    var fcolor = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizedropdown'><label for='colorcode'>Card Colorcode:</label>";
    var optionstring = "<div class='vex-custom-input-wrapper'><select name='colorcode' id='card-color-select'>";
    for(j=0; j<cccs.length; j++){
        optionstring += "<option>"+cccs[j].name+"</option>";
    }
    optionstring += "</select>";
    fcolor += optionstring + "</div></div></div><br/>";
    //---------------------------------------------
    //columnID
    var fcolid = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizedropdown'><label for='columnid'>Card Column:</label>";
    var coloptstring = "<div class='vex-custom-input-wrapper'><select name='columnid' id='column-name-select'>";
    for(q=0; q<columndata.length; q++){
        coloptstring += "<option>" + columndata[q].columnname + "</option>";
    }
    fcolid += coloptstring + "</select></div></div></div><br/>";
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
    var form = ftitle + fstf + fltf + fdate + fpri + fcolor + fcolid;
    vex.dialog.open({
        message: content,
        input: form,
        callback: function(data) {
            if (data === false) {
                return console.log('Cancelled');
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
//                //data.title = title
//                for(q=0; q<carddata.length; q++){
//                    if(carddata[q]["info"].cardID == cardID){
//                        //the card is being edited
//                        //--------------------------------------------------
//                        //title
//                        //--------------------------------------------------
//                        if(data.title != carddata[q]["info"].cardname){
//                            //cardname has changed
//                            carddata[q]["info"].cardname = data.title;
//                        }
//                        //--------------------------------------------------
//                        //color code
//                        //--------------------------------------------------
//                        if(data.colorcode != carddata[q]["info"].cardcolorcode){
//                            carddata[q]["info"].cardcolorcode = data.colorcode;
//                        }
//                        //--------------------------------------------------
//                        //columnID
//                        //--------------------------------------------------
//                        var sith;
//                        for(w=0; w<columndata.length; w++){
//                            if(columndata[w].columnname == data.columnid){
//                                sith = columndata[w].columnID;
//                            }
//                        }
//                        if(sith != carddata[q]["info"].columnID){
//                            carddata[q]["info"].columnID = sith;
//                        }
//                        //--------------------------------------------------
//                        //priority
//                        //--------------------------------------------------
//                        if(parseInt(data.priority) != carddata[q]["info"].cardpriority){
//                            carddata[q]["info"].cardpriority = parseInt(data.priority);
//                        }
//                        //--------------------------------------------------
//                        //ltf changes
//                        //--------------------------------------------------
//                        for(e=0; e<data.ltf.length; e++){
//                            if(data.ltf[e].length != 0 && data.ltf[e] != carddata[q]["ltf-fields"][e].fielddata){
//                                var obj = {};
//                                obj.fielddata = data.ltf[e];
//                                obj.fieldtype = "ltf";
//                                obj.fieldname = carddata[q]["ltf-fields"][e].fieldname;
//                                carddata[q]["ltf-fields"][e] = obj;
//                            }
//                        }
//                        //--------------------------------------------------
//                        //stf changes
//                        //--------------------------------------------------
//                        for(r=0; r<data.stf.length; r++){
//                            if(data.stf[r] != carddata[q]["stf-fields"][r].fielddata){
//                                var obj = {};
//                                obj.fielddata = data.stf[e];
//                                obj.fieldtype = "stf";
//                                obj.fieldname = carddata[q]["stf-fields"][e].fieldname;
//                                carddata[q]["stf-fields"][r] = obj;
//                            }
//                        }
//                        //--------------------------------------------------
//                        //date changes
//                        //--------------------------------------------------
//                        for(t=0; t<data.date.length; t++){
//                            //parse date format
//                            var date = moment(data.date[t]);
//                            var unix = moment(date).format("x");
//                            if(unix != carddata[q]["date-fields"][t].fielddata){
//                                var obj = {};
//                                obj.fielddata = unix;
//                                obj.fieldtype = "date";
//                                obj.fieldname = carddata[q]["ltf-fields"][e].fieldname;
//                                carddata[q]["date-fields"][t] = obj;
//                            }   
//                        }
//                        
//                    }
//                }
//                
//                //now we overwrite the stuff
//                console.log(carddata);
//                console.log(cardID);
//                var cardstring = JSON.stringify(carddata);
//                localStorage.removeItem("cards");
//                localStorage.setItem("cards", cardstring);
//                
//                //now upload the cardstring
//                var upload = new XMLHttpRequest;
//                upload.open("POST", "./ascf.php", true);
//                upload.setRequestHeader("Content-Type", "application/json");
//                upload.send(cardstring);
//                //done
//                
            }
        }
    });
}

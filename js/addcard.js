//add card
var cad;
function popupaddcard(){
    //first we read from the EXAMPLE card in cards.json
    var example;
    //initialize the newcard obj
    var newcard = {};
    //count the newID for the new card
//    var newid = 0;
    for(i=0; i<carddata.length; i++){
        if(carddata[i]["info"].cardID == -1){
            console.log(carddata[i]);
            example = carddata[i];
        }
//        newid + 1;
    }
//    newid = newid + 1;//newID is set
    //now for the ltf, stf, date info
    var dates = [];
    if(example == undefined){
        alert("Have the Admin of the site add an Example Card Format!");
    } else {
        for(m=0; m<example["date-fields"].length; m++){
            var date = example["date-fields"][m].fieldname;
            dates.push(date);
        }
        var ltfs = [];
        for(p=0; p<example["ltf-fields"].length; p++){
            var ltf = example["ltf-fields"][p].fieldname;
            ltfs.push(ltf);
        }
        var stfs = [];
        for(a=0; a<example["stf-fields"].length; a++){
            var stf = example["stf-fields"][a].fieldname;
            stfs.push(stf);
        }

        var colnames = [];
        for(o = 0; o<columndata.length; o++){
            colnames.push(columndata[o].columnname);
        }


        //pre-form content
        var content = "<h1>Add Card: </h1>";
        //form content
        // all stfs 
        // all ltfs
        // all dates
        // priority
        // color code
        // columnID
        //
        var fbegin = "<form class='uk-form'>";
        var fend = "</form>";
        //---------------------------------------------
        //title

        var ftitle = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizetitle'><label for='title'>Card Title:</label><div class='vex-custom-input-wrapper'><input name='title' type='text' value=''/></div></div></div><br/>";
        //---------------------------------------------
        //priority
        var fpri = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizepriority'><label for='priority'>Card Priority:</label><div class='vex-custom-input-wrapper'><input name='priority' type='number' min=1 value=''/></div></div></div><br/>";
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
        for(q=0; q<colnames.length; q++){
            coloptstring += "<option>" + colnames[q] + "</option>";
        }
        fcolid += coloptstring + "</select></div></div></div><br/>";
        //---------------------------------------------
        //all stfs
        var fstf = "<div class='stf-edit-content'>";
        for(y=0; y<stfs.length; y++){
            fstf += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizestf'><label for='stf'>"+stfs[y]+":</label><div class='vex-custom-input-wrapper'><input name='stf' type='text' value=''/></div></div></div><br/>";   
        }
        fstf += "</div><br/>";
        //---------------------------------------------
        //all ltfs
        var fltf = "<div class='ltf-edit-content'>";
        for(y=0; y<ltfs.length; y++){
            fltf += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizeltf'><label for='ltf'>"+ltfs[y]+":</label><div class='vex-custom-field-wrapper'><textarea name='ltf' rows='4' placeholder='' value=''/></textarea></div></div></div><br/>";   
        }
        fltf += "</div><br/>";
        //---------------------------------------------
        //all dates
        var fdate = "<div class='date-edit-content'>";
        for(y=0; y<dates.length; y++){
            fdate += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizedate'><label for='dates'>"+dates[y]+":</label><div class='vex-custom-input-wrapper'><input name='date' type='date' value=''/></div></div></div><br/>";   
        }
        fdate += "</div><br/>";
        // now compile all parts
        //var form = fbegin + ftitle + fstf + fltf + fdate + fpri + fcolor + fcolid + fend;
        var form = ftitle + fstf + fltf + fdate + fpri + fcolor + fcolid;
        vex.dialog.open({
            escapeButtonCloses: false,
            overlayClosesOnClick: false,
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
                    //data.title = title
                    //newcard is the card obj
                    //--------------------------------------------------
                    //info
                    //--------------------------------------------------
                    var info = {};
                    //title
                    //title = EXAMPLE
                    info.cardname = data.title;

                    //color code
                    info.cardcolorcode = data.colorcode;

                    //columnID
                    var coluid;
                    for(k=0; k<columndata.length; k++){
                        if(columndata[k].columnname == data.columnid){
                           coluid = columndata[k].columnID;
                        }
                    }
                    info.columnID = coluid; //make sure it never gets rendered

                    //priority
                    info.cardpriority = parseInt(data.priority); //make sure it never gets rendered

                    //cardID
                    info.cardID = carddata.length - 1;

                    newcard["info"] = info;

                    //--------------------------------------------------
                    //ltf-fields
                    //--------------------------------------------------
                    var ltfs = [];
                    for(e=0; e<example["ltf-fields"].length; e++){
                        //ok we have an ltf field
                        if(example["ltf-fields"].length == 1){
                            var ltf = {};
                            ltf.fieldname = example["ltf-fields"][e].fieldname;
                            ltf.fieldtype = "ltf";
                            ltf.fielddata = data.ltf;
                            ltfs.push(ltf);
                        }
                        var ltf = {};
                        ltf.fieldname = example["ltf-fields"][e].fieldname;
                        ltf.fieldtype = "ltf";
                        ltf.fielddata = data.ltf[e];
                        ltfs.push(ltf);
                    }

                    newcard["ltf-fields"] = ltfs;

                    //--------------------------------------------------
                    //stf fields
                    //--------------------------------------------------
                    var stfs = [];
                    for(r=0; r<example["stf-fields"].length; r++){
                        if(example["stf-fields"].length == 1){
                            var stf = {};
                            stf.fieldname = example["stf-fields"][r].fieldname;
                            stf.fieldtype = "stf";
                            stf.fielddata = data.stf;
                            stfs.push(stf);
                        }
                        var stf = {};
                        stf.fieldname = example["stf-fields"][r].fieldname;
                        stf.fieldtype = "stf";
                        stf.fielddata = data.stf[r];
                        stfs.push(stf);
                    }

                    newcard["stf-fields"] = stfs;

                    //--------------------------------------------------
                    //date fields
                    //--------------------------------------------------
                    var dates = [];
                    for(t=0; t<example["date-fields"].length; t++){
                        if(example["date-fields"].length == 1){
                            var date = {};
                            date.fieldname = example["date-fields"][t].fieldname;
                            date.fieldtype = "date";
                            var dat = moment(data.date).format("x");
                            date.fielddata = dat;
                            dates.push(date);
                        }
                        var date = {};
                        date.fieldname = example["date-fields"][t].fieldname;
                        date.fieldtype = "date";
                        var dat = moment(data.date[t]);
                        var unix = moment(dat).format("x");
                        date.fielddata = unix;
                        dates.push(date);
                    }       

                    newcard["date-fields"] = dates;

                    //get the currentusername
                    var uname = JSON.parse(localStorage.getItem("currentuser"));

                    console.log(newcard);
                    carddata.push(newcard);
                    //carddata is correct with all the right colors
                    
                    var carddatastringstuff = JSON.stringify(carddata);
//                    console.log(carddatastringstuff);
                    localStorage.removeItem("cards");
                    localStorage.setItem("cards", carddatastringstuff);

                    //now upload the new cards to the server
                    if(carddata != undefined || carddata != null){
                        var up = new XMLHttpRequest;
                        up.open("POST", "./ascf.php", true);
                        up.setRequestHeader("Content-Type", "application/json");
                        up.send(carddatastringstuff);
                    }   
                    
                    
                    
                    console.log(carddata);
                    console.log("Going into addAction!");
                    addAction(info.cardID, uname, "Made the card", "");
//                    location.reload();

                }
            }
        });
    }
}

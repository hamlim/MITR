//edit card modal
var darkblue = {
    name: "Dark blue",
    hex: "#4a5e77"
};
var green = {
    name: "Green",
    hex: "#bae756"
};
var grey = {
    name: "Grey",
    hex: "#5f5f5f"
};
var lightblue = {
    name: "Light blue",
    hex: "#4ecdc4"
};
var pink = {
    name: "Pink",
    hex: "#ff6b6b"
};
var purple = {
    name: "Purple",
    hex: "#9970a8"
};
var red = {
    name: "Red",
    hex: "#c54d57"
};
var yellow = {
    name: "Yellow",
    hex: "#f5ef65"
};
var cccs = [darkblue, green, grey, lightblue, pink, purple, red, yellow];
var cad;
function popupeditcard(cardID){
    //cardID
    //first construct the outside form test
    //get relevent data
    var n, c, cid, p;
    for(i=0; i<carddata.length; i++){
        if(carddata[i]["info"].cardID == cardID){
            cad = carddata[i];
            n = cad["info"].cardname;
            c = cad["info"].cardcolorcode;
            p = cad["info"].cardpriority;
            cid = cad["info"].columnID;
        }
    }
//    console.log(cad);
    var colnames = [];
    var currentcolname;
    for(o = 0; o<columndata.length; o++){
        if(columndata[o].columnID != cid){
            colnames.push(columndata[o].columnname);
        } else {
            currentcolname = columndata[o].columnname;
        }
    }
//    console.log("columns");
//    console.log(colnames);
    //colnames is the other columns
    //currentcolname is the current column the card is in
    //cccs is the cardcolorcodes
    var ncccs = [];
    var ccs;
    for(k=0; k<cccs.length; k++){
        if(c != cccs[k].name){
            ncccs.push(cccs[k]);
        } else {
            ccs = cccs[k];
        }
    }
    //ncccs = all other colors
    //ccs = current colorcode
    /*
        Example form:
        "<div class=\"vex-custom-field-wrapper\">\n    <label for=\"date\">Date</label>\n    <div class=\"vex-custom-input-wrapper\">\n        <input name=\"date\" type=\"date\" value=\"" + todayDateString + "\" />\n    </div>\n</div>\n<div class=\"vex-custom-field-wrapper\">\n    <label for=\"color\">Color</label>\n    <div class=\"vex-custom-input-wrapper\">\n        <input name=\"color\" type=\"color\" value=\"#ff00cc\" />\n    </div>\n</div>"
    */
    //pre-form content
    var content = "<h1>Edit Card: "+n+ " </h1>";
    //form content
    //
    // Title of the card: <div class='uk-form-row uk-panel-primary'><label for='title'>Card Title:</label><input name='title' type='text' value=' + n + '/></div>
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
    
    var ftitle = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary'><label for='title'>Card Title:</label><div class='vex-custom-input-wrapper'><input name='title' type='text' value='" + n + "'/></div></div></div><br/>";
    //---------------------------------------------
    //priority
    var fpri = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary'><label for='priority'>Card Priority:</label><div class='vex-custom-input-wrapper'><input name='priority' type='number' min=1 value='"+p+"'/></div></div></div><br/>";
    //---------------------------------------------
    //color codes
    var fcolor = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary'><label for='colorcode'>Card Colorcode:</label>";
    var optionstring = "<div class='vex-custom-input-wrapper'><select name='colorcode' id='card-color-select'><option>"+ccs.name+"</option>";
    for(j=0; j<ncccs.length; j++){
        optionstring += "<option>"+ncccs[j].name+"</option>";
    }
    optionstring += "</select>";
    fcolor += optionstring + "</div></div></div><br/>";
    //---------------------------------------------
    //columnID
    var fcolid = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary'><label for='columnid'>Card Column:</label>";
    var coloptstring = "<div class='vex-custom-input-wrapper'><select name='columnid' id='column-name-select'><option>"+currentcolname+"</option>";
    for(q=0; q<colnames.length; q++){
        coloptstring += "<option>" + colnames[q] + "</option>";
    }
    fcolid += coloptstring + "</select></div></div></div><br/>";
    //---------------------------------------------
    //all stfs
    var fstf = "<div class='stf-edit-content'>";
    for(y=0; y<cad["stf-fields"].length; y++){
        fstf += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary'><label for='stf'>"+cad["stf-fields"][y].fieldname+":</label><div class='vex-custom-input-wrapper'><input name='stf' type='text' value='"+cad["stf-fields"][y].fielddata+"'/></div></div></div><br/>";   
    }
    fstf += "</div><br/>";
    //---------------------------------------------
    //all ltfs
    var fltf = "<div class='ltf-edit-content'>";
    for(y=0; y<cad["ltf-fields"].length; y++){
        fltf += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary'><label for='ltf'>"+cad["ltf-fields"][y].fieldname+":</label><div class='vex-custom-field-wrapper'><textarea name='ltf' rows='4' placeholder='"+cad["ltf-fields"][y].fielddata +"' value='"+cad["ltf-fields"][y].fielddata+"'/></textarea></div></div></div><br/>";   
    }
    fltf += "</div><br/>";
    //---------------------------------------------
    //all dates
    var fdate = "<div class='date-edit-content'>";
    for(y=0; y<cad["date-fields"].length; y++){
        var now = moment(cad["date-fields"][y].fielddata);
        var datet = moment(now).format("YYYY MM DD");
        //attempts at fixing the date format so jQuery understands it
        fdate += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary'><label for='dates'>"+cad["date-fields"][y].fieldname+":</label><div class='vex-custom-input-wrapper'><input name='date' type='date' value='"+datet+"'/></div></div></div><br/>";   
    }
    fdate += "</div><br/>";
    // now compile all parts
    //var form = fbegin + ftitle + fstf + fltf + fdate + fpri + fcolor + fcolid + fend;
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
                //data.title = title
                for(q=0; q<carddata.length; q++){
                    if(carddata[q]["info"].cardID == cardID){
                        //the card is being edited
                        if(data.title != carddata[q]["info"].cardname){
                            //cardname has changed
                            carddata[q]["info"].cardname = data.title;
                        }
                        if(data.colorcode != carddata[q]["info"].cardcolorcode){
                            carddata[q]["info"].cardcolorcode = data.colorcode;
                        }
                        var sith;
                        for(w=0; w<columndata.length; w++){
                            if(columndata[w].columnname == data.columnid){
                                sith = columndata[w].columnID;
                            }
                        }
                        if(sith != carddata[q]["info"].columnID){
                            carddata[q]["info"].columnID = sith;
                        }
                        if(parseInt(data.priority) != carddata[q]["info"].cardpriority){
                            carddata[q]["info"].cardpriority = parseInt(data.priority);
                        }
                        //ltf changes
                        for(e=0; e<data.ltf.length; e++){
                            for(r=0; r<carddata[q]["ltf-fields"].length; r++){
                                if(data.ltf[e])
                            }    
                        }
                    }
                }
                
            }
        }
    });
}

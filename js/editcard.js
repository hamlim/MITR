//edit card modal
var darkblue = {
    name: "Darkblue",
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
    name: "Lightblue",
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

function popupeditcard(cardID){
    //cardID
    //first construct the outside form test
    //get relevent data
    var n, c, cid, p, card;
    for(i=0; i<carddata.length; i++){
        if(carddata[i]["info"].cardID == cardID){
            card = carddata[i];
            n = card["info"].cardname;
            c = card["info"].cardcolorcode;
            p = card["info"].cardpriority;
            cid = card["info"].columnID;
        }
    }
    var colnames = [];
    var currentcolname;
    for(o = 0; o<columndata.length; o++){
        if(columndata[o].columnID != cid){
            colnames.push(columndata[o].columnname);
        } else {
            currentcolname = columndata[o].columnname;
        }
    }
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
    
    var ftitle = "<div class='uk-form-row uk-panel-primary'><label for='title'>Card Title:</label><input name='title' type='text' value='" + n + "'/></div><br/>";
    //---------------------------------------------
    //priority
    var fpri = "<div class='uk-form-row uk-panel-primary'><label for='priority'>Card Priority:</label><input name='priority' type='number' min=1 value='"+p+"'/></div><br/>";
    //---------------------------------------------
    //color codes
    var fcolor = "<div class='uk-form-row uk-panel-primary'><label for='colorcode'>Card Colorcode:</label>";
    var optionstring = "<select id='card-color-select'><option>"+ccs.name+"</option>";
    for(j=0; j<ncccs.length; j++){
        optionstring += "<option>"+ncccs.name+"</option>";
    }
    optionstring += "</select>";
    fcolor += optionstring + "</div><br/>";
    //---------------------------------------------
    //columnID
    var fcolid = "<div class='uk-form-row uk-panel-primary'><label for='columnid'>Card Column:</label>";
    var coloptstring = "<select id='column-name-select'><option>"+currentcolname+"</option>";
    for(q=0; q<colnames.length; q++){
        coloptstring += "<option" + colnames[q] + "</option>";
    }
    fcolid += coloptstring + "</select></div><br/>";
    //---------------------------------------------
    //all stfs
    var fstf = "<div class='stf-edit-content'>";
    for(y=0; y<card["stf-fields"].length; y++){
        fstf += "<div class='uk-form-row uk-panel-primary'><label for='stf'>"+card["stf-fields"][y].fieldname+":</label><input type='text' value='"+card["stf-fields"].fieldname+"'/></div><br/>";   
    }
    fstf += "</div><br/>";
    //---------------------------------------------
    //all ltfs
    var fltf = "<div class='ltf-edit-content'>";
    for(y=0; y<card["ltf-fields"].length; y++){
        fltf += "<div class='uk-form-row uk-panel-primary'><label for='ltf'>"+card["ltf-fields"][y].fieldname+":</label><input type='text' value='"+card["ltf-fields"].fieldname+"'/></div><br/>";   
    }
    fltf += "</div><br/>";
    //---------------------------------------------
    //all dates
    var fdate = "<div class='date-edit-content'>";
    for(y=0; y<card["date-fields"].length; y++){
        fdate += "<div class='uk-form-row uk-panel-primary'><label for='dates'>"+card["date-fields"][y].fieldname+":</label><input type='date' value='"+card["date-fields"].fieldname+"'/></div><br/>";   
    }
    fdate += "</div><br/>";
    // now compile all parts
    var form = fbegin + ftitle + fstf + fltf + fdate + fpri + fcolor + fcolid + fend;
    vex.dialog.open({
        message: content,
        input: form,
        callback: function(data) {
            if (data === false) {
                return console.log('Cancelled');
            } else {
                console.log(JSON.parse(data));
            }
        }
    });
}
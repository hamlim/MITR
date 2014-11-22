# The title component

    ```
        var ftitle = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizetitle'><label for='title'>Card Title:</label><div class='vex-custom-input-wrapper'><input class= 'gentext' name='title' type='text' value='" + n + "'/></div></div></div><br/>";
    ```
    
# The Priority component
    
    ```
        var fpri = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizepriority'><label for='priority'>Card Priority:</label><div class='vex-custom-input-wrapper'><input class= 'gentext' name='priority' type='number' min=1 value='"+p+"'/></div></div></div><br/>";
    ```
    
# The color component

    ```
       var fcolor = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizedropdown'><label for='colorcode'>Card Colorcode:</label>";
        var optionstring = "<div class='vex-custom-input-wrapper'><select class= 'gentext' id='card-color-select'><option>"+ccs.name+"</option>";
        for(j=0; j<ncccs.length; j++){
            optionstring += "<option>"+ncccs[j].name+"</option>";
        }
        optionstring += "</select>";
        fcolor += optionstring + "</div></div></div><br/>";
    ```
    
# The columnID component

    ```
        var fcolid = "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizedropdown'><label for='columnid'>Card Column:</label>";
        var coloptstring = "<div class='vex-custom-input-wrapper'><select class= 'gentext' id='column-name-select'><option>"+currentcolname+"</option>";
        for(q=0; q<colnames.length; q++){
            coloptstring += "<option>" + colnames[q] + "</option>";
        }
        fcolid += coloptstring + "</select></div></div></div><br/>";
    ```
        
# The stf component

    ```
        var fstf = "<div class='stf-edit-content'>";
        for(y=0; y<cad["stf-fields"].length; y++){
            fstf += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizestf'><label for='stf'>"+cad["stf-fields"][y].fieldname+":</label><div class='vex-custom-input-wrapper'><input class= 'gentext' type='text' value='"+cad["stf-fields"][y].fielddata+"'/></div></div></div><br/>";   
        }
        fstf += "</div><br/>";
    ```
    
# The ltf component
    
    ```
        var fltf = "<div class='ltf-edit-content'>";
        for(y=0; y<cad["ltf-fields"].length; y++){
            fltf += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizeltf'><label for='ltf'>"+cad["ltf-fields"][y].fieldname+":</label><div class='vex-custom-field-wrapper'><textarea class= 'gentext' rows='4' placeholder='' value='"+cad["ltf-fields"][y].fielddata+"'/></textarea></div></div></div><br/>";   
        }
        fltf += "</div><br/>";
    ```
    
# The Date component

    ```
        var fdate = "<div class='date-edit-content'>";
        for(y=0; y<cad["date-fields"].length; y++){
            var now = moment(cad["date-fields"][y].fielddata);
            var datet = moment(now).format("YYYY MM DD");
            //attempts at fixing the date format so jQuery understands it
            fdate += "<div class='vex-custom-field-wrapper'><div class='uk-form-row uk-panel-primary customizedate'><label for='dates'>"+cad["date-fields"][y].fieldname+":</label><div class='vex-custom-input-wrapper'><input class= 'gentext' type='date' value='"+datet+"'/></div></div></div><br/>";   
        }
        fdate += "</div><br/>";
    ```
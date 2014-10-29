//This js file will handle all communications to the server


//first thing to take care of is the click on add card link

var submitbtn = $("#add-card-submit-btn");

submitbtn.click(function() {
    //submit has been clicked
    //now we need to parse the form
    //-------------------------------
//    var inputs = document.getElementsByTagName("input");
//    var message =
//       "The form has the following input elements with the 'type' attribute = 'text': \n\n";
//
//    for (var i=0; i < inputs.length; i++)
//    {
//
//       if (inputs[i].getAttribute('type') == 'text')
//       {
//          message += inputs[i].tagName +
//          " element with the 'name' attribute = '";
//          message += inputs[i].getAttribute('name') + "'\n";
//       }
//    }
//    alert(message);
    //-------------------------------
    
    var inputs = document.getElementsByTagName("input");
    for (var i=0; i<inputs.length; i++){
        if(inputs[i].getAttribute('type') == 'text'){
            //here we have all text inputs
        } else if ( inputs[i].getAttribute('type') == 'date'){
            
        }
    }
});
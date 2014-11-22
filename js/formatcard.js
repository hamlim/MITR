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
    //finally we can generate the vex modal
    vex.dialog.open({
        message: content,
        input: form,
        callback: function(data) {
            if (data === false) {
                return console.log('Cancelled');
            } else {
                console.log(data);
            }
        }
    });
}
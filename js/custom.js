	   
/* How to change the background color of a div ith an id 
	    $("#idname" + number).css({
	        backgroundColor: '#' + colorhex
	    });
*/

//toggle show/hide for activity feed, yo -- this code works
$('#acttogglebutton').on('click', function() {
    $("#activityfeed").toggleClass('clicked');
});
	   
/* How to change the background color of a div ith an id 
	    $("#idname" + number).css({
	        backgroundColor: '#' + colorhex
	    });
*/

//toggle show/hide for sactivity feed, yo
$('#activityfeedlink').on('click', function() {
    $(this).toggleClass('clicked');
});
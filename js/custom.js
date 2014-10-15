	   
	   
/* How to change the background color of a div ith an id 
	    $("#idname" + number).css({
	        backgroundColor: '#' + colorhex
	    });
*/
function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}



function columns(){


	for(x = 1; x <= 5; x++){

		var hold = "col" + x;
		document.getElementById(hold).style.backgroundColor = ColorLuminance(0x142966,(x));
	}
}

//toggle show/hide for activity feed, yo -- this code works
$('#acttogglebutton').on('click', function() {
    $("#activityfeed").toggleClass('clicked');
});
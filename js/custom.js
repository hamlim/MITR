//color codes
var purple = new Object();
purple.first = "#3D2D43";
purple.last = "#E0D4E5";
purple.name = "Purple";

var blue = new Object();
blue.first = "#25303C";
blue.last = "#C9CFD6";
blue.name = "Blue";

var teal = new Object();
teal.first = "#1F524E";
teal.last = "#CAF0ED";
teal.name = "Teal";

var green = new Object();
green.first = "#4A5C22";
green.last = "#CEEE89";
green.name = "Green";

var yellow = new Object();
yellow.first = "#7A7832";
yellow.last = "#F8F5A2";
yellow.name = "Yellow";

var red = new Object();
red.first = "#B24B4B";
red.last = "#FFD3D3";
red.name = "Red";

var maroon = new Object();
maroon.first = "#762E35";
maroon.last = "#E7B8BC";
maroon.name = "Maroon";

var grey = new Object();
grey.first = "#262626";
grey.last = "#CFCFCF";
grey.name = "Grey";

//array of all background colors
var colors = [purple, blue, teal, green, yellow, red, maroon, grey];





//helper function to create the shades for column backgrounf
function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	//lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + lum[i]), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}


//Set color gradient and background color for all the columns
function columns(c1, c2, colnum){
	var color1 = c1;
	var color2 = c2;
	var red = parseInt(color2.substr(1,2), 16) - parseInt(color1.substr(1,2), 16);
	var green = parseInt(color2.substr(3,2), 16) - parseInt(color1.substr(3,2), 16);
	var blue = parseInt(color2.substr(5,2), 16) - parseInt(color1.substr(5,2), 16);
	red = Math.round(red/colnum);
	blue = Math.round(blue/colnum);
	green = Math.round(green/colnum);
	var diff = [red,green,blue];


	for(x = 1; x <= colnum; x++){
		diff = [red*(x-1), green*(x-1), blue*(x-1) ];
		var hold = "col" + x;
		document.getElementById(hold).style.backgroundColor = ColorLuminance(color1,diff);
	}
}




$(document).ready(function(){
	$("li.tab").click(function(){ //switch between admin and account setting content
		$(".uk-tab li").removeClass('uk-active');
		$("li.tab-content").hide();
		$(this).addClass("uk-active");
		var selected_tab = $(this).find("a").attr("href");
		$(selected_tab).fadeIn(100);
		return false;
	});
	$(function(){ //create all of the colors options. 
		var list = '';
		$.each(colors, function(index){
			list+='<option value="' + colors[index] + '"><div><a href></a></div>'+ colors[index].name +'</option>';
		});
		$('#colorSelect').html(list);
	});
	$(function(){ //set the box to the current selected color
		$.each(colors,function(i){
			if($("#colorSelect :selected").text() == colors[i].name){
				$(".colorBox").css("background", "-webkit-linear-gradient(left, "+colors[i].first+" , "+colors[i].last+")");
				$(".colorBox").css("background", "-o-linear-gradient(right, "+colors[i].first+" , "+colors[i].last+")");
				$(".colorBox").css("background", "-moz-linear-gradient(right, "+colors[i].first+" , "+colors[i].last+")");
				$(".colorBox").css("background", "linear-gradient(to right, "+colors[i].first+" , "+colors[i].last+")");
			}
		});
	});

	//open the settings modal
	$("div.settingsModal").click(function(){
		$(this).addClass('uk-open');
		$("html").css("margin-left", "0");
		//document.getElementById('settingsModal').style.display = block;
	});
});
//change the color of the colorbox div upon change
$("#colorSelect").change(function(){
	$(function(){
		$.each(colors,function(i){
			if($("#colorSelect :selected").text() == colors[i].name){
				$(".colorBox").css("background", "-webkit-linear-gradient(left, "+colors[i].first+" , "+colors[i].last+")");
				$(".colorBox").css("background", "-o-linear-gradient(right, "+colors[i].first+" , "+colors[i].last+")");
				$(".colorBox").css("background", "-moz-linear-gradient(right, "+colors[i].first+" , "+colors[i].last+")");
				$(".colorBox").css("background", "linear-gradient(to right, "+colors[i].first+" , "+colors[i].last+")");
			}
		});
	});
});
/*edit card modal color selection-------------------------------------------*/
$('#thumbs').delegate('img', 'click', function() {
    var $this = $(this);
    // Clear formatting
    $('#thumbs img').removeClass('border-highlight');

    // Highlight with coloured border
    $this.addClass('border-highlight');
    
    // Changes the value of the form field "animal" to the file name shown in the image.
    $('[name="animal"]').val( $this.attr('src').substring($this.attr('src').lastIndexOf('/')+1) );
});


/*-----------------------------------------------------------------*/
/*DRAG AND DROP*/
/*
 * HTML5 Sortable jQuery Plugin
 * http://farhadi.ir/projects/html5sortable
 * 
 * Copyright 2012, Ali Farhadi
 * Released under the MIT license.
 */
(function($) {
var dragging, placeholders = $();
$.fn.sortable = function(options) {
	var method = String(options);
	options = $.extend({
		connectWith: false
	}, options);
	return this.each(function() {
		if (/^enable|disable|destroy$/.test(method)) {
			var items = $(this).children($(this).data('items')).attr('draggable', method == 'enable');
			if (method == 'destroy') {
				items.add(this).removeData('connectWith items')
					.off('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
			}
			return;
		}
		var isHandle, index, items = $(this).children(options.items);
		var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="sortable-placeholder">');
		items.find(options.handle).mousedown(function() {
			isHandle = true;
		}).mouseup(function() {
			isHandle = false;
		});
		$(this).data('items', options.items)
		placeholders = placeholders.add(placeholder);
		if (options.connectWith) {
			$(options.connectWith).add(this).data('connectWith', options.connectWith);
		}
		items.attr('draggable', 'true').on('dragstart.h5s', function(e) {
			if (options.handle && !isHandle) {
				return false;
			}
			isHandle = false;
			var dt = e.originalEvent.dataTransfer;
			dt.effectAllowed = 'move';
			dt.setData('Text', 'dummy');
			index = (dragging = $(this)).addClass('sortable-dragging').index();
		}).on('dragend.h5s', function() {
			if (!dragging) {
				return;
			}
			dragging.removeClass('sortable-dragging').show();
			placeholders.detach();
			if (index != dragging.index()) {
				dragging.parent().trigger('sortupdate', {item: dragging});
			}
			dragging = null;
		}).not('a[href], img').on('selectstart.h5s', function() {
			this.dragDrop && this.dragDrop();
			return false;
		}).end().add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function(e) {
			if (!items.is(dragging) && options.connectWith !== $(dragging).parent().data('connectWith')) {
				return true;
			}
			if (e.type == 'drop') {
				e.stopPropagation();
				placeholders.filter(':visible').after(dragging);
				dragging.trigger('dragend.h5s');
				return false;
			}
			e.preventDefault();
			e.originalEvent.dataTransfer.dropEffect = 'move';
			if (items.is(this)) {
				if (options.forcePlaceholderSize) {
					placeholder.height(dragging.outerHeight());
				}
				dragging.hide();
				$(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
				placeholders.not(placeholder).detach();
			} else if (!placeholders.is(this) && !$(this).children(options.items).length) {
				placeholders.detach();
				$(this).append(placeholder);
			}
			return false;
		});
	});
};
})(jQuery);

		$(function() {
			$('.sortable').sortable();
			$('.handles').sortable({
				handle: 'span'
			});
			$('.connected').sortable({
				connectWith: '.connected'
			});
			$('.exclude').sortable({
				items: ':not(.disabled)'
			});
		});





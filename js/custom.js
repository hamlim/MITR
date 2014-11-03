	   
	   
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



function columns(){
	var color1 = "#40543A";
	var color2 = "#8EB283";
	var red = parseInt(color2.substr(1,2), 16) - parseInt(color1.substr(1,2), 16);
	var green = parseInt(color2.substr(3,2), 16) - parseInt(color1.substr(3,2), 16);
	var blue = parseInt(color2.substr(5,2), 16) - parseInt(color1.substr(5,2), 16);
	var colnum = 5;
	red = Math.round(red/colnum);
	blue = Math.round(blue/colnum);
	green = Math.round(green/colnum);
	var diff = [red,green,blue];


	for(x = 1; x <= colnum; x++){
		diff = [red*x, green*x, blue*x ];
		var hold = "col" + x;
		document.getElementById(hold).style.backgroundColor = ColorLuminance(color1,diff);
	}
}

$(document).ready(function(){
	$("li.tab").click(function(){
		$(".uk-tab li").removeClass('uk-active');
		$("li.tab-content").hide();
		$(this).addClass("uk-active");
		var selected_tab = $(this).find("a").attr("href");
		$(selected_tab).fadeIn(100);
		return false;
	}),

	$("div.settingsModal").click(function(){
		$(this).addClass('uk-open');
		$("html").css("margin-left", "0");
		//document.getElementById('settingsModal').style.display = block;
	}),

	$(".colorBox").attr('id', $("#colorSelect :selected").text()),
	
	$("#colorSelect").change(function(){
		$(".colorBox").attr('id', $("#colorSelect :selected").text());
	});
	
});

/*toggle show/hide for activity feed, yo -- don't need this anymore
$('#acttogglebutton').on('click', function() {
    $("#activityfeed").toggleClass('clicked');
});*/


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

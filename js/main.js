/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// In Web APP mode, prevent click from opening in new window

jQuery(document).ready(function($){
	if (("standalone" in window.navigator) && window.navigator.standalone) {
		// For iOS Apps
		$("a").on("click", function(e){
			var new_location = $(this).attr("href");
			if (new_location != undefined && new_location.substr(0, 1) != "#" && new_location!='' && $(this).attr("data-method") == undefined){
				e.preventDefault();
				window.location = new_location;
			}
		});
  }
});
// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle)
{
	window.getComputedStyle = function(el, pseudo)
	{
		this.el = el;
		this.getPropertyValue = function(prop)
		{
			var re = /(\-([a-z]){1})/g;
			if (prop == 'float') prop = 'styleFloat';
			if (re.test(prop))
			{
				prop = prop.replace(re, function()
				{
					return arguments[2].toUpperCase();
				});
			}
			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
		}
		return this;
	}
}

// as the page loads, call these scripts
jQuery(document).ready(function($)
{

/*
	Responsive jQuery is a tricky thing.
	There's a bunch of different ways to handle
	it, so be sure to research and find the one
	that works for you best.
	*/

	/* getting viewport width */
	var responsive_viewport = $(window).width();

	/* if is above or equal to 768px */
/*
	if (responsive_viewport >= 768)
	{
*/
		// SLIDEPANEL
		var sidePanel = $('#karoo-panelmenu'),
			layout = $('#layout');

		$(document).on("click touchend", "#karoo-toggle", function(e)
		{
			if(responsive_viewport>767){
				e.preventDefault();
				layout.toggleClass('active');
				return false;
			}
		});
		// clickoutside closes panel
		sidePanel.bind('clickoutside touchendoutside', function(event)
		{
			if (layout.hasClass('active') && $(event.target).attr('id') !== 'karoo-toggle' && $(event.target).attr('id') !== 'k-letter-logo')
			{
				layout.removeClass('active');
			}
		});


		// GENERATIVE ART
		

		if($('#gfx').length){
			var article = $('body.single article:first');
			new Grapher(
			{
			    amount: article.data("author-article-amount"),
			    category: article.data("category-color"),
			    wordcount: article.data("article-wordcount"),
			    type: article.data("article-type"),
			    age: article.data("article-publication-date"),
			    width: $(window).width(),
			    height: $(window).height(),
			    line: "interview",
			    circle: "critique",
			    square: "magazine",
			    opacity: 1,
			    //random or int
			    opacityStrength: '1',
			    //only if opacity random
			    stroke: false
			});
		}
//	}
/*******************************************
	// SOCIAL NETWORKS
*******************************************/
	$('#recommendation').share({icon: 'thumbs-up', button_text: 'Recommander'});

	// Size the Facebook comments to the page's full width.


}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w)
{
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1))
	{
		return;
	}
	var doc = w.document;
	if (!doc.querySelector)
	{
		return;
	}
	var meta = doc.querySelector("meta[name=viewport]"),
		initialContent = meta && meta.getAttribute("content"),
		disabledZoom = initialContent + ",maximum-scale=1",
		enabledZoom = initialContent + ",maximum-scale=10",
		enabled = true,
		x, y, z, aig;
	if (!meta)
	{
		return;
	}

	function restoreZoom()
	{
		meta.setAttribute("content", enabledZoom);
		enabled = true;
	}

	function disableZoom()
	{
		meta.setAttribute("content", disabledZoom);
		enabled = false;
	}

	function checkTilt(e)
	{
		aig = e.accelerationIncludingGravity;
		x = Math.abs(aig.x);
		y = Math.abs(aig.y);
		z = Math.abs(aig.z);
		// If portrait orientation and in one of the danger zones
		if (!w.orientation && (x > 7 || ((z > 6 && y < 8 || z < 8 && y > 6) && x > 5)))
		{
			if (enabled)
			{
				disableZoom();
			}
		}
		else if (!enabled)
		{
			restoreZoom();
		}
	}
	w.addEventListener("orientationchange", restoreZoom, false);
	w.addEventListener("devicemotion", checkTilt, false);
})(this);
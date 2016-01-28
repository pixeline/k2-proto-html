// @codekit-prepend "jquery.min.2.2.0.js", "_grapher.js","_headroom.min.js","_jQuery.headroom.min.js", "_jquery.tooltipster.min.js", "_venobox.min.js";
/* BONES */
// In Web APP mode, prevent click from opening in new window
jQuery(document).ready(function($) {
	if (("standalone" in window.navigator) && window.navigator.standalone) {
		// For iOS Apps
		$("a").on("click", function(e) {
			var new_location = $(this).attr("href");
			if (new_location !== undefined && new_location.substr(0, 1) !== "#" && new_location !== '' && $(this).attr("data-method") === undefined) {
				e.preventDefault();
				window.location = new_location;
			}
		});
	}
	$('html').addClass('js');
	// Single Article
	if ($('body.single-post').length) {
		var article = $('body.single-post article:first');
		var colour = article.data("category-color");
		// Progress indicator
		var $progress_indicator = $('.progress-indicator').css('background', colour);
		var $w = $(window);
		var wh = $w.height();
		var h = $(document).height();
		var sHeight = h - wh;
		$w.on('scroll', function() {
			var perc = Math.max(0, Math.min(1, $w.scrollTop() / sHeight));
			$progress_indicator.css({
				width: perc * 100 + '%'
			});
		});
		// GENERATIVE ART
		if ($('canvas').length) {
			new Grapher({
				amount: article.data("author-article-amount"),
				category: colour,
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
		// Headroom
		$("#js-site-header").headroom({
			// vertical offset in px before element is first unpinned
			"offset": -5,
			// scroll tolerance in px before state changes
			"tolerance": 5,
			// css classes to apply
			"classes": {
				// when element is initialised
				initial: "headroom--small",
				// when scrolling up
				pinned: "headroom--big",
				// when scrolling down
				unpinned: "headroom--small",
				// when above offset
				top: "headroom--small",
				// when below offset
				notTop: "headroom--small"
			}
		});
		// Tooltips
		// http://iamceege.github.io/tooltipster/#demos
		$('.popup').tooltipster({
			contentAsHTML: true,
			animation: 'fade',
			// slide, fall, swing, fade
			iconTouch: true,
			interactive: true,
			interactiveTolerance: 400,
		});
		// Modal windows
		/* custom settings */
		$("[href*='jpg'],[href*='jpeg'],[href*='png'],[href*='gif']").attr('data-gall', 'myGallery').addClass('image-modal-icon').venobox({
			numeratio: true
		});
		// Fix underlines of hyperlinks in post-content
		$('.post-content a:not(.image-modal-icon').addClass('underline');
		
		// Show Comments button
		$('#js-comments-zone').hide();
		$('#js-show-comments-button').on('submit click',function(){
			$(this).find('i').addClass('fa fa-circle-o-notch fa-spin');
			$('#js-comments-zone').slideDown('slow', function(){
				$('#js-show-comments-button').fadeOut();
			});
		});
		
		// Hide prev-next-links-wrapper  if document is beyond the article.
		
		var vertical_limit =  Math.round($('#js-finished-reading').offset().top + ($(window).height()/3));
		$(window).scroll(function () {
			var scroll = $(window).scrollTop() + $(window).height();
			if(scroll>vertical_limit){
				$('#js-prev-next-links-wrapper').addClass('hidden');
			}else{
				$('#js-prev-next-links-wrapper.hidden').removeClass('hidden');
			}
		});
		
		//*********************
		// END Single-post
	}
});
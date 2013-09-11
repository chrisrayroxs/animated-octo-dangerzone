//////////////////////////
//SIMPLE JAVASCRIPT MODULE
//////////////////////////

define([
	'jquery'
	], function($) {

	var module = {

		initialize: function() {

			var self = this;

			$('body').flowtype({
			 fontRatio : 55,
			 lineRatio : 1.75
			});

			// resize window will close leftnav if it is open
			window.onresize = function(event) {
				self.closeleftNav();
			}

			// close left nav
			$('#closeLeftNav').click(function () {
				self.closeleftNav();
			});

			// open left nav
			$('#openLeftNav').mouseover(function () {
				self.openleftNav();
			});


		},
		closeleftNav: function() {
			// show menu when user hovers over left side panel#leftNavTrigger
			$('.hiddenMenu').animate({
				left: '-=10%'
			}, 300, function() {
				// Animation complete.
				}
			);
		},
		openleftNav: function() {
			// show menu when user hovers over left side panel#leftNavTrigger
			$('.hiddenMenu').animate({
				left: '+=10%'
			}, 300, function() {
				// Animation complete.
				}
			);
		}

	};
	return module;
});
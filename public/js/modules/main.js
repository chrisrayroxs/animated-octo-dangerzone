//////////////////////////
//SIMPLE JAVASCRIPT MODULE
//////////////////////////

define([
	'jquery'
	], function($) {

	var module = {

		initialize: function() {

			document.addEventListener('DOMComponentsLoaded', function(){
				// run code on brick UI elements here...
				var xElement = document.getElementById('.x-flipbox');
				console.log('hello from a javascript module, inside of an addEventListener("DOMComponentsLoaded") function', xElement);

				xElement.addEventListener('click', function(){
					flipBox.toggle();
				});

			});

			console.log('running in main');



		}

	};
	return module;
});
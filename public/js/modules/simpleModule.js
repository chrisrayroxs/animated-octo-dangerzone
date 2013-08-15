//////////////////////////
//SIMPLE JAVASCRIPT MODULE
//////////////////////////

define([
	'jquery',
	'hogan',
	'configs/test_config.js',
	'text!category_template.tpl',
	'bootstrap-datepicker',
	'jquery.reveal',
	'jquery-ui'], function($, hogan, config, template, datepicker) {

	var module = {

		initialize: function() {
			//
			//module code here
			console.log('hello from a javascript module');

			//REFERENCES:

			//date picker
			$('.element').datepicker({
				format: 'mm-dd-yyyy'
			});
		}

	};
	return module;
});
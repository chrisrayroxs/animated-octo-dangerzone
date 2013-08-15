///////////////////////////////
//CATEGORY TRIGGERS MODULE
///////////////////////////////

define([], function() {

	var module = {

		initialize: function() {

			module.setTriggers();
			
		},

		//set jquery event listeners
		setTriggers: function() {

			//set height of canvas relative to height of user's screen
			$('#design').css('height', ($(window).height() - 200));

			//user can click button or hit enter on searchbar to load new category
			$('#render').click(function() {
				$('#fsscSearch').css('background', '#C7EDD1');
				module.switchFSSC();
			});
			$('#fsscSearch').keypress(function(e) {

				if (e.keyCode == 13) {
					$('#fsscSearch').css('background', '#C7EDD1');
					module.switchFSSC();
				}
				
			});

			//keep form submission from reloading page
			$("form").submit(function() {
				return false;
			});

			//add integrated content button
			$('#createIC').click(function() {
				module.createIntegratedContent();
			});

			$('#createFeature').click(function() {
				module.createFeature();
			});

			$('#deleteElement').click(function() {
				console.log('did i got here?');
				module.designBoard.deleteElement();
			});

			$('#modalButton').click(function(e) {

				var list, i;

				$('#modal').show();
				$('#modal').reveal({
					animation: 'fade',
					animationspeed: 300,
					closeonbackgroundclick: true,
					dismissmodalclass: 'close'
				});
				
				module.populateFSSCCounter();

				return false;

			});

			//toggle yes or no for creating new FSSC code
			$('#createFSSC').click(function() {

				$('#fsscConfirmation').toggle('fast');

			});

			//user creates a new fssc code
			$('#createFSSC_y').click(function() {

				var newFSSC = $('#fsscAdd').val();

				module.fsscList.push(newFSSC);

				module.populateFSSCCounter();

				module.loadSearchBar();

				$('#fsscConfirmation').toggle('fast');

			});

			//user declines to create fssc code
			$('#createFSSC_n').click(function() {

				$('#fsscConfirmation').toggle('fast');
				$('#fsscAdd').val('');

			});

			//clear design board
			$('#clearBoard').click(function() {

				var r=confirm("Are you sure you want to clear the board?");

				if (r==true) {
					$('#design').html('');
				}

			});

			//undo last design board edit
			$('#undo').click(function() {

				//
				alert('cannot undo');

			});

			//enable/disable a feature
			$('#enabled').click(function() {

				if($(this).hasClass('btn-success')) {
					console.log('one');
					$(this).removeClass('btn-success').addClass('btn-inverse').html('This Feature is Disabled');
					enabled = false;
				}
				else {
					console.log('true');
					$(this).removeClass('btn-inverse').addClass('btn-success').html('This Feature is Enabled');
					enabled = true;
				}

			});

		}
	};
	return module;
});
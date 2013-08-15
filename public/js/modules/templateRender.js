///////////////////////////////
//TEMPLATE RENDERING MODULE
///////////////////////////////

define([
	'jquery',
	'hogan',
	'configs/test_config.js',
	'text!category_template.tpl',
	'bootstrap-datepicker',
	'jquery.reveal',
	'jquery-ui'], function($, hogan, config, template, datepicker) {

	var module = {

		config: config,
		template: template,
		currentElement: {},
		currentElementIndex: 0,
		currentFSSC: [],
		elementIndex: 0,
		saveIndex: 0,
		dataObj: config,
		undoStack: [],
		fsscList: [],
		featureObj: {},

		initialize: function() {

			$(document).ready(function() {

				//set element index from config
				module.elementIndex = module.config.categories.length;

				//set event listeners
				module.setTriggers();

				//populate FSSC list for rest of module
				module.populateFSSCList();

			});
		},

		//fill running FSSC array with current values from config
		populateFSSCList: function() {

			var name, i;
			for (i = 0; i < module.config.categories.length; i++) {
				name = module.config.categories[i].fssc;
				module.fsscList.push(name);
			}

			//load fssc codes into search bar
			module.loadSearchBar();

		},

		//fill category fssc search bar with values
		loadSearchBar: function() {

			//fill out auto-searchbar with values from config
			$("#fsscSearch").autocomplete({
				source: module.fsscList
			});

		},

		//fetch data and render category feature to design board
		renderCatFeature: function(i) {

			//render selected config item with template
			// var buffer = Hogan.compile(module.template).render({
			// categories: module.config.categories[i]
			// });

			var catFeature = module.config.categories[i];

			var markup = '<div id="categoryFeatureSpot" class="catFeature ' + catFeature.feature.gridDimensions + ' ' + catFeature.fssc + '" data-position="' + catFeature.feature.dataPosition +
				'" width="' + module.returnDemensions(catFeature.feature.dataSize, 'width') + '" height="' + module.returnDemensions(catFeature.feature.dataSize, 'height') + '" data-index="' + i + '"><a data-href="' + catFeature.feature.link + '"><img src="' + catFeature.feature.img + '" usemap="' + catFeature.feature.useMap + '" /></a></div>';

			//append to design board
			$("#board").append(markup);

			//apply draggable and moveable to new object
			module.animate(catFeature, '.catFeature', 180);

			//store reference
			//module.data.store(1, catFeature);

		},

		//create an feature content piece and add it to design board
		createFeature: function() {

			//check if there's already a feature spot on the designboard
			//config file only supports one feature
			if (!$('#categoryFeatureSpot')[0]) {

				//create default attributes for new feature

				var config = {};
				config.fssc = 'newFeature';

				var catFeature = module.new.feature(config);

				console.log(catFeature);

				var markup = '<div id="categoryFeatureSpot" class="catFeature ' + catFeature.feature.gridDimensions + ' ' + catFeature.fssc + '" data-position="' + catFeature.feature.dataPosition + '" data-size="' + catFeature.feature.dataSize +
					'" data-index="' + module.elementIndex + '"><a data-href="' + catFeature.feature.link + '"><img src="' + catFeature.feature.img +
					'" usemap="' + catFeature.feature.useMap + '" /></a></div>';

				//append to design board
				$("#board").append(markup);
				$('.catFeature').show('fast');

				//apply draggable and moveable to new object
				module.animate(catFeature, '.catFeature', 180);

				//store reference
				module.data.store(1, catFeature);

				//save designboard after addition
				module.undo.saveDesignBoard();

				module.elementIndex++;

			} else {

				alert("There's already a feature spot on the design board! Please delete it before adding another.");

			}

		},

		//create an integrated content piece and add it to design board
		createIntegratedContent: function() {

			//render selected config item with template
			// var buffer = Hogan.compile(module.template).render({
			// categories: module.config.categories[i]
			// });

			//create default attributes for new IC
			var integratedContent = {};
			integratedContent.type = 'integratedContent',
			integratedContent.index = 0,
			integratedContent.gridDimensions = 'grid1x1';
			integratedContent.dataPosition = '0_0';
			integratedContent.dataSize = '1_1';

			var markup = '<div id="integratedContentSpot" class="ICtemp catFeature intContent ' + integratedContent.gridDimensions + '" data-position="' + integratedContent.dataPosition +
				'" data-size="' + integratedContent.dataSize + '" data-index="' + module.elementIndex + '"></div>';

			//append to design board
			$("#board").append(markup);
			$('.intContent').fadeIn('fast');

			//apply draggable and moveable to new object
			module.animate(integratedContent, '.intContent', 180);

			//store reference
			module.data.store(2, integratedContent);

			//save designboard after addition
			module.undo.saveDesignBoard();

			module.elementIndex++;

		},

		//find index of a given search term from a given object
		arrayObjectIndexOf: function(obj, searchTerm) {
			//find index of search term from a given array of objects

			try {
				for (i = 0; i < obj.categories.length; i++) {

					if (obj.categories[i]['fssc'].indexOf(searchTerm) === 0) {
						// console.info(obj.categories[i]['fssc'].indexOf(searchTerm));
						return i;
					}
				}
			} catch (e) {
				console.dir('could not find object index');
				console.info(e);
			}
		},

		//quick method to rewrite image paths to make them viewable from browser
		fixLocalPath: function(domain, img) {

			return (domain + img);

		},

		//load new category feature
		switchFSSC: function() {

			var index, image, newFSSC;

			//fade out and clear design canvas
			// $('#board').fadeOut('fast');
			$('#board').html('');

			//get index of selected FSSC in config
			index = module.arrayObjectIndexOf(module.config, $('#fsscSearch').val());

			//render feature
			module.renderCatFeature(index);

			//set global fssc attributes for other methods to have easy access to

			//fix image paths since we're not in the fossil asset scope
			// this will be done to the config reference since we don't want to corrupt config values
			//module.fixLocalPath('http://www.fossil.com', module.config.categories[index].feature.img);

			// $('#board').fadeIn('fast');
		},

		//popuates FSSC bucket list with running list of values
		populateModalFSSCList: function() {

			$('.fsscList').html('');

			for (i = 0; i < module.fsscList.length; i++) {

				list = '<li>' + module.fsscList[i] + '<i id="remove" class="icon-remove"></i></li>';
				$('.fsscList').append(list);

			}

			//remove FSSC code for which the delete button was clicked
			$('.icon-remove').click(function() {

				var i, searchTerm = $(this).parent().text();

				for (i = module.fsscList.length - 1; i >= 0; i--) {
					if (module.fsscList[i] === searchTerm) {
						module.fsscList.splice(i, 1);
						// break;       //<-- Uncomment  if only the first term has to be removed
					}
				}

				$(this).parent().remove();

			});

		},

		//apply animations a newly created feature
		animate: function(designObj, identifier, snapLimit) {

			try {

				$(identifier).draggable({

					grid: [snapLimit, snapLimit],
					containment: 'parent',
					opacity: 0.5,

					stop: function() {
						module.undo.saveDesignBoard();
					}

				}).resizable({

					grid: snapLimit,
					containment: "parent",

					stop: function() {
						module.undo.saveDesignBoard();
					}

				});

				//design element selection animation
				$('#board div').click(function() {

					module.designBoard.click($(this));

				}).dblclick(function() {
					module.designBoard.deselect($(this));
				});

				$('#board div').keyup(function(e) {

					$(this).remove();

				})


			} catch (e) {

				console.info('could not apply animations to feature');
				console.info(e);

			}
		},

		//all actions associated with interacting with the design board
		designBoard: {

			click: function(element) {

				// event.target.className

				var currentId = element.attr('id');
				module.currentElementIndex = element.attr('data-index');

				if (currentId === 'categoryFeatureSpot') {

					//show selection transform & and fill attributes panel 
					module.designBoard.selectElement(element);
					module.designBoard.loadAttributes();

				} else if (currentId === 'integratedContentSpot') {

					//show selection transform & and fill attributes panel
					module.designBoard.selectElement(element);
					module.designBoard.loadAttributes();

				}
			},
			deselect: function(element) {

				element.css('opacity', '.6');

				delete module.currentElement;
				module.currentElement = 0;

				//diable delete tool now that no element is selected
				$('#deleteElement, #modalConfigButton, #addMapButton').prop("disabled", true);

				$('').prop("disabled", true);

			},
			selectElement: function(element) {

				$('#board div').css('opacity', '.6');
				// .width('-=4').height('-=4')
				element.css('opacity', '1');

				module.currentElement = element;

				console.info(module.currentElement);

				//enable delete tool now that an element is selected
				$('#deleteElement, #modalConfigButton, #addMapButton').prop("disabled", false);

			},
			deleteElement: function() {

				module.currentElement.remove();

				//diable delete tool now that no element is selected
				$('#deleteElement, #modalConfigButton, #addMapButton').prop("disabled", true);

			},
			loadAttributes: function() {

				//fill attribute values
				$('#cat_fssc').html(module.config.categories[module.currentElementIndex].fssc);
				$('#cat_link').val(module.config.categories[module.currentElementIndex].feature.link);
				$('#cat_img').val(module.config.categories[module.currentElementIndex].feature.img);
			}

		},

		// config reference data interactions handler
		data: {

			store: function(type, designObj) {

				var found = false,
					where = 0;

				//store feature
				switch (type) {
					case 1:

						//check if this feature object we are trying to add 
						////already exists in data object
						for (var i = 0; i < module.elementIndex; i++) {

							if (module.dataObj.categories[i].fssc === designObj.fssc) {

								where = i;
								found = true;

								break;
							}
						}

						if (found) {

							alert("Cannot override existing FSSC Code.");

							return 0;

						}

						//if not, then create it
						else {

							//track reference to design board objects
							designObj.index = module.elementIndex;

							//merge new feature object with running data object
							module.dataObj.categories.push(designObj);

							return 1;

						}
						break;

					case 2:

						console.log('saving brand spot');

						break;

					default:
						console.log('Problem: could not find data save type.');
				}

			},
			recall: function(element) {

				//return data for given element
				var dataIndex = element.attr('data-index');
				return module.dataObj.categories[dataIndex];

			},
			delete: function(index) {

				//delete given data

				delete module.dataObj.categories[index];

			},
			export: function() {


				$.ajax({
					type: 'POST',
					dataType: 'json',
					url: 'category',
					data: module.dataObj,
					beforeSend: function() {
						//nothing
					},
					success: function(msg) {
						console.log('Response: ', msg);
					},
					error: function(xhr, ajaxOptions, thrownError) {
						console.log(xhr.status);
						console.log(thrownError);
					}
				});

				module.helpMessage.push('<span class="saveNotice">Saved.</span>');


			}
		},

		new: {
			feature: function(config) {

				//define presets
				var feature = {
					fssc: 'placeholder',
					countries: ['US'],
					viewType: 1,
					feature: {
						gridDimensions: 'grid1x1',
						dataPosition: '0_0',
						dataSize: '1_1',
						link: 'placeholder',
						img: 'placeholder',
						useMap: false,
						useFeature: true,
						integratedContent: false,
						image_map: {
							map: {
								map_type: 'poly',
								data_sku: null,
								data_tag: null,
								coords: '0'
							},
							mapSmall: {
								map_type: 'poly',
								data_sku: null,
								data_tag: null,
								coords: '0'
							}
						}
					}
				};

				//fill values sent with function call
				if (config.fssc) {
					feature.fssc = config.fssc;
				}

				if (config.countries) {
					feature.countries = config.countries;
				}

				if (config.viewType) {
					feature.viewType = config.viewType;
				}

				if (config.feature) {
					feature.feature = config.feature;
				}

				if (config.gridDimensions) {
					feature.feature.gridDimensions = config.feature.gridDimensions;
				}

				if (config.dataPosition) {
					feature.feature.dataPosition = config.feature.dataPosition;
				}

				if (config.dataSize) {
					feature.feature.dataSize = config.feature.dataSize;
				}

				if (config.link) {
					feature.feature.link = config.feature.link;
				}

				if (config.img) {
					feature.feature.img = config.feature.img;
				}

				if (config.useMap) {
					feature.feature.useMap = config.feature.useMap;
				}

				if (config.useFeature) {
					feature.feature.useFeature = config.feature.useFeature;
				}

				if (config.integratedContent) {
					feature.feature.integratedContent = config.feature.integratedContent;
				}

				if (config.image_map) {
					feature.feature.image_map = config.feature.image_map;
				}

				return feature;
			}
		},

		undo: {

			//save current designboard configuration			
			saveDesignBoard: function() {

				var properties = {};

				$('.catFeature').each(function(index) {

					//get designboard data
					properties.Fposition = $(this).position();
					properties.Fwidth = $(this).width();
					properties.Fheight = $(this).height();
					properties.Findex = $(this).data('index');

					module.updateElementPosition(properties.Fposition, properties.Fwidth, properties.Fheight, properties.Findex);

				});


				// if ($('#integratedContentSpot')[0]) {

				// 	$('#integratedContentSpot').each(function(index) {

				// 		//get designboard data
				// 		properties.Iposition = $(this).position();
				// 		properties.Iwidth = $(this).width();
				// 		properties.Iheight = $(this).height();

				// 		module.updateElementPosition(properties.Iposition,properties.Iwidth,properties.Iheight, properties.Iindex );

				// 	});
				// }

				// module.undoStack[module.saveIndex] = properties;

				// console.info('saved:', properties);

				// module.saveIndex++;


			}
		},

		updateConfig: function(index, type, value) {

			//
			var config = module.config;

			switch (type) {
				case 'fssc':

					config.categories[index].fssc = value;

					break;

				case 'countries':

					var countryList = config.categories[index].countries + ' ' + value;
					config.categories[index].countries = '';
					config.categories[index].countries = config.categories[index].countries + ' ' + value;

					break;

				case 'viewType':

					config.categories[index].viewType = value;

					break;

				case 'gridDimensions':

					config.categories[index].feature.gridDimensions = value;

					break;

				case 'dataPosition':

					config.categories[index].feature.dataPosition = value;

					break;

				case 'link':

					config.categories[index].feature.link = value;

					break;

				case 'img':

					config.categories[index].feature.img = value;

					break;

				case 'useMap':

					config.categories[index].feature.useMap = value;

					break;

				case 'useFeature':

					config.categories[index].feature.useFeature = value;

					break;

				case 'integratedContent':

					config.categories[index].feature.integratedContent = value;

					break;
					//need to add image maps as well

				default:
					console.log('Problem: could not find data pair type. Did you send me a valid config type?');
			}

		},

		addCountry: function(newCountry) {

			var currentCountries = config.categories[index].countries,
			exists = false;

			for( var i = 0; i < currentCountries.length; i++ ) {

				if(currentCountries[i] === newCountry) {

					exists = true;
					break;

				}
			}
console.log('never made it here');
			if (!exists) {

				currentCountries.push(newCountry);
				console.log('adding country: ', currentCountries);
				module.updateConfig(module.currentElementIndex, 'country', currentCountries);

			}

		},

		// config reference data interactions handler
		helpMessage: {

			push: function(message) {

				//push UI help messages to the DOM
				$('.helpBox').animate({
					'opacity': 0
				}, 200, function() {
					$(this).html(message);
				}).animate({
					'opacity': .5
				}, 200);

			}

		},

		updateElementPosition: function(position, width, height, index) {

			// console.log(offsetLeft/180, offsetTop/180);

			console.log(position.left, index);


			// module.updateConfig( , 'fssc', $('#cat_fssc').val() );

			// var yposition = offsetTop/180,
			// xposition = offsetLeft/180;


			// $('#yposition').text(yposition);
			// $('#xposition').text(xposition);

		},

		returnDemensions: function(value, type) {

			//
			switch (type) {
				case 'width':

					//
					// var width = (value.split('_', 1) * 180) + 'px';
					// console.log(width);
					// return width;

				case 'height':

					//
					// var height = (value.split(/[_]+/).pop() * 180) + 'px';
					// console.log(height);
					// return height;

			}

		},

		//set jquery event listeners
		setTriggers: function() {

			//set height of canvas relative to height of user's screen
			$('#design').css('height', ($(window).height() - 100));

			//user can click button or hit enter on searchbar to load new category
			$('#render').click(function() {
				$('#fsscSearch').css('background', '#C7EDD1');
				module.switchFSSC();

				//clear top message now that user has interacted with the fssc finder
				module.helpMessage.push(' ');

			});
			$('#fsscSearch').keypress(function(e) {

				if (e.keyCode == 13) {
					$('#fsscSearch').css('background', '#C7EDD1');
					module.switchFSSC();

					//clear top message now that user has interacted with the fssc finder
					module.helpMessage.push(' ');
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
				module.designBoard.deleteElement();
			});

			$('#modalFSSCButton').click(function(e) {

				var list, i;

				$('#modalFSSC').show();
				$('#modalFSSC').reveal({
					animation: 'fade',
					animationspeed: 300,
					closeonbackgroundclick: true,
					dismissmodalclass: 'close'
				});

				module.populateModalFSSCList();

				return false;

			});

			$('#modalConfigButton').click(function(e) {

				var list, i;

				$('#modalConfig').show();
				$('#modalConfig').reveal({
					animation: 'fade',
					animationspeed: 300,
					closeonbackgroundclick: true,
					dismissmodalclass: 'close'
				});

				module.populateModalFSSCList();

				return false;

			});

			$('#addMapButton').click(function(e) {

				var list, i;

				$('#modalAddMap').show();
				$('#modalAddMap').reveal({
					animation: 'fade',
					animationspeed: 300,
					closeonbackgroundclick: true,
					dismissmodalclass: 'close'
				});

				module.populateModalFSSCList();

				return false;

			});

			//toggle yes or no for creating new FSSC code
			$('#createFSSC').click(function() {

				if ($('#fsscAdd').val()) {

					//dont toggle unless there is input to parse
					$('#fsscConfirmation').toggle('fast');

				}

			});

			//user creates a new fssc code
			$('#createFSSC_y').click(function() {

				var newFSSC = $('#fsscAdd').val();

				//dont toggle unless there is input to parse
				if ($('#fsscAdd').val()) {

					//create new feature object with data we received
					var config = {};
					config.fssc = newFSSC;
					var catFeature = module.new.feature(config);

					//save the object to data stack
					var duplicate = module.data.store(1, catFeature);

					if (duplicate) {

						//add fssc to running fssc list
						module.fsscList.push(newFSSC);

						//populate UI with the new information
						$('#fsscAdd').val('');
						$('#fsscConfirmation').toggle('fast');

						module.populateModalFSSCList();
						module.loadSearchBar();

						//increment running element counter 
						module.elementIndex++;

					} else {

						//reset
						$('#fsscAdd').val('');
						$('#fsscConfirmation').toggle('fast');

					}


				}

			});

			//user declines to create fssc code
			$('#createFSSC_n').click(function() {

				$('#fsscConfirmation').toggle('fast');
				$('#fsscAdd').val('');

			});

			//clear design board
			$('#clearBoard').click(function() {

				var r = confirm("Are you sure you want to clear the board?");

				if (r == true) {
					$('#board').html('');
				}

			});

			//undo last design board edit
			$('#undo').click(function() {

				//
				alert('cannot undo');

			});

			//enable/disable a feature
			$('#enabled').click(function() {

				if ($(this).hasClass('btn-success')) {
					$(this).removeClass('btn-success').addClass('btn-inverse').html('Disabled');
					enabled = false;
				} else {
					$(this).removeClass('btn-inverse').addClass('btn-success').html('Enabled');
					enabled = true;
				}

			});

			$('#export').click(function() {

				//export user's new config file to server for file writing
				module.data.export();

			});

			$('#saveCatConf').click(function() {

				var newImage = $('#cat_img').val();

				//save new values from user modal
				module.updateConfig(module.currentElementIndex, 'fssc', $('#cat_fssc').val());
				module.updateConfig(module.currentElementIndex, 'link', $('#cat_link').val());
				module.updateConfig(module.currentElementIndex, 'img', $('#cat_img').val());

				//check if they added an image reference to fossil
				if (newImage.charAt(0) === '/') {
					newImage = module.fixLocalPath('http://www.fossil.com', newImage)
				}

				module.currentElement.find('img').attr("src", newImage)

				$('#configUpdate').toggle('slow');

				//fix this later
				var hideMessage = $('#configUpdate').toggle('slow');

				window.setTimeout(hideMessage, 4000);

				//close modal
				// jQuery.event.trigger({ type : 'keypress', which : 27 });

			});

			//country button functionality
			$('.badge').click(function() {

				if ($(this).hasClass('badge-success')) {
					$(this).removeClass('badge-success').addClass('badge-inverse');
					enabled = false;
				} else {
					$(this).removeClass('badge-inverse').addClass('badge-success');
					enabled = true;
				}

				countryClicked = $(this).attr('class').split(' ');
				console.log(countryClicked);

				switch (countryClicked) {
					case 'us':
						module.addCountry(countryClicked);
						break;

					case 'de':
						module.addCountry(countryClicked);
						break;

					case 'uk':
						module.addCountry(countryClicked);
						break;

					case 'gl':
						module.addCountry(countryClicked);
						break;

					case 'fr':
						module.addCountry(countryClicked);
						break;

					case 'it':
						module.addCountry(countryClicked);
						break;

					case 'au':
						module.addCountry(countryClicked);
						break;

					case 'za':
						module.addCountry(countryClicked);
						break;

					case 'nl':
						module.addCountry(countryClicked);
						break;

					case 'cn':
						module.addCountry(countryClicked);

						break;

					case 'jp':
						module.addCountry(countryClicked);
						break;

					case 'kr':
						module.addCountry(countryClicked);
						break;
					}
				});

			$('.viewAll').click(function() {

				//subcat
				$('.catSelector').html('VIEWALL');

				if(!($(this).hasClass('selected'))) {

					$(this).addClass('selected');

				}
				$('.subcat').removeClass('selected');

			});

			$('.subcat').click(function() {

				//subcat
				$('.catSelector').html('SUBCAT');

				if(!($(this).hasClass('selected'))) {

					$(this).addClass('selected');

				}

				$('.viewAll').removeClass('selected');
				
			});
			
			$('#mapPoly').click(function() {

				//
				if(!($(this).hasClass('selected'))) {

					$(this).addClass('selected');

				}
				$('#mapRect, #mapDelete').removeClass('selected');

			});
			$('#mapRect').click(function() {

				//
				if(!($(this).hasClass('selected'))) {

					$(this).addClass('selected');

				}
				$('#mapPoly, #mapDelete').removeClass('selected');
				
			});
			$('#mapDelete').click(function() {

				//
				if(!($(this).hasClass('selected'))) {

					$(this).addClass('selected');

				}
				$('#mapRect, #mapPoly').removeClass('selected');
				
			});


			$(document).ready(function() {

				//push welcome message when designboard loads

				function welcomeMessage() {
					module.helpMessage.push('select a category FSSC from the big search to get started');
				}

				setTimeout(welcomeMessage, 1000);

				//init date picker calendars in toolbar
				$('#dp1').datepicker({
					format: 'mm-dd-yyyy'
				});
				$('#dp2').datepicker({
					format: 'mm-dd-yyyy'
				});

			});

			//ADD MORE HERE

			}

		};
		return module;
	});
  ///////////////////////////////
  //MAIN.JS FILE FOR REQUIRE.JS
  ///////////////////////////////


//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'js/modules',
    paths: {
        app: '../app'
    }
});

require(["simpleModule"], function(templateRender) {

    //get page ready for template selection
    templateRender.initialize();

});
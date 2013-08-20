//require init module

requirejs.config({
    baseUrl: 'js/modules',
    paths: {
        app: '../app'
    }
});

require(['main'], function(main) {

    //get page ready for template selection
    main.initialize();

});
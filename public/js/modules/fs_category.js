define(['jquery', 'category_config'],
        function($, config) {
    var Application = new Class({
        initialize: function() {
          console.log("in init");
            $(document).ready(function() {
              console.log("in ready");
              $(function() {
                  $( "#draggable" ).draggable({ grid: [ 175,175 ]}, {
                    containment: "parent"
                  } ).resizable({
                  grid: 175,
                  containment: "parent"
                });
                });
                $("#next").click(function(){
                  $("#director").fadeOut(function(){
                    $("#design").fadeIn();
                  });
                });
                $('#fsscSearch').keypress(function (e) {
                if (e.keyCode == 13) {
                  $("#director").fadeOut(function(){
                    $("#design").fadeIn();
                  });
                }
              });
                //$(".fssc_selection").multiselect().multiselectfilter();

                //select finder autocomplete
                require('../public/js/test/category_config.js',
                function(config){
                  config = config.categories;
              
                  $( "#fsscSearch" ).autocomplete({
                    source: config
                  }); 
                  console.log("config: ", config);
                }); //end require callback
        });
        }
    });
 
    // no need to return actual Application, instead
    // we can return a nice func instantiating and
    // hence running it
    // btw you can eliminate the class if you really want to
    return {
        run: function() {
            new Application();
        }
    };
});
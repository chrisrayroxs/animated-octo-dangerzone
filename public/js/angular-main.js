//////////////////////////
//ANGULAR MODULE
//////////////////////////

var app = angular.module('myApp', []);

app.run(function($rootScope) {
  $rootScope.name = "Ari Lerner";
});

app.controller('MyController', function($scope) {
  $scope.person = {
    name: 'fuck this guy -> Ari Lerner, I am <u>Christopher Reynolds</u> BITCH. ps i hate when people put their name all up in example codes'
  };
});
'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'allston.filters',
  'allston.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/numerical', {templateUrl: 'partials/numerical.html', controller: 'ControllerNumericalApp'});
  $routeProvider.otherwise({redirectTo: '/numerical'});
}]);

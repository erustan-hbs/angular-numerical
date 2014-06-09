'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('ControllerNumericalApp', ['$scope', function($scope) {

    //local scope variables.
    $scope.numerical1 = 1234567890.0123456;
    $scope.filter1 = 9876543210.654321;

}]);
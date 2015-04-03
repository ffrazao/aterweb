'use strict';

/**
 * @ngdoc function
 * @name aterwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aterwebApp
 */
angular.module('aterwebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

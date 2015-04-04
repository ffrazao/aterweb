'use strict';

/**
* @ngdoc overview
* @name aterwebApp
* @description
* # aterwebApp
*
* Main module of the application.
*/

var aterwebApp = angular.module('aterwebApp', [
	'ngAnimate',
	'ngCookies',
	'ngMessages',
	'ngResource',
	'ngSanitize',
	'ngTouch',
	'ui.router',
	'ui.bootstrap'
]);

// ajustar o router da aplicação
aterwebApp.config(function($stateProvider, $urlRouterProvider ) {
	//
	// For any unmatched url, redirect to /about
	$urlRouterProvider.otherwise('/about');
	//
	// Now set up the states
	$stateProvider
	.state('about', {
		url: '/about',
		templateUrl: 'views/about.html'
	})

	.state('about.list', {
		url: '/list',
		templateUrl: 'views/about.list.html',
		controller: function($scope, $modal) {
			$scope.items = ['A', 'List', 'Of', 'Items'];
			$scope.exibe = function () {
				$modal.open({
					templateUrl: 'views/main.html',
					size: 'lg',
					resolve: {
						items: function () {
							return $scope.items;
						}
					}
				});

			};
		}
	})

	.state('main', {
		url: '/main',
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
	
	.state('main.list', {
		url: '/list',
		templateUrl: 'views/main.list.html',
		controller: 'MainListCtrl'
	});

});
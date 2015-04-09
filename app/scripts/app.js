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
	'ui.bootstrap',
	'toastr'
	]);

// ajustar o router da aplicação
aterwebApp.config(function($stateProvider, $urlRouterProvider, toastrConfig) {
	// configurando o toastr - https://github.com/Foxandxss/angular-toastr
	angular.extend(toastrConfig, {
		allowHtml: true,
		closeButton: true,
		closeHtml: '<button>&times;</button>',
		containerId: 'toast-container',
		extendedTimeOut: 1000,
		iconClasses: {
			error: 'toast-error',
			info: 'toast-info',
			success: 'toast-success',
			warning: 'toast-warning'
		},
		maxOpened: 0,
		messageClass: 'toast-message',
		newestOnTop: true,
		onHidden: null,
		onShown: null,
		positionClass: 'toast-top-full-width',
		preventDuplicates: false,
		progressBar: true,
		tapToDismiss: true,
		target: 'body',
		templates: {
			toast: 'directives/toast/toast.html',
			progressbar: 'directives/progressbar/progressbar.html'
		},
		timeOut: 5000,
		titleClass: 'toast-title',
		toastClass: 'toast'
	});

	// For any unmatched url, redirect to /about
	$urlRouterProvider.otherwise('/');
	//
	// Now set up the states
	$stateProvider

	.state('bem-vindo', {
		url: '/',
		templateUrl: 'views/bem-vindo.html'
	})
	
	.state('bem-vindo.lista', {
		url: '/lista',
		templateUrl: 'views/bem-vindo.lista.html',
		controller: 'BemVindoListaCtrl'
	})

	.state('login', {
		url: '/login',
		templateUrl: 'views/login/login.html',
		controller: 'LoginCtrl'
	});

});
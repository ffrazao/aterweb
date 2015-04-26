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
	'toastr',
	'ngTable'
]);

aterwebApp.run(['$rootScope', '$state', '$stateParams', 'toastr', function ($rootScope, $state, $stateParams, toastr) {
	$rootScope.estado = {retornando: false};

	$rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
		if ($rootScope.estado.retornando) {
			$rootScope.estado.retornando = false;
		} else {
			if ($rootScope.estado.atual && $rootScope.estado.atual.state !== toState && $rootScope.estado.atual.params !== toParams) {
				if (!$rootScope.estado.anterior) {
					$rootScope.estado.anterior = [];
				}
				$rootScope.estado.anterior.push(angular.copy($rootScope.estado.atual));
			}
			$rootScope.estado.atual = {state: toState, params: toParams};
		}
	});

	$rootScope.retornar = function() {
		if ($rootScope.estado.anterior && $rootScope.estado.anterior.length > 0) {
			$rootScope.estado.atual = $rootScope.estado.anterior.pop();
			$state.go($rootScope.estado.atual.state.name, $rootScope.estado.atual.params);
			$rootScope.estado.retornando = true;
		} else {
			toastr.error('Impossivel retornar', 'Erro');
		}
	};
}]);

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

	// ajustar o router da aplicação

	// For any unmatched url, redirect to /about
	$urlRouterProvider.otherwise('/');
	//
	// Now set up the states
	$stateProvider

	.state('login', {
		url: '/login',
		templateUrl: 'views/login/login.html',
		controller: 'LoginCtrl'
	})

	.state('p', {
		templateUrl: 'views/principal.html'
	})
	
	.state('p.bem-vindo', {
		url: '/',
		templateUrl: 'views/bem-vindo.html'
	})

	.state('p.modeloCadastro', {
		url: '/modelo-cadastro',
		templateUrl: 'views/_modelo-cadastro/_modelo-cadastro.html',
		controller: 'ModeloCadastroCtrl'
	})

	.state('p.modeloCadastro.filtro', {
		url: '/',
		templateUrl: 'views/_modelo-cadastro/filtro.html'
	})

	.state('p.modeloCadastro.lista', {
		url: '/lista',
		templateUrl: 'views/_modelo-cadastro/lista.html'
	})

	.state('p.modeloCadastro.formulario', {
		url: '/formulario/:id',
		templateUrl: 'views/_modelo-cadastro/formulario.html'
	})
	;

});
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
	'toastr',
	'ngTable',
	'ui.navbar',
	'ui.utils',
	'ui.utils.masks',
	'mgcrea.ngStrap',
	'ui.bootstrap',
	'checklist-model',
	]);

// codigo requerido para permitir que o mesmo controller de tela seja também utilizado em modal
aterwebApp.factory('$modalInstance', function () {
	return null;
});

aterwebApp.config(function($locationProvider, $stateProvider, $urlRouterProvider, toastrConfig, $provide, $datepickerProvider,
	$timepickerProvider) {

	// código para fazer com que o datepicker aceite a mascara de data
	$provide.decorator('bsDatepickerDirective', function ($delegate) {
		var directive = $delegate[0];
		var link = directive.link;
		directive.compile = function () {
			return function (scope, element, attrs) {
				link.apply(this, arguments);
				element.mask("99/99/9999");
			};
		};
		return $delegate;
	});
	$provide.decorator('bsTimepickerDirective', function ($delegate) {
		var directive = $delegate[0];
		var link = directive.link;
		directive.compile = function () {
			return function (scope, element, attrs) {
				link.apply(this, arguments);
				element.mask("99:99");
			};
		};
		return $delegate;
	});
	// preparar o padrao do datepicker
	angular.extend($datepickerProvider.defaults, {
		dateFormat: 'dd/MM/yyyy',
		startWeek: 0,
		autoclose: true,
		dateType: 'string',
		trigger: 'click',
		language: 'pt-br',
	});

	angular.extend($timepickerProvider.defaults, {
		dateFormat: 'hh:mm',
		autoclose: true,
		timeType: 'string',
		trigger: 'click',
		language: 'pt-br',
	});

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

	// bloco pessoa inicio
	.state('p.pessoa', {
		url: '/pessoa',
		templateUrl: 'views/pessoa/_cadastro.html',
		controller: 'PessoaCtrl'
	})

	.state('p.pessoa.filtro', {
		url: '/',
		templateUrl: 'views/pessoa/filtro.html'
	})

	.state('p.pessoa.lista', {
		url: '/lista',
		templateUrl: 'views/pessoa/lista.html'
	})

	.state('p.pessoa.formulario', {
		url: '/formulario/:id',
		templateUrl: 'views/pessoa/formulario.html'
	})
	// bloco pessoa termino

	;

});

aterwebApp.run(['$rootScope', '$state', '$stateParams', 'toastr', function ($rootScope, $state, $stateParams, toastr) {
	$rootScope.estado = {retornando: false};

	$rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams/*, fromState, fromParams*/) {
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

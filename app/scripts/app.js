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
	'endereco',
	'ui.tree',
	]);

// codigo requerido para permitir que o mesmo controller de tela seja também utilizado em modal
aterwebApp.factory('$modalInstance', function () {
	return null;
});
aterwebApp.factory('registro', function () {
	return null;
});

aterwebApp.config(function($locationProvider, $stateProvider, $urlRouterProvider, toastrConfig, $provide, $datepickerProvider,
	$timepickerProvider, $httpProvider) {

	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

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

	// bloco grupo social inicio
	.state('p.grupoSocial', {
		url: '/grupo-social',
		templateUrl: 'views/grupo-social/_cadastro.html',
		controller: 'GrupoSocialCtrl'
	})

	.state('p.grupoSocial.filtro', {
		url: '/',
		templateUrl: 'views/grupo-social/filtro.html'
	})

	.state('p.grupoSocial.lista', {
		url: '/lista',
		templateUrl: 'views/grupo-social/lista.html'
	})

	.state('p.grupoSocial.formulario', {
		url: '/formulario/:id',
		templateUrl: 'views/grupo-social/formulario.html'
	})
	// bloco grupo social termino

	// bloco propriedade rural inicio
	.state('p.propriedadeRural', {
		url: '/propriedade-rural',
		templateUrl: 'views/propriedade-rural/_cadastro.html',
		controller: 'PropriedadeRuralCtrl'
	})

	.state('p.propriedadeRural.filtro', {
		url: '/',
		templateUrl: 'views/propriedade-rural/filtro.html'
	})

	.state('p.propriedadeRural.lista', {
		url: '/lista',
		templateUrl: 'views/propriedade-rural/lista.html'
	})

	.state('p.propriedadeRural.formulario', {
		url: '/formulario/:id',
		templateUrl: 'views/propriedade-rural/formulario.html'
	})
	// bloco propriedade rural termino

	// bloco índice produção inicio
	.state('p.indiceProducao', {
		url: '/indice-producao',
		templateUrl: 'views/indice-producao/_cadastro.html',
		controller: 'IndiceProducaoCtrl'
	})

	.state('p.indiceProducao.filtro', {
		url: '/',
		templateUrl: 'views/indice-producao/filtro.html'
	})

	.state('p.indiceProducao.lista', {
		url: '/lista',
		templateUrl: 'views/indice-producao/lista.html'
	})

	.state('p.indiceProducao.formulario', {
		url: '/formulario/:id',
		templateUrl: 'views/indice-producao/formulario.html'
	})
	// bloco índice produção termino

	// bloco usuário início
	.state('p.usuario', {
		url: '/usuario',
		templateUrl: 'views/usuario/_cadastro.html',
		controller: 'UsuarioCtrl'
	})

	.state('p.usuario.filtro', {
		url: '/',
		templateUrl: 'views/usuario/filtro.html'
	})

	.state('p.usuario.lista', {
		url: '/lista',
		templateUrl: 'views/usuario/lista.html'
	})

	.state('p.usuario.formulario', {
		url: '/formulario/:id',
		templateUrl: 'views/usuario/formulario.html'
	})
	// bloco usuário termino

	// bloco perfil início
	.state('p.perfil', {
		url: '/perfil',
		templateUrl: 'views/perfil/_cadastro.html',
		controller: 'PerfilCtrl'
	})

	.state('p.perfil.filtro', {
		url: '/',
		templateUrl: 'views/perfil/filtro.html'
	})

	.state('p.perfil.lista', {
		url: '/lista',
		templateUrl: 'views/perfil/lista.html'
	})

	.state('p.perfil.formulario', {
		url: '/formulario/:id',
		templateUrl: 'views/perfil/formulario.html'
	})
	// bloco perfil termino

	// bloco log início
	.state('p.log', {
		url: '/log',
		templateUrl: 'views/log/_cadastro.html',
		controller: 'LogCtrl'
	})

	.state('p.log.filtro', {
		url: '/',
		templateUrl: 'views/log/filtro.html'
	})

	.state('p.log.lista', {
		url: '/lista',
		templateUrl: 'views/log/lista.html'
	})
	// bloco log termino

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

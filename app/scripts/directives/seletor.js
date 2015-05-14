/* global aterwebApp */

'use strict';

aterwebApp.directive('frzSeletor', function() {
	return {
		template: 
		'<span>' +
		'	<button class="btn btn-default btn-xs" title="Multiseleção" ng-click="ngModel.selecao.tipo = \'M\'" ng-show="ngModel.selecao.tipo === \'U\'">' +
		'		<span class="glyphicon glyphicon-check" aria-hidden="true"></span>' +
		'	</button>' +
		'	<button class="btn btn-default btn-xs" title="Seleção Única" ng-click="ngModel.selecao.tipo = \'U\'" ng-show="ngModel.selecao.tipo === \'M\'">' +
		'		<span class="glyphicon glyphicon-record" aria-hidden="true"></span>' +
		'	</button>' +
		'	<input type="checkbox" ng-model="ngModel.selecao.checked" ng-show="ngModel.selecao.tipo === \'M\'" title="Marcar/Desmarcar Todos" ng-click="marcarElementos(ngModel.selecao.checked);"/>' +
		'</span>',
		restrict: 'E',
		require: ['^ngModel', '?dados'],
		scope: {
			ngModel: '=',
			dados: '=',
		},
		controller: function($scope) {
			$scope.marcarElementos = function(checked) {
				var pos = 0;
				angular.forEach($scope.dados, function(item) {
					$scope.ngModel.selecao.items[pos++] = checked ? item : null;
				});
			};
		},
		link: function (scope, element, attributes) {
			scope.$watch('ngModel.selecao.tipo', function() {
				if (scope.ngModel.selecao.tipo === 'U') {
					scope.ngModel.selecao.ativo = scope.ngModel.selecao.item && angular.isDefined(scope.ngModel.selecao.item) && scope.ngModel.selecao.item;
				} else if (scope.ngModel.selecao.tipo === 'M') {
					scope.ngModel.selecao.ativo = scope.ngModel.selecao.marcado > 0;				
				}
			}, true);

			scope.$watch('ngModel.selecao.item', function() {
				if (scope.ngModel.selecao.tipo === 'U') {
					scope.ngModel.selecao.ativo = scope.ngModel.selecao.item && angular.isDefined(scope.ngModel.selecao.item) && scope.ngModel.selecao.item;
				}
			}, true);

			scope.$watch('ngModel.selecao.items', function() {
				if (!scope.ngModel.selecao.items) {
					return;
				}
				var marcado = 0, desmarcado = 0, total = scope.dados ? scope.dados.length : 0;
				out: for (var item in scope.dados) {
					for (var sel in scope.ngModel.selecao.items) {
						if (angular.equals(scope.dados[item], scope.ngModel.selecao.items[sel])) {
							marcado ++;
							continue out;
						}
					}
					desmarcado ++;
				}
				if ((desmarcado === 0) || (marcado === 0)) {
					scope.ngModel.selecao.checked = (marcado === total);
				}
				scope.ngModel.selecao.marcado = marcado;
				scope.ngModel.selecao.desmarcado = desmarcado;

				if (scope.ngModel.selecao.tipo === 'M') {
					scope.ngModel.selecao.ativo = scope.ngModel.selecao.marcado > 0;
				}

				// grayed checkbox
				element.find('input[type=checkbox]').prop('indeterminate', (marcado !== 0 && desmarcado !== 0));
			}, true);
		},
	};
});
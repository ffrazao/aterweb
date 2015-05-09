/* global aterwebApp */

'use strict';

aterwebApp.directive('frzSeletor', function() {
	return {
		restrict: 'E',
		link: function (scope, element, attributes) {
			console.log(1,2,3);
		},
		template: 
			'<span>' +
			'	<button class="btn btn-default btn-xs" title="Multiseleção" ng-click="selecao.tipo = \'M\'" ng-show="selecao.tipo === \'U\'">' +
			'		<span class="glyphicon glyphicon-check" aria-hidden="true"></span>' +
			'	</button>' +
			'	<button class="btn btn-default btn-xs" title="Seleção Única" ng-click="selecao.tipo = \'U\'" ng-show="selecao.tipo === \'M\'">' +
			'		<span class="glyphicon glyphicon-record" aria-hidden="true"></span>' +
			'	</button>' +
			'	<input type="checkbox" ng-model="selecao.checked" name="filter-checkbox" ng-show="selecao.tipo === \'M\'" title="Marcar/Desmarcar Todos"/>' +
			'</span>'
	};
});
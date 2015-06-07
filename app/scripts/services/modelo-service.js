/* global aterwebApp */

'use strict';

aterwebApp.service('ModeloSrv', ['$http', '$q', function ($http, $q) {
	this.incluir = function(registro) {
		console.log('incluindo...');
	} 
	this.listar = function(filtro) {
		console.log('listando...');
	} 
	this.restaurar = function(id) {
		console.log('restaurando...');
	} 
	this.alterar = function(registro) {
		console.log('alterando...', registro);
	} 
	this.excluir = function(registro) {
		console.log('excluindo...');
	} 
}
]);
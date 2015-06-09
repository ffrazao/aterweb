/* global aterwebApp */

'use strict';

aterwebApp.controller('PessoaRelacionamentoCtrl', ['$scope', 'FrzNavegadorParams', '$modal_b', '$modalInstance', 'toastr',
	function($scope, FrzNavegadorParams, $modal_b, $modalInstance, toastr) {

  $scope.acaoXpto = function() {
  	alert('xpto');
  };
  $scope.acaoZyz = function() {
  	alert('Zyz');
  };

  // FIXME so pra teste 
  $scope.acoesEspeciais = [
    {estado: ['ESPECIAL'], descricao: 'ZYZ', acao: $scope.acaoZyz, selecaoAtiva: false, quantidadeSelecionados: 0},
    {estado: ['ESPECIAL'], descricao: 'XPTO', acao: $scope.acaoXpto, selecaoAtiva: true, quantidadeSelecionados: 1},
  ];

  $scope.pessoaRelacionamentoNvg = new FrzNavegadorParams();

  $scope.abrir = function () {
	$scope.pessoaRelacionamentoNvg.mudarEstado('ESPECIAL');
  };

  $scope.especial = function () {
	$scope.pessoaRelacionamentoNvg.especialBotoesVisiveis(['agir', 'editar', 'excluir', 'incluir', 'navegar', 'tamanhoPagina', ]);
  };

  $scope.editar = function (id) {

  };

  $scope.excluir = function () {

  };

  $scope.incluir = function (size) {
    //$scope.cadastro.registro = {};
    var modalInstance = $modal_b.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/pessoa/_modal.html',
      controller: 'PessoaCtrl',
      size: size,
      resolve: {
        registro: function () {
          return $scope.cadastro.registro;
        }
      }
    });

    modalInstance.result.then(function (registro) {
    	if (!registro) {
    		return;
    	}
    	if (!$scope.cadastro.registro.telefone) {
    		$scope.cadastro.registro.telefone = [];
    	}
    	if (angular.isArray(registro)) {
    		for (var r in registro) {
    			$scope.cadastro.registro.telefone.push(r);
    		}
    	} else {
    		$scope.cadastro.registro.telefone.push(registro);
    	}
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.items = [];
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
  	if ($scope.navegador.selecao.tipo === 'U' && angular.isObject($scope.navegador.selecao.item)) {
  		$modalInstance.close($scope.navegador.selecao.item);
  	} else if ($scope.navegador.selecao.tipo === 'M' && angular.isObject($scope.navegador.selecao.items) && $scope.navegador.selecao.items.length === 1) {
  		$modalInstance.close($scope.navegador.selecao.items[0]);
  	} else {
  		toastr.error('Nenhum registro selecionado!');
  	}
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.navegarPrimeiro = function () {
  };

  $scope.navegarAnterior = function () {
  };

  $scope.navegarPosterior = function () {
  };

  $scope.navegarUltimo = function () {
  };

} // fim função
]);
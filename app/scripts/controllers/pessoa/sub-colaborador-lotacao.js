/* global aterwebApp */

'use strict';

aterwebApp.controller('PessoaColaboradorLotacaoCtrl', ['$scope', 'FrzNavegadorParams', '$modal_b', '$modalInstance', 'toastr',
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

  $scope.pessoaColaboradorLotacaoNvg = new FrzNavegadorParams();

  $scope.abrir = function () {
	$scope.pessoaColaboradorLotacaoNvg.mudarEstado('ESPECIAL');
  };

  $scope.especial = function () {
	$scope.pessoaColaboradorLotacaoNvg.especialBotoesVisiveis(['agir', 'editar', 'excluir', 'incluir', 'navegar', 'tamanhoPagina', ]);
  };

  $scope.editar = function (id) {

  };

  $scope.excluir = function () {

  };

  $scope.incluir = function (size) {
    var modalInstance = $modal_b.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'pessoaColaboradorLotacaoFrm.html',
      controller: 'PessoaColaboradorLotacaoCtrl',
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
      if (!$scope.cadastro.registro) {
        $scope.cadastro.registro = {};
      }
      if (!$scope.cadastro.registro.colaboradorLotacao) {
        $scope.cadastro.registro.colaboradorLotacao = [];
      }
    	if (angular.isArray(registro)) {
    		for (var r in registro) {
    			$scope.cadastro.registro.colaboradorLotacao.push(r);
    		}
    	} else {
    		$scope.cadastro.registro.colaboradorLotacao.push(registro);
    	}
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.pesquisaPessoa = function(size) {

    var modalInstance = $modal_b.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/pessoa/_modal.html',
      controller: 'PessoaCtrl',
      size: size,
      resolve: {
        registro: function () {
          //return $scope.cadastro.registro;
        }
      }
    });

    modalInstance.result.then(function (registro) {
      if (!registro) {
        return;
      }
      if (!$scope.colaboradorLotacao) {
        $scope.colaboradorLotacao = {};
      }
      if (angular.isArray(registro)) {
        $scope.colaboradorLotacao.pessoa = angular.copy(registro[0]);
      } else {
        $scope.colaboradorLotacao.pessoa = angular.copy(registro);
      }
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  $scope.items = [];
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
  	$modalInstance.close($scope.colaboradorLotacao);
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
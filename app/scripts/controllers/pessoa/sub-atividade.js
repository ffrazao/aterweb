/* global aterwebApp */

'use strict';

aterwebApp.controller('PessoaAtividadeCtrl', ['$scope', 'FrzNavegadorParams', '$modal_b', '$modalInstance', 'toastr',
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

  $scope.pessoaAtividadeNvg = new FrzNavegadorParams();

  $scope.abrir = function () {
	$scope.pessoaAtividadeNvg.mudarEstado('ESPECIAL');
  };

  $scope.especial = function () {
	$scope.pessoaAtividadeNvg.especialBotoesVisiveis(['agir', 'editar', 'excluir', 'incluir', 'navegar', 'tamanhoPagina', ]);
  };

  $scope.editar = function (id) {

  };

  $scope.excluir = function () {

  };

  $scope.incluir = function (size) {
    var modalInstance = $modal_b.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'pessoaAtividadeFrm.html',
      controller: 'PessoaAtividadeCtrl',
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
      if (!$scope.cadastro.registro.atividade) {
        $scope.cadastro.registro.atividade = [];
      }
    	if (angular.isArray(registro)) {
    		for (var r in registro) {
    			$scope.cadastro.registro.atividade.push(r);
    		}
    	} else {
    		$scope.cadastro.registro.atividade.push(registro);
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
      if (!$scope.atividade) {
        $scope.atividade = {};
      }
      if (angular.isArray(registro)) {
        $scope.atividade.pessoa = angular.copy(registro[0]);
      } else {
        $scope.atividade.pessoa = angular.copy(registro);
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
  	$modalInstance.close($scope.atividade);
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
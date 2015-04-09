'use strict';

/**
 * @ngdoc function
 * @name aterwebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the aterwebApp
 */
 aterwebApp.controller('LoginCtrl', function ($scope, $location, $modal, toastr) {

 	$scope.iniciar = function() {
 		$scope.registroOrig = $location.search();
 		$scope.reiniciar();
 	};

 	$scope.reiniciar = function() {
    $scope.submitted = false;
    $scope.registro = angular.copy($scope.registroOrig);
    if ($scope.$parent.loginForm) {
      $scope.$parent.loginForm.$setPristine();
    }
    $('#usuario').focus();
  };

  $scope.iniciar();

	// métodos de apoio
	$scope.submitForm = function () {
    if (!$scope.$parent.loginForm.$valid) {
      $scope.submitted = true;
      toastr.error('Verifique os campos marcados', 'Erro');
      //$scope.mensagens.push({ tipo: 'danger', texto: 'Verifique os campos marcados' });
      return;
    }
    $scope.renoveSuaSenha();
  };

  $scope.mensagens = [
		// { tipo: 'danger', texto: 'Oh snap! Change a few things up and try submitting again.' },
		// { tipo: 'success', texto: 'Well done! You successfully read this important alert message.' }
   ];

   $scope.closeAlert = function(index) {
    $scope.mensagens.splice(index, 1);
  };

  $scope.esqueciMinhaSenha = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'views/login/esqueci-minha-senha.html',
      controller: 'EsqueciMinhaSenhaCtrl',
      size: size
    });

    modalInstance.result.then(function (selectedItem) {
      //$scope.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.renoveSuaSenha = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'views/login/renove-sua-senha.html',
      controller: 'RenoveSuaSenhaCtrl',
      size: size,
      resolve: {
        registroOrig: function () {
          return $scope.registro;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      //$scope.selected = selectedItem;
      $('#usuario').focus();
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };

});
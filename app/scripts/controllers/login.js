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
    }
  };

  $scope.esqueciMinhaSenha = function () {

  };

  $scope.mensagens = [
		// { tipo: 'danger', texto: 'Oh snap! Change a few things up and try submitting again.' },
		// { tipo: 'success', texto: 'Well done! You successfully read this important alert message.' }
   ];

   $scope.closeAlert = function(index) {
    $scope.mensagens.splice(index, 1);
  };

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'esqueciMinhaSenhaModal.html',
      controller: 'EsqueciMinhaSenhaCtrl',
      size: size
    });

    modalInstance.result.then(function (selectedItem) {
      //$scope.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };

});

aterwebApp.controller('EsqueciMinhaSenhaCtrl', function ($scope, $modalInstance, toastr) {
  $scope.iniciar = function() {
    $scope.registroOrig = {};
    $scope.reiniciar();
  };

  $scope.reiniciar = function() {
    $scope.submitted = false;
    $scope.registro = angular.copy($scope.registroOrig);
    if ($scope.$parent.esqueciMinhaSenhaForm) {
      $scope.$parent.esqueciMinhaSenhaForm.$setPristine();
    }
    $('#email').focus();
    console.log('reiniciar');
  };

  $scope.iniciar();

  // métodos de apoio
  $scope.submitForm = function () {
    if (!$scope.$parent.esqueciMinhaSenhaForm.$valid) {
      $scope.submitted = true;
      toastr.error('Verifique os campos marcados', 'Erro');
    }
  };

  $scope.ok = function () {
    //$modalInstance.close($scope.selected.item);
  };

  $scope.cancelar = function () {
    $modalInstance.dismiss('cancel');
  };
});
'use strict';

/**
 * @ngdoc function
 * @name aterwebApp.controller:EsqueciMinhaSenhaCtrl
 * @description
 * # EsqueciMinhaSenhaCtrl
 * Controller of the aterwebApp
 */
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
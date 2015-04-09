'use strict';

/**
 * @ngdoc function
 * @name aterwebApp.controller:RenoveSuaSenhaCtrl
 * @description
 * # RenoveSuaSenhaCtrl
 * Controller of the aterwebApp
 */
aterwebApp.controller('RenoveSuaSenhaCtrl', function ($scope, $modalInstance, toastr, registroOrig) {


  $scope.iniciar = function() {
    //$scope.registroOrig = {};
    console.log("ddd", registroOrig);
    $scope.reiniciar();
  };

  $scope.reiniciar = function() {
    $scope.submitted = false;
    $scope.registro = angular.copy(registroOrig);
    if ($scope.$parent.renoveSuaSenhaForm) {
      $scope.$parent.renoveSuaSenhaForm.$setPristine();
    }
    $('#novaSenha').focus();
  };

  $scope.iniciar();

  // métodos de apoio
  $scope.submitForm = function () {
    if (!$scope.$parent.renoveSuaSenhaForm.$valid) {
      $scope.submitted = true;
      toastr.error('Verifique os campos marcados', 'Erro');
      return;
    }
    toastr.success('Sua senha foi renovada');
    $modalInstance.close(1);
  };

  $scope.cancelar = function () {
    $modalInstance.dismiss('cancel');
  };
  
});
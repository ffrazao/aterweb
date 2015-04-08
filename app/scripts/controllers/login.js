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

	$scope.esqueciSenha = function () {
		
	};

	$scope.mensagens = [
		// { tipo: 'danger', texto: 'Oh snap! Change a few things up and try submitting again.' },
		// { tipo: 'success', texto: 'Well done! You successfully read this important alert message.' }
	];

	$scope.closeAlert = function(index) {
		$scope.mensagens.splice(index, 1);
	};

$scope.items = [0,1,2];
$scope.open = function (size) {
console.log(93);
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});


 aterwebApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
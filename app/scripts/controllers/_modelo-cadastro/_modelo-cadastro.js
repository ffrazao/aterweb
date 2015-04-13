 aterwebApp.controller('ModeloCadastroCtrl', function ($scope, $modal) {

  $scope.filtrando = false;
  $scope.listando = true;
  $scope.cadastrando = false;

  $scope.popup = function (size) {
    var modalInstance = $modal.open({
      template: '<ng-include src="' + "'" + 'views/_modelo-cadastro/_modelo-modal.html' + "'" + '"></ng-include>',
      controller: 'ModeloCadastroCtrl',
      size: size
    });

    modalInstance.result.then(function () {
      
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };

});
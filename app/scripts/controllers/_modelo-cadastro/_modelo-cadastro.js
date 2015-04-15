 aterwebApp.controller('ModeloCadastroCtrl', function ($scope, $modal, ngTableParams) {

  $scope.filtrando = false;
  $scope.listando = true;
  $scope.cadastrando = false;

  var data = [
  {id:  1, nome: "Nome  1", documento: "0123"},
  {id:  2, nome: "Nome  2", documento: "0123"},
  {id:  3, nome: "Nome  3", documento: "0123"},
  {id:  4, nome: "Nome  4", documento: "0123"},
  {id:  5, nome: "Nome  5", documento: "0123"},
  {id:  6, nome: "Nome  6", documento: "0123"},
  {id:  7, nome: "Nome  7", documento: "0123"},
  {id:  8, nome: "Nome  8", documento: "0123"},
  {id:  9, nome: "Nome  9", documento: "0123"},
  {id: 10, nome: "Nome 10", documento: "0123"},
  {id: 11, nome: "Nome 11", documento: "0123"},
  {id: 12, nome: "Nome 12", documento: "0123"},
  {id: 13, nome: "Nome 13", documento: "0123"}];

  $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

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
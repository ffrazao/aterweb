 aterwebApp.controller('ModeloCadastroCtrl', function ($scope, $modal, ngTableParams) {

  $scope.filtrando = false;
  $scope.listando = true;
  $scope.cadastrando = false;

  var lista = [
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
        total: lista.length, // length of lista
        getData: function($defer, params) {
          $defer.resolve(lista.slice((params.page() - 1) * params.count(), params.page() * params.count()));
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

  var inArray = Array.prototype.indexOf ?
  function (val, arr) {
    return arr.indexOf(val)
  } :
  function (val, arr) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === val) return i;
    }
    return -1
  };
/*  $scope.names = function(column) {
    var def = $q.defer(),
    arr = [],
    names = [];
    angular.forEach(data, function(item){
      if (inArray(item.name, arr) === -1) {
        arr.push(item.name);
        names.push({
          'id': item.name,
          'title': item.name
        });
      }
    });
    def.resolve(names);
    return def;
  };*/

  $scope.selecao = { 'checked': false, items: {}, item: {} };

  // watch for check all checkbox
  $scope.$watch('selecao.checked', function(value) {
    angular.forEach(lista, function(item) {
      if (angular.isDefined(item.id)) {
        $scope.selecao.items[item.id] = value ? item: null;
      }
    });
  });

  // watch for data selecao
  $scope.$watch('selecao.items', function(values) {
    if (!lista) {
      return;
    }
    var checked = 0, unchecked = 0, total = lista.length;
    angular.forEach(lista, function(item) {
      checked   += ($scope.selecao.items[item.id]) || 0;
      unchecked += (!$scope.selecao.items[item.id]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)) {
      $scope.selecao.checked = (checked == total);
    }
      // grayed checkbox
      angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);

});
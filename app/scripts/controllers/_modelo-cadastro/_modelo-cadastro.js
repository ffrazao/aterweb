/* global aterwebApp */

'use strict';

 aterwebApp.controller('ModeloCadastroCtrl', function ($scope, $modal, toastr, $state, ngTableParams, $http, $q, frzNavegadorParams) {

  $scope.lista = [
  {id:  1, nome: "Nome  1, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123", filhos: [{id:  1, nome: "Abobora"}, {id:  2, nome: "Abacate"}, ]},
  {id:  2, nome: "Nome  2, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123", filhos: [{id:  1, nome: "Melão"}, {id:  2, nome: "Melancia"}, ]},
  {id:  3, nome: "Nome  3, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123", filhos: [{id:  1, nome: "Arroz"}, {id:  2, nome: "Feijão"}, ]},
  {id:  4, nome: "Nome  4, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id:  5, nome: "Nome  5, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id:  6, nome: "Nome  6, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id:  7, nome: "Nome  7, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id:  8, nome: "Nome  8, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id:  9, nome: "Nome  9, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id: 10, nome: "Nome 10, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id: 11, nome: "Nome 11, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id: 12, nome: "Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id: 12, nome: "Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id: 12, nome: "Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id: 12, nome: "Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id: 12, nome: "Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  {id: 12, nome: "Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE", documento: "0123"},
  ];

  $scope.navegador = new frzNavegadorParams();

  $scope.subNavegador = new frzNavegadorParams();

  $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
      }, {
        total: $scope.lista.length
        , // length of lista
        getData: function($defer, params) {
          $defer.resolve($scope.lista.slice((params.page() - 1) * params.count(), params.page() * params.count()));
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

  /*
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
  $scope.names = function(column) {
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
  };
  */

  // $scope.selecao = { tipo: 'U', checked: false, items: {}, item: {} };

  // watch for check all checkbox
  // $scope.$watch('selecao.checked', function(value) {
  //   angular.forEach($scope.lista, function(item) {
  //     if (angular.isDefined(item.id)) {
  //       $scope.selecao.items[item.id] = value;
  //     }
  //   });
  // });

  // watch for data selecao
  // $scope.$watch('selecao.items', function(values) {
  //   if (!$scope.lista) {
  //     return;
  //   }
  //   var checked = 0, unchecked = 0, total = $scope.lista.length;
  //   angular.forEach($scope.lista, function(item) {
  //     checked   += ($scope.selecao.items[item.id]) || 0;
  //     unchecked += (!$scope.selecao.items[item.id]) || 0;
  //   });
  //   if ((unchecked == 0) || (checked == 0)) {
  //     $scope.selecao.checked = (checked == total);
  //   }
  //     // grayed checkbox
  //     angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  //   }, true);

/*  $scope.primeiro = function() {
    console.log("primeiro");
    $scope.tableParams.page(1);
  };
  $scope.anterior = function() {
    console.log("anterior", Math.max($scope.tableParams.$params.page - 1, 1));
    $scope.tableParams.page(Math.max($scope.tableParams.$params.page - 1, 1));
  };
  $scope.posterior = function() {
    console.log("posterior", Math.min($scope.tableParams.$params.page + 1, parseInt(lista.length / $scope.tableParams.$params.count) + 1));
    $scope.tableParams.page(Math.min($scope.tableParams.$params.page + 1, parseInt(lista.length / $scope.tableParams.$params.count) + 1));
  };
  $scope.ultimo = function() {
    console.log("ultimo", lista.length, $scope.tableParams.$params.count);
    $scope.tableParams.page(parseInt(lista.length / $scope.tableParams.$params.count) + 1);
  };
  $scope.filtrar = function() {
    console.log("filtrar");
    $state.go('^.filtro');
  };
  $scope.incluir = function() {
    console.log("incluir");
  };
  $scope.visualizar = function() {
    console.log("visualizar");
        $state.go('^.formulario');
  };
  $scope.excluir = function() {
    console.log("excluir");
  };
  $scope.ok = function() {
    console.log("ok");
  };
  $scope.cancelar = function() {
    console.log("cancelar");
  };
  $scope.agir = function(msg) {
    console.log("agir no controller " + msg);
    toastr.success('Sucesso!', 'confirmaçao de inclusão');
    $state.go('^.lista');
  };
  */

  $scope.abrirSub = function () {
    $scope.subNavegador.mudarEstado('LISTANDO');
  };

  $scope.abrir = function () {
    $scope.navegador.mudarEstado('FILTRANDO');
    ajustaTela();
  };

  $scope.agir = function () {
    ajustaTela();
  };

  $scope.cancelarEditar = function () {
    ajustaTela();
  };

  $scope.cancelarExcluir = function () {
    ajustaTela();
  };

  $scope.cancelarIncluir = function () {
    ajustaTela();
  };

  $scope.cancelarListar = function () {
    $scope.navegador.mudarEstado('LISTANDO');
    ajustaTela();
  };

  $scope.confirmarEditar = function () {
    ajustaTela();
  };

  $scope.confirmarExcluir = function () {
    ajustaTela();
  };

  $scope.confirmarIncluir = function () {
    $scope.navegador.mudarEstado('FILTRANDO');
    ajustaTela();
  };

  $scope.confirmarListar = function () {
    $scope.navegador.mudarEstado('LISTANDO');
    ajustaTela();
  };

  $scope.editar = function () {
    $scope.navegador.mudarEstado('EDITANDO');
    ajustaTela();
  };

  $scope.excluir = function () {
    $scope.navegador.mudarEstado('EXCLUINDO');
  };

  $scope.filtrar = function () {
    $state.go('^.filtro');
  };

  $scope.incluir = function () {
    $state.go('^.formulario');
  };

  $scope.limpar = function () {
    ajustaTela();
  };

  $scope.listar = function () {
    $state.go('^.lista');
  };

  $scope.navegarPrimeiro = function () {
    ajustaTela();
  };

  $scope.navegarAnterior = function () {
    ajustaTela();
  };

  $scope.navegarPosterior = function () {
    ajustaTela();
  };

  $scope.navegarUltimo = function () {
    ajustaTela();
  };

  $scope.restaurar = function () {
    ajustaTela();
  };

  $scope.visualizar = function () {
    $state.go('^.formulario');
  };

  $scope.voltar = function () {
    console.log($scope.navegador.estadoAtual());
    $scope.navegador.voltar();
    console.log($scope.navegador.estadoAtual());
    $scope.navegador.mudarEstado($scope.navegador.estadoAtual());
    ajustaTela();
  };

  $scope.$on("$stateChangeSuccess", function(evt) {
    if ($state.is('^.filtro')) {
      if ($scope.navegador.estadoAtual() !== "FILTRANDO") {
        $scope.navegador.mudarEstado("FILTRANDO");
      }
    } else if ($state.is('^.formulario')) {
      if (($scope.navegador.estadoAtual() !== "VISUALIZANDO") && ($scope.navegador.estadoAtual() !== "INCLUINDO") && ($scope.navegador.estadoAtual() !== "EDITANDO") && ($scope.navegador.estadoAtual() !== "EXCLUINDO")) {
        $scope.navegador.mudarEstado("VISUALIZANDO");
      }
    } else if ($state.is('^.lista')) {
      if (($scope.navegador.estadoAtual() !== "LISTANDO") && ($scope.navegador.estadoAtual() !== "EXCLUINDO")) {
        $scope.navegador.mudarEstado("LISTANDO");
      }
    }
  });

  var ajustaTela = function() {
    var estadoAtual = $scope.navegador.estadoAtual();
    estadoAtual = estadoAtual ? estadoAtual.toLowerCase() : estadoAtual;
    switch (estadoAtual) {
      case "filtrando":
      default:
      $state.go('^.filtro');
      break;
      case "visualizando":
      case "incluindo":
      case "editando":
      $state.go('^.formulario');
      break;
      case "listando":
      $state.go('^.lista');
      break;
    };
  };

});
/* global aterwebApp */

'use strict';

aterwebApp.controller('ModeloCadastroCtrl', function ($scope, $modal, toastr, $state, ngTableParams, $http, $q, FrzNavegadorParams, $modalInstance) {

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };
  

  $scope.popup = function (size) {
    $scope.modalEstado = 'filtrando';
    var modalInstance = $modal.open({
      template: '<ng-include src=\"\'views/_modelo-cadastro/_modelo-modal.html\'\"></ng-include>',
      controller: 'ModeloCadastroCtrl',
      size: size,
    });

    modalInstance.result.then(function () {

    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.acaoFiltrar = function() {
    alert('Filtrar teste');
  };

  $scope.acaoListarPluts = function() {
    alert('Pluts');
  };

  $scope.acaoListarGlups = function() {
    alert('Glups');
  };

  $scope.acoesEspeciais = [
    {estado: ['FILTRANDO'], descricao: 'Relatorio', acao: $scope.acaoFiltrar, selecaoAtiva: false, quantidadeSelecionados: 0},
    {estado: ['LISTANDO', 'VISUALIZANDO'], descricao: 'Sei lá o quê', acao: $scope.acaoFiltrar, selecaoAtiva: true, quantidadeSelecionados: 2},
    {estado: ['LISTANDO'], descricao: 'Pluts', acao: $scope.acaoListarPluts, selecaoAtiva: true, quantidadeSelecionados: 1},
    {estado: ['LISTANDO', 'VISUALIZANDO'], descricao: 'Glups', acao: $scope.acaoListarGlups, selecaoAtiva: true, quantidadeSelecionados: 0},
  ];

  $scope.proximaPagina = function () {
    console.log('proxima pagina');
  };

  $scope.ultimaPagina = function () {
    console.log('ultima pagina');
  };

  $scope.cadastro = {filtro: null, filtroOriginal: null, lista : null, registro: null, registroOriginal: null};

  $scope.navegador = new FrzNavegadorParams();

  $scope.subNavegador = new FrzNavegadorParams();

  $scope.agir = function () {
    console.log('agindo');
    ajustaTela();
  };

  $scope.abrirSub = function () {
    $scope.subNavegador.mudarEstado('LISTANDO');
  };

  $scope.abrir = function () {
    if ($state.is('^.formulario')) {
      $scope.navegador.selecao.item = {id: 72, nome: "Fernando"};
      $scope.navegador.mudarEstado('VISUALIZANDO');
    } else {
      $scope.navegador.mudarEstado('FILTRANDO');
      ajustaTela();
    }
  };

  $scope.cancelar = function () {
      $modalInstance.close();
  };

  $scope.cancelarEditar = function () {
    $scope.restaurar();
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.cancelarExcluir = function () {
    $scope.restaurar();
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.cancelarIncluir = function () {
    $scope.restaurar();
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.cancelarListar = function () {
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.confirmarEditar = function () {
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.confirmarExcluir = function () {
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.confirmarIncluir = function () {
    $scope.cadastro.lista.push($scope.cadastro.registro);
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.confirmarFiltrar = function () {
    $scope.navegador.mudarEstado('LISTANDO');
    ajustaTela();
  };

  $scope.editar = function () {
    //$scope.navegador.mudarEstado('EDITANDO');
    ajustaTela();
  };

  $scope.frm = {};

  $scope.$watch('frm.formulario.$dirty', function(dirty) {
    if (dirty && $scope.navegador.estadoAtual() === 'VISUALIZANDO') {
      $scope.navegador.mudarEstado('EDITANDO');
      ajustaTela();
    }
  });

  $scope.excluir = function () {
    //$scope.navegador.mudarEstado('EXCLUINDO');
  };

  $scope.filtrar = function () {
    if ($modalInstance) {
      $scope.modalEstado = 'filtrando';
    } else {
      $state.go('^.filtro');
    }
    ajustaTela();
  };

  $scope.incluir = function () {
    $scope.cadastro.registro = {};
    //$scope.navegador.mudarEstado('INCLUINDO');
    if ($modalInstance) {
      $scope.modalEstado = 'cadastrando';
    } else {
      $state.go('^.formulario');
    }
    console.log($modalInstance);
    ajustaTela();
  };

  $scope.limpar = function () {
    var e = $scope.navegador.estadoAtual();
    if (e === 'FILTRANDO') {
      $scope.cadastro.filtro = {};
    } else {
      $scope.cadastro.registro = {};
    }
  };

  $scope.listar = function () {
    $scope.cadastro.lista = [
    {id:  1, nome: 'Nome  1, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123', filhos: [{id:  1, nome: 'Abobora'}, {id:  2, nome: 'Abacate'}, ]},
    {id:  2, nome: 'Nome  2, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123', filhos: [{id:  1, nome: 'Melão'}, {id:  2, nome: 'Melancia'}, ]},
    {id:  3, nome: 'Nome  3, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123', filhos: [{id:  1, nome: 'Arroz'}, {id:  2, nome: 'Feijão'}, ]},
    {id:  4, nome: 'Nome  4, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id:  5, nome: 'Nome  5, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id:  6, nome: 'Nome  6, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id:  7, nome: 'Nome  7, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id:  8, nome: 'Nome  8, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id:  9, nome: 'Nome  9, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id: 10, nome: 'Nome 10, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id: 11, nome: 'Nome 11, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id: 12, nome: 'Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id: 12, nome: 'Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id: 12, nome: 'Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id: 12, nome: 'Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id: 12, nome: 'Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    {id: 12, nome: 'Nome 12, ABCDEF GHIJK LMNOP RSTU VXYZ WABCDE', documento: '0123'},
    ];


    if ($modalInstance) {
      $scope.modalEstado = 'listando';
    } else {
      $state.go('^.lista');
    }
    ajustaTela();
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
    $scope.cadastro.registro = angular.copy($scope.cadastro.original);
  };

  $scope.visualizar = function () {
    if ($scope.navegador.estadoAtual() === 'LISTANDO' && $scope.navegador.selecao.tipo === 'M') {
      for (var i in $scope.navegador.selecao.items) {
        if (angular.isDefined($scope.navegador.selecao.items[i]) && $scope.navegador.selecao.items[i]) {
          $scope.navegador.folhaAtual = parseInt(i);
          break;
        }
      }
    }
    if ($scope.navegador.selecao.tipo === 'U') {
      $scope.cadastro.registro = angular.copy($scope.navegador.selecao.item);
    } else {
      $scope.cadastro.registro = angular.copy($scope.navegador.selecao.items[$scope.navegador.folhaAtual]);
    }
    $scope.cadastro.original = angular.copy($scope.cadastro.registro);

    if ($scope.frm && $scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    if ($modalInstance) {
      $scope.modalEstado = 'cadastrando';
    } else {
      $state.go('^.formulario', {id: $scope.cadastro.registro.id});
    }
  };

  $scope.voltar = function () {
    $scope.navegador.voltar();
    $scope.navegador.mudarEstado($scope.navegador.estadoAtual());
    ajustaTela();
  };

  $scope.$on('$stateChangeSuccess', function(evt) {
    if ($state.is('^.formulario') && $scope.frm && $scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    return;
    if ($state.is('^.filtro')) {
      if ($scope.navegador.estadoAtual() !== 'FILTRANDO') {
        $scope.navegador.mudarEstado('FILTRANDO');
      }
    } else if ($state.is('^.formulario')) {
      if (($scope.navegador.estadoAtual() !== 'VISUALIZANDO') && ($scope.navegador.estadoAtual() !== 'INCLUINDO') && ($scope.navegador.estadoAtual() !== 'EDITANDO') && ($scope.navegador.estadoAtual() !== 'EXCLUINDO')) {
        $scope.navegador.mudarEstado('VISUALIZANDO');
      }
    } else if ($state.is('^.lista')) {
      if (($scope.navegador.estadoAtual() !== 'LISTANDO') && ($scope.navegador.estadoAtual() !== 'EXCLUINDO')) {
        $scope.navegador.mudarEstado('LISTANDO');
      }
    }
  });

  var ajustaTela = function() {
    console.log($modalInstance);
    return;
    switch ($scope.navegador.estadoAtual()) {
      case 'FILTRANDO':
      default:
        $state.go('^.filtro');
      break;
      case 'VISUALIZANDO':
      case 'INCLUINDO':
      case 'EDITANDO':
        $state.go('^.formulario');
      break;
      case 'LISTANDO':
        $state.go('^.lista');
      break;
    };
  };

});
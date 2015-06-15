/* global aterwebApp */

'use strict';

aterwebApp.controller('UsuarioCtrl', ['$scope', '$modal_b', 'toastr', '$state', 'ngTableParams', '$http', '$q', 'FrzNavegadorParams', 
  '$modalInstance', '$datepicker', 'ModeloSrv', function ($scope, $modal_b, toastr, $state, ngTableParams, $http, $q, FrzNavegadorParams, 
    $modalInstance, $datepicker, ModeloSrv) {

  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.open = function(elm) {
    angular.element(document.querySelector(elm)).triggerHandler('click');
  };

  $scope.popup = function (size) {
    $scope.modalEstado = 'filtrando';

    var modal_bInstance = $modal_b.open({
      template: '<ng-include src=\"\'views/_modelo-cadastro/_modelo-modal.html\'\"></ng-include>',
      controller: 'ModeloCadastroCtrl',
      size: size,
    });

    modal_bInstance.result.then(function () {

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
    {estado: ['LISTANDO', 'VISUALIZANDO'], descricao: 'Enviar Nova Senha por E-mail', acao: $scope.acaoFiltrar, selecaoAtiva: true, quantidadeSelecionados: 0},
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

  $scope.navegadorTeste = new FrzNavegadorParams();  

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
    ModeloSrv.alterar($scope.cadastro.registro);
    for (var reg in $scope.cadastro.lista) {
      if ($scope.cadastro.lista[reg].id === $scope.cadastro.registro.id) {
        $scope.cadastro.lista[reg] = angular.copy($scope.cadastro.registro); 
        break;
      }
    }
    for (var reg in $scope.navegador.selecao.items) {
      if ($scope.navegador.selecao.items[reg].id === $scope.cadastro.registro.id) {
        $scope.navegador.selecao.items[reg] = angular.copy($scope.cadastro.registro); 
        $scope.navegador.selecao.item = angular.copy($scope.cadastro.registro); 
        break;
      }
    }
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.confirmarExcluir = function () {
    for (var reg = $scope.cadastro.lista.length -1; reg >= 0; reg--) {
      if ($scope.navegador.selecao.tipo === 'U') {
        if ($scope.cadastro.lista[reg].id === $scope.navegador.selecao.item.id) {
          $scope.cadastro.lista.splice(reg, 1);
          break;
        }
      } else {
        for (var r in $scope.navegador.selecao.items) {
          if ($scope.cadastro.lista[reg].id === $scope.navegador.selecao.items[r].id) {
            $scope.cadastro.lista.splice(reg, 1);
            $scope.navegador.selecao.items.slice(r, 1);
            break;
          }
        }
      }
    }
    $scope.navegador.selecao.item = null;
    $scope.navegador.selecao.items = [];
    $scope.navegador.selecao.selecionado = false;
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.confirmarIncluir = function () {
    if (!$scope.cadastro.lista) {
      $scope.cadastro.lista = [];
    }
    $scope.cadastro.lista.push($scope.cadastro.registro);
    if ($scope.frm.formulario) {
      $scope.frm.formulario.$setPristine();
      $scope.frm.formulario.$setUntouched();
    }
    $scope.voltar();
  };

  $scope.confirmarFiltrar = function () {
    $scope.navegador.mudarEstado('LISTANDO');
    $scope.navegador.selecao.item = null;
    $scope.navegador.selecao.items = [];
    $scope.navegador.selecao.selecionado = false;
    ajustaTela();
  };

  $scope.editar = function (id) {
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
    //console.log($modalInstance);
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
    if (!$scope.cadastro.lista) {
      $scope.cadastro.lista = [
        {id:  1, nome: 'Joaquim Barbosa', documento: '772.718.474-80', telefone: [{id:  1, ddd: '61', numero: '9875-5553'}, {id:  2, ddd: '61', numero: '3432-1091'}, ]},
        {id:  2, nome: 'Jorge Ferreira', documento: '572.915.984-60', telefone: [{id:  1, ddd: '62', numero: '8712-0912'}, ], email: [{id:  1, endereco: 'jfer@gmail.com'}, ]},
        {id:  3, nome: 'André Lima', documento: '401.155.025-64', email: [{id:  1, endereco: 'andre.lima@gmail.com'}, {id:  2, endereco: 'andre.lima@outlook.com'}, ]},
        {id:  4, nome: 'Roberto Silva', documento: '985.880.257-95'},
        {id:  5, nome: 'Humberto Costa', documento: '329.337.772-66'},
        {id:  6, nome: 'Julia Cardoso', documento: '683.163.561-04'},
        {id:  7, nome: 'Emanuel Francisco Chagas', documento: '385.065.473-77'},
        {id:  8, nome: 'Abraão Valdeno', documento: '332.111.217-57'},
        {id:  9, nome: 'Adriano Gesinger', documento: '178.656.571-45'},
        {id: 10, nome: 'Marco Antonio Benedetti', documento: '370.478.948-88'},
        {id: 11, nome: 'André Luiz Quintino', documento: '236.545.068-79'},
        {id: 12, nome: 'Maria Nascimento', documento: '336.373.611-83'},
        {id: 13, nome: 'Afrânio de Jesus Moraes', documento: '886.835.302-48'},
        {id: 14, nome: 'Florencio Martins', documento: '683.856.773-30'},
        {id: 15, nome: 'Carolina Mello', documento: '171.037.803-40'},
        {id: 16, nome: 'Neide Braga', documento: '356.744.184-11'},
        {id: 17, nome: 'Flávia Moura', documento: '642.332.693-24'},
        ];
    }

    $scope.navegador.selecao.item = null;
    if ($scope.navegador.selecao === 'U') {
      $scope.navegador.selecao.selecionado = false;
    }

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
    $scope.cadastro.registro = angular.copy($scope.cadastro.registroOriginal);
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
    for (var reg in $scope.cadastro.lista) {
      if ($scope.cadastro.lista[reg].id === $scope.cadastro.registro.id) {
        $scope.cadastro.registro = angular.copy($scope.cadastro.lista[reg]); 
        break;
      }
    }
    $scope.cadastro.registroOriginal = angular.copy($scope.cadastro.registro);

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
    //console.log($modalInstance);
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

}
]);
/* global aterwebApp */

'use strict';

aterwebApp.controller('PessoaCtrl', ['$scope', '$modal_b', 'toastr', '$state', 'ngTableParams', '$http', '$q', 'FrzNavegadorParams', 
  '$modalInstance', '$datepicker', 'ModeloSrv', 'registro', function ($scope, $modal_b, toastr, $state, ngTableParams, $http, $q, FrzNavegadorParams, 
    $modalInstance, $datepicker, ModeloSrv, registro) {



$scope.tabs = [
  {
    'nome': 'Principal',
    'include': 'views/pessoa/tab-principal.html',
    'visivel': true,
  },
  {
    'nome': 'Beneficiário',
    'include': 'views/pessoa/tab-beneficiario.html',
    'visivel': false,
  },
  {
    'nome': 'Colaborador',
    'include': 'views/pessoa/tab-colaborador.html',
    'visivel': false,
  },
  {
    'nome': 'Diagnósticos',
    'include': 'views/pessoa/tab-diagnostico.html',
    'visivel': false,
  },
  {
    'nome': 'Grupos Sociais',
    'include': 'views/pessoa/tab-grupo-social.html',
    'visivel': true,
  },
  {
    'nome': 'Atividades',
    'include': 'views/pessoa/tab-atividade.html',
    'visivel': true,
  },
  {
    'nome': 'Arquivos',
    'include': 'views/pessoa/tab-arquivo.html',
    'visivel': true,
  },
  {
    'nome': 'Pendências',
    'include': 'views/pessoa/tab-pendencia.html',
    'visivel': true,
  },
];
$scope.tabs.activeTab = 'Home';

$scope.tabVisivelBeneficiario = function(visivel) {
  $scope.tabVisivel('Beneficiário', visivel); 
  var outro = $scope.tabVisivel('Colaborador');
  $scope.tabVisivel('Diagnósticos', visivel || outro);
};

$scope.tabVisivelColaborador = function(visivel) {
  $scope.tabVisivel('Colaborador', visivel); 
  var outro = $scope.tabVisivel('Beneficiário');
  $scope.tabVisivel('Diagnósticos', visivel || outro);
};

$scope.tabVisivel = function(tabNome, visivel) {
  for (var t in $scope.tabs) {
    if ($scope.tabs[t].nome === tabNome) {
      if (angular.isDefined(visivel)) {
        $scope.tabs[t].visivel = visivel;
        return;
      } else {
        return $scope.tabs[t].visivel;
      }
    }
  }
};







  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.open = function(elm) {
    angular.element(document.querySelector(elm)).triggerHandler('click');
  };

  $scope.popup = function (size) {
    var modal_bInstance = $modal_b.open({
      template: '<ng-include src=\"\'views/pessoa/_modal.html\'\"></ng-include>',
      controller: 'PessoaCtrl',
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

  $scope.cadastro = {filtro: null, filtroOriginal: null, lista : null, registro: registro, registroOriginal: registro};

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
      //$scope.navegador.selecao.item = {id: 72, nome: "Fernando"};
      $scope.navegador.mudarEstado('VISUALIZANDO');
    } else {
      $scope.navegador.mudarEstado('FILTRANDO');
      ajustaTela();
    }
  };

  $scope.ok = function () {
    if ($scope.navegador.selecao.tipo === 'U' && angular.isObject($scope.navegador.selecao.item)) {
      $modalInstance.close($scope.navegador.selecao.item);
    } else if ($scope.navegador.selecao.tipo === 'M' && angular.isObject($scope.navegador.selecao.items) && $scope.navegador.selecao.items.length > 0) {
      $modalInstance.close($scope.navegador.selecao.items);
    } else {
      toastr.error('Nenhum registro selecionado!');
    }
  };

  $scope.cancelar = function () {
      $modalInstance.dismiss();
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
        {id:  1, tipoPessoa: 'PF', nome: 'Joaquim Barbosa', documento: '772.718.474-80', telefone: [{id:  1, ddd: '61', numero: '9875-5553'}, {id:  2, ddd: '61', numero: '3432-1091'}, ]},
        {id:  2, tipoPessoa: 'PF', nome: 'Jorge Ferreira', documento: '572.915.984-60', telefone: [{id:  1, ddd: '62', numero: '8712-0912'}, ], email: [{id:  1, endereco: 'jfer@gmail.com'}, ]},
        {id:  3, tipoPessoa: 'PF', nome: 'André Lima', documento: '401.155.025-64', email: [{id:  1, endereco: 'andre.lima@gmail.com'}, {id:  2, endereco: 'andre.lima@outlook.com'}, ]},
        {id:  4, tipoPessoa: 'PF', nome: 'Roberto Silva', documento: '985.880.257-95'},
        {id:  5, tipoPessoa: 'PF', nome: 'Humberto Costa', documento: '329.337.772-66'},
        {id:  6, tipoPessoa: 'PF', nome: 'Julia Cardoso', documento: '683.163.561-04'},
        {id:  7, tipoPessoa: 'PF', nome: 'Emanuel Francisco Chagas', documento: '385.065.473-77'},
        {id:  8, tipoPessoa: 'PF', nome: 'Abraão Valdeno', documento: '332.111.217-57'},
        {id:  9, tipoPessoa: 'PF', nome: 'Adriano Gesinger', documento: '178.656.571-45'},
        {id: 10, tipoPessoa: 'PF', nome: 'Marco Antonio Benedetti', documento: '370.478.948-88'},
        {id: 11, tipoPessoa: 'PF', nome: 'André Luiz Quintino', documento: '236.545.068-79'},
        {id: 12, tipoPessoa: 'PF', nome: 'Maria Nascimento', documento: '336.373.611-83'},
        {id: 13, tipoPessoa: 'PF', nome: 'Afrânio de Jesus Moraes', documento: '886.835.302-48'},
        {id: 14, tipoPessoa: 'PF', nome: 'Florencio Martins', documento: '683.856.773-30'},
        {id: 15, tipoPessoa: 'PF', nome: 'Carolina Mello', documento: '171.037.803-40'},
        {id: 16, tipoPessoa: 'PF', nome: 'Neide Braga', documento: '356.744.184-11'},
        {id: 17, tipoPessoa: 'PF', nome: 'Flávia Moura', documento: '642.332.693-24'},
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
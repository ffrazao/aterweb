'use strict';

aterwebApp.factory('frzNavegadorParams', function() {
    var frzNavegadorParams = function () {

        this.scope = null;

        this.mudarEstado = function (novoEstado) {
            this.scope.mudarEstado(novoEstado);
        };

        this.estadoAtual = function() {
            return this.scope.historicoEstados[this.scope.historicoEstados.length - 1];
        };

        this.voltar = function() {
            this.scope.historicoEstados.pop();
        };

    };
    return frzNavegadorParams;
});

aterwebApp.controller('frzNavegadorCtrl', ['$scope', 'frzNavegadorParams', 'toastr', function($scope, frzNavegadorParams, toastr) {

    if (!$scope.ngModel.hasOwnProperty("scope")) {
        $scope.ngModel = new frzNavegadorParams();
        $scope.ngModel.isNullInstance = true;
    }
    $scope.ngModel.scope = $scope;

    var iniciarBotoes = function() {
        $scope.botoes = {
            agir: {visivel: false, desabilitado: false},
            cancelar: {visivel: false, desabilitado: false},
            confirmar: {visivel: false, desabilitado: false},
            excluir: {visivel: false, desabilitado: false},
            filtrar: {visivel: false, desabilitado: false},
            incluir: {visivel: false, desabilitado: false},
            limpar: {visivel: false, desabilitado: false},
            navegar: {visivel: false, desabilitado: false},
            restaurar: {visivel: false, desabilitado: false},
            tamanhoPagina: {visivel: false, desabilitado: false},
            visualizar: {visivel: false, desabilitado: false},
            voltar: {visivel: false, desabilitado: false}
        };
    };

    iniciarBotoes();

    $scope.estados = {
        "ABRINDO": {
            executar: $scope.onAbrir,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "FILTRANDO": {
            executar: $scope.onFiltrar,
            mudarEstado: true,
            visivel: [
            'confirmar',
            'incluir',
            'limpar',
            'voltar'
            ],
            desabilitado: []
        },
        "LISTANDO": {
            executar: $scope.onListar,
            mudarEstado: true,
            visivel: [
            'agir',
            'excluir',
            'filtrar',
            'incluir',
            'navegar',
            'tamanhoPagina',
            'visualizar'
            ],
            desabilitado: []
        },
        "VISUALIZANDO": {
            executar: $scope.onVisualizar,
            mudarEstado: true,
            visivel: [
            'agir',
            'excluir',
            'filtrar',
            'incluir',
            'navegar',
            'voltar'
            ],
            desabilitado: []
        },
        "INCLUINDO": {
            executar: $scope.onIncluir,
            mudarEstado: true,
            visivel: [
            'cancelar',
            'confirmar',
            'limpar'
            ],
            desabilitado: []
        },
        "EDITANDO": {
            executar: $scope.onEditar,
            mudarEstado: true,
            visivel: [
            'cancelar',
            'confirmar',
            'restaurar'
            ],
            desabilitado: []
        },
        "EXCLUINDO": {
            executar: $scope.onExcluir,
            mudarEstado: true,
            visivel: [
            'cancelar',
            'confirmar'
            ],
            desabilitado: []
        },
        "AGINDO": {
            executar: $scope.onAgir,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "LIMPANDO": {
            executar: $scope.onLimpar,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "RESTAURANDO": {
            executar: $scope.onRestaurar,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "NAVEGANDO": {
            executar: $scope.onNavegar,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "VOLTANDO": {
            executar: $scope.onVoltar,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CONFIRMANDO": {
            executar: function () {
                var acao = null;
                if ($scope.historicoEstados[$scope.historicoEstados.length - 1] === "FILTRANDO") {
                    acao = "CONFIRMANDO_FILTRO"
                } else if ($scope.historicoEstados[$scope.historicoEstados.length - 1] === "INCLUINDO") {
                    acao = "CONFIRMANDO_INCLUSAO"
                } else if ($scope.historicoEstados[$scope.historicoEstados.length - 1] === "EDITANDO") {
                    acao = "CONFIRMANDO_EDICAO"
                } else if ($scope.historicoEstados[$scope.historicoEstados.length - 1] === "EXCLUINDO") {
                    acao = "CONFIRMANDO_EXCLUSAO"
                }
                $scope.mudarEstado(acao);
            },
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CONFIRMANDO_FILTRO": {
            executar: $scope.onConfirmarFiltrar,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CONFIRMANDO_INCLUSAO": {
            executar: $scope.onConfirmarIncluir,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CONFIRMANDO_EDICAO": {
            executar: $scope.onConfirmarEditar,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CONFIRMANDO_EXCLUSAO": {
            executar: $scope.onConfirmarExcluir,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CANCELANDO": {
            executar: function () {
                var acao = null;
                if ($scope.historicoEstados[$scope.historicoEstados.length - 1] === "FILTRANDO") {
                    acao = "CANCELANDO_FILTRO"
                } else if ($scope.historicoEstados[$scope.historicoEstados.length - 1] === "INCLUINDO") {
                    acao = "CANCELANDO_INCLUSAO"
                } else if ($scope.historicoEstados[$scope.historicoEstados.length - 1] === "EDITANDO") {
                    acao = "CANCELANDO_EDICAO"
                } else if ($scope.historicoEstados[$scope.historicoEstados.length - 1] === "EXCLUINDO") {
                    acao = "CANCELANDO_EXCLUSAO"
                }
                $scope.mudarEstado(acao);
            },
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CANCELANDO_FILTRO": {
            executar: $scope.onCancelarFiltrar,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CANCELANDO_INCLUSAO": {
            executar: $scope.onCancelarIncluir,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CANCELANDO_EDICAO": {
            executar: $scope.onCancelarEditar,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        },
        "CANCELANDO_EXCLUSAO": {
            executar: $scope.onCancelarExcluir,
            mudarEstado: false,
            visivel: [],
            desabilitado: []
        }
    };

    $scope.historicoEstados = [];

    $scope.mudarEstado = function (novoEstado) {
        try {
            $scope.estados[novoEstado].executar();
            if ('ABRINDO' === novoEstado) {
                return;
            }

            if ($scope.estados[novoEstado].mudarEstado) {
                // esconder botoes
                iniciarBotoes();

                // tornar botões visiveis
                for (var botao in $scope.estados[novoEstado].visivel) {
                    $scope.botoes[$scope.estados[novoEstado].visivel[botao]].visivel = true;
                }
                // desabilitar botoes
                for (var botao in $scope.estados[novoEstado].desabilitado) {
                    $scope.botoes[$scope.estados[novoEstado].desabilitado[botao]].desabilitado = false;
                }

                $scope.historicoEstados.push(novoEstado);
            }
        } catch (erro) {
            toastr.error('Erro ao executar a operação!', erro);
            console.error('Erro ao executar a operação!', erro);
        }
    };

}]);

// diretiva da barra de navegação de dados
aterwebApp.directive('frzNavegador', function($rootScope, toastr) {
    return {
        require: ['^ngModel'/*, '^frzNavegadorEstado'*/],
        scope: {
            ngModel: '=',
            onAbrir: '&',
            onAgir: '&',
            onCancelarEditar: '&',
            onCancelarExcluir: '&',
            onCancelarFiltrar: '&',
            onCancelarIncluir: '&',
            onConfirmarEditar: '&',
            onConfirmarExcluir: '&',
            onConfirmarFiltrar: '&',
            onConfirmarIncluir: '&',
            onEditar: '&',
            onExcluir: '&',
            onFiltrar: '&',
            onIncluir: '&',
            onLimpar: '&',
            onListar: '&',
            onNavegar: '&',
            onRestaurar: '&',
            onVisualizar: '&',
            onVoltar: '&'
        },
        restrict: 'E', 
        replace: true,
        controller: 'frzNavegadorCtrl',
        link: function(scope, element, attributes) {
            console.log('scope', scope.ngModel);

            scope.exibeTextoBotao = angular.isUndefined(attributes.exibeTextoBotao) || (attributes.exibeTextoBotao.toLowerCase() === 'true');

            // executar o estado inicial do navegador
            scope.mudarEstado("ABRINDO");
        },
        template: 
        '<div class="btn-toolbar pull-right" role="toolbar" aria-label="Barra de Ferramentas">' +
        '  <div class="btn-group" role="group">' +
        '    <button type="button" class="btn btn-sm btn-success" title="OK" ng-click="mudarEstado(' + '\'' + 'CONFIRMANDO' + '\'' + ')" ng-show="botoes.confirmar.visivel" ng-disabled="botoes.confirmar.desabilitado"><i class="glyphicon glyphicon-ok"></i><small ng-show="exibeTextoBotao">OK</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Limpar" ng-click="mudarEstado(' + '\'' + 'LIMPANDO' + '\'' + ')" ng-show="botoes.limpar.visivel" ng-disabled="botoes.limpar.desabilitado"><i class="glyphicon glyphicon-trash"></i><small ng-show="exibeTextoBotao">Limpar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Restaurar" ng-click="mudarEstado(' + '\'' + 'RESTAURANDO' + '\'' + ')" ng-show="botoes.restaurar.visivel" ng-disabled="botoes.restaurar.desabilitado"><i class="glyphicon glyphicon-repeat"></i><small ng-show="exibeTextoBotao">Restaurar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-danger " title="Cancelar" ng-click="mudarEstado(' + '\'' + 'CANCELANDO' + '\'' + ')" ng-show="botoes.cancelar.visivel" ng-disabled="botoes.cancelar.desabilitado"><i class="glyphicon glyphicon-remove"></i><small ng-show="exibeTextoBotao">Cancelar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-info" title="Voltar" ng-click="mudarEstado(' + '\'' + 'VOLTANDO' + '\'' + ')" ng-show="botoes.voltar.visivel" ng-disabled="botoes.voltar.desabilitado"><i class="glyphicon glyphicon-share-alt"></i><small ng-show="exibeTextoBotao">Voltar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.navegar.visivel" ng-disabled="botoes.navegar.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-default" title="Primeiro" ng-click="mudarEstado(' + '\'' + 'NAVEGANDO' + '\'' + ')"><i class="glyphicon glyphicon-step-backward"></i><small class="sr-only">Primeiro</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Anterior" ng-click="mudarEstado(' + '\'' + 'NAVEGANDO' + '\'' + ')"><i class="glyphicon glyphicon-backward"></i><small class="sr-only">Anterior</small></button>' +
        '    <div class="btn-group" ng-show="botoes.tamanhoPagina.visivel" ng-disabled="botoes.tamanhoPagina.desabilitado">' +
        '      <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Tamanho da Página">' +
        '        <span ng-init="tamanhoPagina = 10">{{tamanhoPagina}}</span><span class="caret"></span>' +
        '      </button>' +
        '      <ul class="dropdown-menu" role="menu">' +
        '        <li><a ng-click="tamanhoPagina = 10">10</a></li>' +
        '        <li><a ng-click="tamanhoPagina = 25">25</a></li>' +
        '        <li><a ng-click="tamanhoPagina = 50">50</a></li>' +
        '        <li><a ng-click="tamanhoPagina = 100">100</a></li>' +
        '      </ul>' +
        '    </div>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Posterior" ng-click="mudarEstado(' + '\'' + 'NAVEGANDO' + '\'' + ')"><i class="glyphicon glyphicon-forward"></i><small class="sr-only">Posterior</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Último" ng-click="mudarEstado(' + '\'' + 'NAVEGANDO' + '\'' + ')"><i class="glyphicon glyphicon-step-forward"></i><small class="sr-only">Último</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.filtrar.visivel" ng-disabled="botoes.filtrar.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-primary" title="Filtrar" ng-click="mudarEstado(' + '\'' + 'FILTRANDO' + '\'' + ')"><i class="glyphicon glyphicon-filter"></i><small ng-show="exibeTextoBotao">filtrar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.incluir.visivel" ng-disabled="botoes.incluir.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-success" title="Incluir" ng-click="mudarEstado(' + '\'' + 'INCLUINDO' + '\'' + ')"><i class="glyphicon glyphicon-plus"></i><small ng-show="exibeTextoBotao">Incluir</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.visualizar.visivel" ng-disabled="botoes.visualizar.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-warning" title="Visualizar" ng-click="mudarEstado(' + '\'' + 'VISUALIZANDO' + '\'' + ')"><i class="glyphicon glyphicon-eye-open"></i><small ng-show="exibeTextoBotao">Visualizar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.excluir.visivel" ng-disabled="botoes.excluir.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-danger " title="Excluir" ng-click="mudarEstado(' + '\'' + 'EXCLUINDO' + '\'' + ')""><i class="glyphicon glyphicon-minus"></i><small ng-show="exibeTextoBotao">Excluir</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.agir.visivel" ng-disabled="botoes.agir.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Ações">' +
        '      <i class="glyphicon glyphicon-menu-hamburger"></i><small ng-show="exibeTextoBotao">Ações</small><span class="caret"></span>' +
        '    </button>' +
        '    <ul class="dropdown-menu pull-right" role="menu">' +
        '      <li><a>Dropdown link</a></li>' +
        '      <li><a>Dropdown link</a></li>' +
        '    </ul>' +
        '  </div>' +
        '</div>' 
    };
});
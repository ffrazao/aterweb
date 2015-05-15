/* global aterwebApp */

'use strict';

aterwebApp.factory('FrzNavegadorParams', function() {
    var FrzNavegadorParams = function () {
        this.selecao = { tipo: 'U', checked: false, items: [], item: null, selecionado: false };
        this.scope = null;

        this.tamanhoPagina = 10;
        this.paginaAtual = 1;
        this.folhaAtual = 0;

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
    return FrzNavegadorParams;
});

// filtro para promover a paginação
aterwebApp.filter('pagina', function() {
    return function(lista, pagina, tamanho) {
        if (!angular.isObject(lista)) {
            return;
        }
        pagina = parseInt(pagina, 10) * parseInt(tamanho, 10);
        return lista.slice(pagina - tamanho, pagina);
    };
});

aterwebApp.controller('FrzNavegadorCtrl', ['$scope', 'FrzNavegadorParams', 'toastr', function($scope, FrzNavegadorParams, toastr) {

    if (!$scope.ngModel.hasOwnProperty('scope')) {
        $scope.ngModel = new FrzNavegadorParams();
        $scope.ngModel.isNullInstance = true;
    }
    $scope.ngModel.scope = $scope;

    var iniciarBotoes = function() {
        $scope.botoes = {
            'agir': {visivel: false, desabilitado: false},
            'cancelar': {visivel: false, desabilitado: false},
            'confirmar': {visivel: false, desabilitado: false},
            'excluir': {visivel: false, desabilitado: false},
            'filtrar': {visivel: false, desabilitado: false},
            'incluir': {visivel: false, desabilitado: false},
            'limpar': {visivel: false, desabilitado: false},
            'navegar': {visivel: false, desabilitado: false},
            'restaurar': {visivel: false, desabilitado: false},
            'tamanhoPagina': {visivel: false, desabilitado: false},
            'visualizar': {visivel: false, desabilitado: false},
            'voltar': {visivel: false, desabilitado: false}
        };
    };

    iniciarBotoes();

    $scope.estados = {
        'ABRINDO': {
            executar: $scope.onAbrir,
            mudarEstado: false,
        },
        'FILTRANDO': {
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
        'LISTANDO': {
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
        'VISUALIZANDO': {
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
        'INCLUINDO': {
            executar: $scope.onIncluir,
            mudarEstado: true,
            visivel: [
            'cancelar',
            'confirmar',
            'limpar'
            ],
            desabilitado: []
        },
        'EDITANDO': {
            executar: $scope.onEditar,
            mudarEstado: true,
            visivel: [
            'cancelar',
            'confirmar',
            'restaurar'
            ],
            desabilitado: []
        },
        'EXCLUINDO': {
            executar: $scope.onExcluir,
            mudarEstado: true,
            visivel: [
            'cancelar',
            'confirmar'
            ],
            desabilitado: []
        },
        'AGINDO': {
            executar: $scope.onAgir,
            mudarEstado: false,
        },
        'LIMPANDO': {
            executar: $scope.onLimpar,
            mudarEstado: false,
        },
        'RESTAURANDO': {
            executar: $scope.onRestaurar,
            mudarEstado: false,
        },
        'NAVEGANDO': {
            executar: $scope.onNavegar,
            mudarEstado: false,
        },
        'FOLHEANDO': {
            executar: $scope.onVisualizar,
            mudarEstado: false,
        },
        'VOLTANDO': {
            executar: $scope.onVoltar,
            mudarEstado: false,
        },
        'CONFIRMANDO': {
            executar: function () {
                switch ($scope.ngModel.estadoAtual()) {
                    case 'FILTRANDO': $scope.ngModel.mudarEstado('CONFIRMANDO_FILTRO'); break;
                    case 'INCLUINDO': $scope.ngModel.mudarEstado('CONFIRMANDO_INCLUSAO'); break;
                    case 'EDITANDO': $scope.ngModel.mudarEstado('CONFIRMANDO_EDICAO'); break;
                    case 'EXCLUINDO': $scope.ngModel.mudarEstado('CONFIRMANDO_EXCLUSAO'); break;
                }
            },
            mudarEstado: false,
        },
        'CONFIRMANDO_FILTRO': {
            executar: $scope.onConfirmarFiltrar,
            mudarEstado: false,
        },
        'CONFIRMANDO_INCLUSAO': {
            executar: $scope.onConfirmarIncluir,
            mudarEstado: false,
        },
        'CONFIRMANDO_EDICAO': {
            executar: $scope.onConfirmarEditar,
            mudarEstado: false,
        },
        'CONFIRMANDO_EXCLUSAO': {
            executar: $scope.onConfirmarExcluir,
            mudarEstado: false,
        },
        'CANCELANDO': {
            executar: function () {
                switch ($scope.ngModel.estadoAtual()) {
                    case 'FILTRANDO': $scope.ngModel.mudarEstado('CANCELANDO_FILTRO'); break;
                    case 'INCLUINDO': $scope.ngModel.mudarEstado('CANCELANDO_INCLUSAO'); break;
                    case 'EDITANDO': $scope.ngModel.mudarEstado('CANCELANDO_EDICAO'); break;
                    case 'EXCLUINDO': $scope.ngModel.mudarEstado('CANCELANDO_EXCLUSAO'); break;
                }
            },
            mudarEstado: false,
        },
        'CANCELANDO_FILTRO': {
            executar: $scope.onCancelarFiltrar,
            mudarEstado: false,
        },
        'CANCELANDO_INCLUSAO': {
            executar: $scope.onCancelarIncluir,
            mudarEstado: false,
        },
        'CANCELANDO_EDICAO': {
            executar: $scope.onCancelarEditar,
            mudarEstado: false,
        },
        'CANCELANDO_EXCLUSAO': {
            executar: $scope.onCancelarExcluir,
            mudarEstado: false,
        }
    };

    $scope.historicoEstados = [];

    $scope.mudarEstado = function (novoEstado) {
        try {
            $scope.estados[novoEstado].executar();
            if ($scope.estados[novoEstado].mudarEstado) {
                // esconder botoes
                iniciarBotoes();
                // tornar botões visiveis
                var botao = null;
                for (botao in $scope.estados[novoEstado].visivel) {
                    $scope.botoes[$scope.estados[novoEstado].visivel[botao]].visivel = true;
                }
                // desabilitar botoes
                for (botao in $scope.estados[novoEstado].desabilitado) {
                    $scope.botoes[$scope.estados[novoEstado].desabilitado[botao]].desabilitado = false;
                }
                if (novoEstado !== $scope.ngModel.estadoAtual()) {
                    $scope.historicoEstados.push(novoEstado);
                }
            }
        } catch (erro) {
            toastr.error('Erro ao executar a operação!', erro);
            console.error('Erro ao executar a operação!', erro);
        }
    };

    $scope.temAcoesEspeciais = function() {
        if ($scope.acoesEspeciais && $scope.acoesEspeciais.length) {
            var e = $scope.ngModel.estadoAtual();
            for (var acao in $scope.acoesEspeciais) {
                for (var est in $scope.acoesEspeciais[acao].estado) {
                    if ($scope.acoesEspeciais[acao].estado[est] === e) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    $scope.acaoEspecial = function(item) {
        try {
            $scope.onAgir();
            item.acao();
        } catch (erro) {
            toastr.error('Erro ao executar a operação!', erro);
            console.error('Erro ao executar a operação!', erro);
        }
    };

    $scope.botaoNavegarVisivel = function () {
        var e = $scope.ngModel.estadoAtual();
        return $scope.botoes.navegar.visivel && (e !== 'VISUALIZANDO' || (e === 'VISUALIZANDO' && $scope.ngModel.selecao.tipo === 'M'));
    };

    $scope.botaoVoltarVisivel = function () {
        return $scope.botoes.voltar.visivel && $scope.historicoEstados.length > 1;
    };

    var getUltimaPagina = function() {
        if (!$scope.dados) {
            return 0;
        }
        var result = parseInt($scope.dados.length / $scope.ngModel.tamanhoPagina, 10);
        if ($scope.dados.length % $scope.ngModel.tamanhoPagina > 0) {
            result++;
        }
        return result;
    };

    var navegar = function (sentido) {
        var novaPagina = 0, ultimaPagina = getUltimaPagina();
        switch(sentido) {
            case 'primeiro':
                novaPagina = 1;
            break;
            case 'anterior':
                novaPagina = $scope.ngModel.paginaAtual - 1;
            break;
            case 'proximo':
                novaPagina = $scope.ngModel.paginaAtual + 1;
            break;
            case 'ultimo':
                novaPagina = ultimaPagina;
                $scope.onUltimaPagina();
            break;
        }
        novaPagina = (novaPagina < 1) ? 1 : novaPagina;
        $scope.ngModel.paginaAtual = novaPagina;
        if (novaPagina > ultimaPagina) {
            $scope.ngModel.paginaAtual = ultimaPagina;
            $scope.onProximaPagina();
        }
        $scope.ngModel.mudarEstado('NAVEGANDO');
    };

    var folhear = function (sentido) {
        var folha = $scope.ngModel.folhaAtual;
        switch(sentido) {
            case 'primeiro':
                for (folha = 0; folha < $scope.ngModel.selecao.items.length; folha++) {
                    if (angular.isObject($scope.ngModel.selecao.items[folha])) {
                        $scope.ngModel.folhaAtual = parseInt(folha);
                        break;
                    }
                }
            break;
            case 'anterior': 
                for (folha = parseInt($scope.ngModel.folhaAtual) - 1; folha >= 0; folha--) {
                    if (angular.isObject($scope.ngModel.selecao.items[folha])) {
                        $scope.ngModel.folhaAtual = parseInt(folha);
                        break;
                    }
                }
            break;
            case 'proximo': 
                for (folha = parseInt($scope.ngModel.folhaAtual) + 1; folha < $scope.ngModel.selecao.items.length; folha++) {
                    if (angular.isObject($scope.ngModel.selecao.items[folha])) {
                        $scope.ngModel.folhaAtual = parseInt(folha);
                        break;
                    }
                }
            break;
            case 'ultimo': 
                for (folha = $scope.ngModel.selecao.items.length - 1; folha >= 0; folha--) {
                    if (angular.isObject($scope.ngModel.selecao.items[folha])) {
                        $scope.ngModel.folhaAtual = parseInt(folha);
                        break;
                    }
                }
            break;
        }
        $scope.ngModel.mudarEstado('FOLHEANDO');
    };

    var vaiPara = function(sentido) {
        var e = $scope.ngModel.estadoAtual();
        if (e === 'LISTANDO') {
            navegar(sentido);
        } else if (e === 'VISUALIZANDO') {
            folhear(sentido);
        }
    };

    $scope.primeiro = function() {
        vaiPara('primeiro');
    };

    $scope.anterior = function() {
        vaiPara('anterior');
    };

    $scope.proximo = function() {
        vaiPara('proximo');
    };

    $scope.ultimo = function() {
        vaiPara('ultimo');
    };

}]);

// diretiva da barra de navegação de dados
aterwebApp.directive('frzNavegador', function() {
    return {
        require: ['^ngModel', '?dados', '?acoesEspeciais'],
        scope: {
            ngModel: '=',
            dados: '=',
            acoesEspeciais: '=',
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
            onFolhear: '&',
            onRestaurar: '&',
            onVisualizar: '&',
            onVoltar: '&',
            onProximaPagina: '&',
            onUltimaPagina: '&',
        },
        restrict: 'E', 
        replace: true,
        controller: 'FrzNavegadorCtrl',
        link: function(scope, element, attributes) {
            scope.exibeTextoBotao = angular.isUndefined(attributes.exibeTextoBotao) || (attributes.exibeTextoBotao.toLowerCase() === 'true');
            // executar o estado inicial do navegador
            scope.ngModel.mudarEstado('ABRINDO');
        },
        template: 
        '<div class="btn-toolbar pull-right" role="toolbar" aria-label="Barra de Ferramentas" style=".ng-valid {border: 0px;} ">' +
        '  <div class="btn-group" role="group">' +
        '    <button type="button" class="btn btn-sm btn-success" title="OK" ng-click="ngModel.mudarEstado(\'CONFIRMANDO\')" ng-show="botoes.confirmar.visivel" ng-disabled="botoes.confirmar.desabilitado"><i class="glyphicon glyphicon-ok"></i><small ng-show="exibeTextoBotao">OK</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Limpar" ng-click="ngModel.mudarEstado(\'LIMPANDO\')" ng-show="botoes.limpar.visivel" ng-disabled="botoes.limpar.desabilitado"><i class="glyphicon glyphicon-trash"></i><small ng-show="exibeTextoBotao">Limpar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Restaurar" ng-click="ngModel.mudarEstado(\'RESTAURANDO\')" ng-show="botoes.restaurar.visivel" ng-disabled="botoes.restaurar.desabilitado"><i class="glyphicon glyphicon-repeat"></i><small ng-show="exibeTextoBotao">Restaurar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-danger " title="Cancelar" ng-click="ngModel.mudarEstado(\'CANCELANDO\')" ng-show="botoes.cancelar.visivel" ng-disabled="botoes.cancelar.desabilitado"><i class="glyphicon glyphicon-remove"></i><small ng-show="exibeTextoBotao">Cancelar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-info" title="Voltar" ng-click="ngModel.mudarEstado(\'VOLTANDO\')" ng-show="botaoVoltarVisivel()" ng-disabled="botoes.voltar.desabilitado"><i class="glyphicon glyphicon-share-alt"></i><small ng-show="exibeTextoBotao">Voltar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botaoNavegarVisivel()" ng-disabled="botoes.navegar.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-default" title="Primeiro" ng-click="primeiro()"><i class="glyphicon glyphicon-step-backward"></i><small class="sr-only">Primeiro</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Anterior" ng-click="anterior()"><i class="glyphicon glyphicon-backward"></i><small class="sr-only">Anterior</small></button>' +
        '    <div class="btn-group" ng-show="botoes.tamanhoPagina.visivel" ng-disabled="botoes.tamanhoPagina.desabilitado">' +
        '      <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Tamanho da Página">' +
        '        <span>{{ngModel.tamanhoPagina}}</span><span class="caret"></span>' +
        '      </button>' +
        '      <ul class="dropdown-menu" role="menu">' +
        '        <li><a ng-click="ngModel.tamanhoPagina = 10">10</a></li>' +
        '        <li><a ng-click="ngModel.tamanhoPagina = 25">25</a></li>' +
        '        <li><a ng-click="ngModel.tamanhoPagina = 50">50</a></li>' +
        '        <li><a ng-click="ngModel.tamanhoPagina = 100">100</a></li>' +
        '      </ul>' +
        '    </div>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Posterior" ng-click="proximo()"><i class="glyphicon glyphicon-forward"></i><small class="sr-only">Posterior</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Último" ng-click="ultimo()"><i class="glyphicon glyphicon-step-forward"></i><small class="sr-only">Último</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.filtrar.visivel" ng-disabled="botoes.filtrar.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-primary" title="Filtrar" ng-click="ngModel.mudarEstado(\'FILTRANDO\')"><i class="glyphicon glyphicon-filter"></i><small ng-show="exibeTextoBotao">filtrar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.incluir.visivel" ng-disabled="botoes.incluir.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-success" title="Incluir" ng-click="ngModel.mudarEstado(\'INCLUINDO\')"><i class="glyphicon glyphicon-plus"></i><small ng-show="exibeTextoBotao">Incluir</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.visualizar.visivel && ngModel.selecao.selecionado" ng-disabled="botoes.visualizar.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-warning" title="Visualizar" ng-click="ngModel.mudarEstado(\'VISUALIZANDO\')"><i class="glyphicon glyphicon-eye-open"></i><small ng-show="exibeTextoBotao">Visualizar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.excluir.visivel && ngModel.selecao.selecionado" ng-disabled="botoes.excluir.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-danger " title="Excluir" ng-click="ngModel.mudarEstado(\'EXCLUINDO\')""><i class="glyphicon glyphicon-minus"></i><small ng-show="exibeTextoBotao">Excluir</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.agir.visivel && ngModel.selecao.selecionado && temAcoesEspeciais()" ng-disabled="botoes.agir.desabilitado">' +
        '    <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Ações">' +
        '      <i class="glyphicon glyphicon-menu-hamburger"></i><small ng-show="exibeTextoBotao">Ações</small><span class="caret"></span>' +
        '    </button>' +
        '    <ul class="dropdown-menu pull-right" role="menu">' +
        '      <li ng-repeat="item in acoesEspeciais | filter: { estado: ngModel.estadoAtual() }"><a ng-click="acaoEspecial(item)">{{ngModel.estadoAtual()}} - {{item.descricao}}</a></li>' +
        '    </ul>' +
        '  </div>' +
        '  <div class="btn-group" role="group">' +
        '    <button type="button" class="btn btn-sm btn-default" title="Ajuda"><b>?</b><small ng-show="exibeTextoBotao">ajuda</small></button>' +
        '  </div>' +
        '</div>'
    };
});